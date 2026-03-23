import { NextRequest, NextResponse } from "next/server";
import {
	finalizeSession,
	initializeGame,
	saveScenarioScore,
} from "./controller";

type InitializePayload = {
	player: {
		name: string;
		gmail: string;
		age: string | number;
		weight: string | number;
		height: string | number;
		gender: string;
	};
	scenarios: Array<{ id: number; title: string }>;
};

type SaveScorePayload = {
	sessionId: number;
	scenarioKey: string;
	score: number;
	maxScore?: number;
};

type FinalizePayload = {
	sessionId: number;
	finalScore: number;
	totalScenarios: number;
};

export async function POST(req: NextRequest) {
	try {
		const { action, payload } = await req.json();

		if (action === "initializeGame") {
			const body = payload as InitializePayload;
			if (!body?.player || !Array.isArray(body?.scenarios)) {
				return NextResponse.json(
					{ ok: false, error: "Invalid initializeGame payload" },
					{ status: 400 }
				);
			}

			const result = await initializeGame(body.player, body.scenarios);
			const status = result.ok || result.alreadyExists ? 200 : 500;
			return NextResponse.json(result, { status });
		}

		if (action === "saveScenarioScore") {
			const body = payload as SaveScorePayload;
			if (
				!body ||
				typeof body.sessionId !== "number" ||
				typeof body.scenarioKey !== "string" ||
				typeof body.score !== "number"
			) {
				return NextResponse.json(
					{ ok: false, error: "Invalid saveScenarioScore payload" },
					{ status: 400 }
				);
			}

			const result = await saveScenarioScore(body);
			return NextResponse.json(result, { status: result.ok ? 200 : 500 });
		}

		if (action === "finalizeSession") {
			const body = payload as FinalizePayload;
			if (
				!body ||
				typeof body.sessionId !== "number" ||
				typeof body.finalScore !== "number" ||
				typeof body.totalScenarios !== "number"
			) {
				return NextResponse.json(
					{ ok: false, error: "Invalid finalizeSession payload" },
					{ status: 400 }
				);
			}

			const result = await finalizeSession(body);
			return NextResponse.json(result, { status: result.ok ? 200 : 500 });
		}

		return NextResponse.json(
			{ ok: false, error: "Unsupported action" },
			{ status: 400 }
		);
	} catch (error) {
		console.error("[API /api/db] Error:", error);
		return NextResponse.json(
			{ ok: false, error: "Internal server error" },
			{ status: 500 }
		);
	}
}
