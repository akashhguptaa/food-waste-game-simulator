import { supabase } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

type PlayerData = {
  name: string;
  gmail: string;
  age: string | number;
  weight: string | number;
  height: string | number;
  gender: string;
};

type CreateUserResult = {
  userId: number | null;
  alreadyExists: boolean;
};

type ScenarioRow = {
  id: number;
  title: string;
};

type ScenarioScoreInput = {
  sessionId: number;
  scenarioDbId: number;
  score: number;
  maxScore?: number;
};

type FinalizeSessionInput = {
  sessionId: number;
  finalScore: number;
  totalScenarios: number;
};

// ─── Seed: Scenarios ──────────────────────────────────────────────────────────

/**
 * Upserts scenarios from the local JSON into the `scenarios` table.
 * Uses `scenario_key` as the unique conflict target (idempotent).
 */
export async function seedScenarios(
  scenarios: ScenarioRow[]
): Promise<void> {
  const rows = scenarios.map((s) => ({
    scenario_key: `scenario_${s.id}`,
    title: s.title,
    max_score: 100,
  }));

  const { error } = await supabase
    .from("scenarios")
    .upsert(rows, { onConflict: "scenario_key", ignoreDuplicates: true });

  if (error) console.error("[DB] seedScenarios error:", error.message);
}

// ─── Users ────────────────────────────────────────────────────────────────────

/**
 * Creates a user exactly once based on unique `email`.
 * Returns `alreadyExists=true` when the email is already present.
 */
export async function createUserOnce(
  player: PlayerData
): Promise<CreateUserResult> {
  const { data, error } = await supabase
    .from("users")
    .insert(
      {
        name: player.name,
        email: player.gmail.trim().toLowerCase(),
        age: Number(player.age),
        weight_kg: Number(player.weight),
        height_cm: Number(player.height),
        gender: player.gender,
      }
    )
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { userId: null, alreadyExists: true };
    }
    console.error("[DB] createUserOnce error:", error.message);
    return { userId: null, alreadyExists: false };
  }
  return { userId: data?.id ?? null, alreadyExists: false };
}

// ─── Game Sessions ────────────────────────────────────────────────────────────

/**
 * Creates a new game session for the given user.
 * Returns the session's DB `id`, or null on failure.
 */
export async function createGameSession(
  userId: number
): Promise<number | null> {
  const { data, error } = await supabase
    .from("game_sessions")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (error) {
    console.error("[DB] createGameSession error:", error.message);
    return null;
  }
  return data?.id ?? null;
}

/**
 * Marks a game session as finished with the final score.
 */
export async function finalizeGameSession({
  sessionId,
  finalScore,
  totalScenarios,
}: FinalizeSessionInput): Promise<void> {
  const { error } = await supabase
    .from("game_sessions")
    .update({
      finished_at: new Date().toISOString(),
      final_score: finalScore,
      total_scenarios: totalScenarios,
    })
    .eq("id", sessionId);

  if (error) console.error("[DB] finalizeGameSession error:", error.message);
}

// ─── Scenario Scores ──────────────────────────────────────────────────────────

/**
 * Gets the DB `id` of a scenario by its key (e.g. "scenario_1").
 */
export async function getScenarioDbId(
  scenarioKey: string
): Promise<number | null> {
  const { data, error } = await supabase
    .from("scenarios")
    .select("id")
    .eq("scenario_key", scenarioKey)
    .single();

  if (error) {
    console.error("[DB] getScenarioDbId error:", error.message);
    return null;
  }
  return data?.id ?? null;
}

/**
 * Inserts a scenario score row. Safe to call even if already inserted
 * (uses upsert on unique_session_scenario constraint).
 */
export async function insertScenarioScore({
  sessionId,
  scenarioDbId,
  score,
  maxScore = 100,
}: ScenarioScoreInput): Promise<void> {
  const { error } = await supabase.from("scenario_scores").upsert(
    {
      session_id: sessionId,
      scenario_id: scenarioDbId,
      score,
      max_score: maxScore,
    },
    { onConflict: "session_id,scenario_id", ignoreDuplicates: false }
  );

  if (error) console.error("[DB] insertScenarioScore error:", error.message);
}
