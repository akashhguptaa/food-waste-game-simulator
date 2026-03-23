import { createClient } from "@supabase/supabase-js";

type PlayerData = {
  name: string;
  gmail: string;
  age: string | number;
  weight: string | number;
  height: string | number;
  gender: string;
};

type ScenarioRow = {
  id: number;
  title: string;
};

type ScenarioScoreInput = {
  sessionId: number;
  scenarioKey: string;
  score: number;
  maxScore?: number;
};

type FinalizeSessionInput = {
  sessionId: number;
  finalScore: number;
  totalScenarios: number;
};

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY for server-side DB access"
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function initializeGame(
  player: PlayerData,
  scenarios: ScenarioRow[]
): Promise<{
  ok: boolean;
  error?: string;
  alreadyExists?: boolean;
  userId?: number;
  sessionId?: number;
}> {
  const rows = scenarios.map((s) => ({
    scenario_key: `scenario_${s.id}`,
    title: s.title,
    max_score: 100,
  }));

  const { error: seedError } = await supabase
    .from("scenarios")
    .upsert(rows, { onConflict: "scenario_key", ignoreDuplicates: true });

  if (seedError) {
    return { ok: false, error: "Failed to seed scenarios" };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert({
      name: player.name,
      email: player.gmail.trim().toLowerCase(),
      age: Number(player.age),
      weight_kg: Number(player.weight),
      height_cm: Number(player.height),
      gender: player.gender,
    })
    .select("id")
    .single();

  if (userError) {
    if (userError.code === "23505") {
      return { ok: false, alreadyExists: true, error: "Email already exists" };
    }
    return { ok: false, error: "Failed to create user" };
  }

  const userId = userData?.id ?? null;
  if (!userId) {
    return { ok: false, error: "User creation returned no id" };
  }

  const { data: sessionData, error: sessionError } = await supabase
    .from("game_sessions")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (sessionError) {
    return { ok: false, error: "Failed to create game session" };
  }

  const sessionId = sessionData?.id ?? null;
  if (!sessionId) {
    return { ok: false, error: "Session creation returned no id" };
  }

  return { ok: true, userId, sessionId, alreadyExists: false };
}

export async function saveScenarioScore({
  sessionId,
  scenarioKey,
  score,
  maxScore = 100,
}: ScenarioScoreInput): Promise<{ ok: boolean; error?: string }> {
  const { data: scenarioData, error: scenarioError } = await supabase
    .from("scenarios")
    .select("id")
    .eq("scenario_key", scenarioKey)
    .single();

  if (scenarioError) {
    return { ok: false, error: "Scenario not found" };
  }

  const scenarioDbId = scenarioData?.id ?? null;
  if (!scenarioDbId) {
    return { ok: false, error: "Scenario id missing" };
  }

  const { error } = await supabase.from("scenario_scores").upsert(
    {
      session_id: sessionId,
      scenario_id: scenarioDbId,
      score,
      max_score: maxScore,
    },
    { onConflict: "session_id,scenario_id", ignoreDuplicates: false }
  );

  if (error) {
    return { ok: false, error: "Failed to save scenario score" };
  }

  return { ok: true };
}

export async function finalizeSession({
  sessionId,
  finalScore,
  totalScenarios,
}: FinalizeSessionInput): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase
    .from("game_sessions")
    .update({
      finished_at: new Date().toISOString(),
      final_score: finalScore,
      total_scenarios: totalScenarios,
    })
    .eq("id", sessionId);

  if (error) {
    return { ok: false, error: "Failed to finalize session" };
  }

  return { ok: true };
}
