"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import scenariosData from "@/data/scenarios.json";
import {
  calculateBMR,
  calculateTDEE,
  calculateTotalCalories,
  calculateOptimalCalories,
  calculateScore,
  getScoreFeedback,
  ACTIVITY_FACTORS,
} from "@/utils/calculations";

type FoodItem = {
  name: string;
  emoji: string;
  unit: string;
  min: number;
  max: number;
  optimal: number;
  step: number;
  caloriesPerUnit: number;
};

type Scenario = {
  id: number;
  emoji: string;
  title: string;
  setting: string;
  challenge: string;
  foods: FoodItem[];
};

type ScenarioResult = {
  scenarioId: number;
  scenarioTitle: string;
  userCalories: number;
  optimalCalories: number;
  score: number;
  selections: { [key: string]: number };
};

export default function ScorePage() {
  const router = useRouter();
  const params = useParams();
  const scenarioId = parseInt(params.id as string);
  const scenario = scenariosData.scenarios.find(
    (s: Scenario) => s.id === scenarioId
  );

  const [playerData, setPlayerData] = useState<any>(null);
  const [currentResult, setCurrentResult] = useState<ScenarioResult | null>(
    null
  );
  const [allResults, setAllResults] = useState<ScenarioResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("playerData");
    if (data) {
      setPlayerData(JSON.parse(data));
    }

    // Get current scenario result from localStorage
    const resultKey = `scenario_${scenarioId}_result`;
    const result = localStorage.getItem(resultKey);
    if (result) {
      setCurrentResult(JSON.parse(result));
    }

    // Get all previous results
    const results: ScenarioResult[] = [];
    for (let i = 1; i <= scenarioId; i++) {
      const key = `scenario_${i}_result`;
      const res = localStorage.getItem(key);
      if (res) {
        results.push(JSON.parse(res));
      }
    }
    setAllResults(results);
  }, [scenarioId]);

  const handleContinue = () => {
    const nextScenarioId = scenarioId + 1;
    const totalScenarios = scenariosData.scenarios.length;

    if (nextScenarioId <= totalScenarios) {
      router.push(`/scenerio/${nextScenarioId}`);
    } else {
      // All scenarios completed, go to final results
      router.push("/final-results");
    }
  };

  if (!scenario || !currentResult || !playerData || !mounted) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div>Loading your results...</div>
        </div>
      </div>
    );
  }

  const bmr = calculateBMR(playerData);
  const tdee = calculateTDEE(playerData, scenarioId);
  const activityFactor = ACTIVITY_FACTORS[scenarioId];
  const feedback = getScoreFeedback(
    currentResult.score,
    currentResult.userCalories,
    currentResult.optimalCalories
  );

  const overallScore =
    allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length;

  return (
    <div className="relative min-h-screen bg-[#0a0e27] overflow-hidden flex items-center justify-center p-4">
      {/* Space Background */}
      {mounted && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-3xl p-1 shadow-2xl">
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>

          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[1.3rem] p-1">
            <div className="bg-[#1a1f3a] rounded-[1.2rem] p-8 md:p-12 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-6xl font-black mb-2"
                  style={{
                    color: "#d4a574",
                    textShadow:
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  SCENARIO {scenarioId} RESULTS
                </motion.h1>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-cyan-400 font-bold"
                >
                  {scenario.title}
                </motion.p>
              </div>

              {/* Score Display */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-center mb-8"
              >
                <div className="inline-block">
                  <div className="text-8xl mb-4">{feedback.emoji}</div>
                  <div
                    className={`text-6xl md:text-8xl font-black ${feedback.color} mb-2`}
                    style={{
                      textShadow: "0 0 20px currentColor",
                    }}
                  >
                    {currentResult.score}%
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {feedback.title}
                  </div>
                </div>
              </motion.div>

              {/* Feedback Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-6 mb-8 border-2 border-slate-500/30"
              >
                <p className="text-white text-center text-lg italic">
                  {feedback.message}
                </p>
              </motion.div>

              {/* Calorie Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Your Metabolism */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 rounded-xl p-6 border-2 border-purple-500/40"
                >
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    🔥 Your Metabolism
                  </h3>
                  <div className="space-y-3 text-white">
                    <div className="flex justify-between">
                      <span className="text-white/70">BMR:</span>
                      <span className="font-bold">
                        {Math.round(bmr)} calories/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Activity Factor:</span>
                      <span className="font-bold">{activityFactor}x</span>
                    </div>
                    <div className="h-px bg-purple-500/30"></div>
                    <div className="flex justify-between text-lg">
                      <span className="text-purple-300 font-bold">TDEE:</span>
                      <span className="font-black text-purple-300">
                        {Math.round(tdee)} cal
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Your Choices */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-br from-cyan-900/30 to-cyan-700/30 rounded-xl p-6 border-2 border-cyan-500/40"
                >
                  <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    🍽️ Your Portion Choices
                  </h3>
                  <div className="space-y-3 text-white">
                    <div className="flex justify-between">
                      <span className="text-white/70">You chose:</span>
                      <span className="font-bold">
                        {Math.round(currentResult.userCalories)} cal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Optimal:</span>
                      <span className="font-bold">
                        {Math.round(currentResult.optimalCalories)} cal
                      </span>
                    </div>
                    <div className="h-px bg-cyan-500/30"></div>
                    <div className="flex justify-between text-lg">
                      <span className="text-cyan-300 font-bold">
                        Difference:
                      </span>
                      <span
                        className={`font-black ${
                          currentResult.userCalories >
                          currentResult.optimalCalories
                            ? "text-red-400"
                            : currentResult.userCalories <
                              currentResult.optimalCalories
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {currentResult.userCalories >
                        currentResult.optimalCalories
                          ? "+"
                          : ""}
                        {Math.round(
                          currentResult.userCalories -
                            currentResult.optimalCalories
                        )}{" "}
                        cal
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Food Breakdown */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  📊 Food Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scenario.foods.map((food, index) => {
                    const userAmount = currentResult.selections[food.name] || 0;
                    const userCal = userAmount * food.caloriesPerUnit;
                    const optimalCal = food.optimal * food.caloriesPerUnit;

                    return (
                      <motion.div
                        key={food.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{food.emoji}</span>
                          <div className="flex-1">
                            <div className="font-bold text-white">
                              {food.name}
                            </div>
                            <div className="text-sm text-white/60">
                              {userAmount} {food.unit} = {Math.round(userCal)}{" "}
                              cal
                            </div>
                          </div>
                          <div
                            className={`text-2xl ${
                              Math.abs(userAmount - food.optimal) < 0.1
                                ? "text-green-400"
                                : Math.abs(userAmount - food.optimal) < 0.5
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {Math.abs(userAmount - food.optimal) < 0.1
                              ? "✅"
                              : Math.abs(userAmount - food.optimal) < 0.5
                              ? "⚠️"
                              : "❌"}
                          </div>
                        </div>
                        <div className="text-xs text-white/50">
                          Optimal: {food.optimal} {food.unit} (
                          {Math.round(optimalCal)} cal)
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Overall Progress */}
              {allResults.length > 1 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mb-8 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-500/40"
                >
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
                    🏆 Overall Progress
                  </h3>
                  <div className="text-center">
                    <div className="text-5xl font-black text-yellow-300 mb-2">
                      {Math.round(overallScore)}%
                    </div>
                    <div className="text-white/70">
                      Average across {allResults.length} scenarios
                    </div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                    {allResults.map((result) => (
                      <div
                        key={result.scenarioId}
                        className="text-center p-2 bg-slate-800/50 rounded-lg"
                      >
                        <div className="text-xs text-white/50 mb-1">
                          S{result.scenarioId}
                        </div>
                        <div
                          className={`font-bold ${
                            result.score >= 85
                              ? "text-green-400"
                              : result.score >= 70
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {result.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Continue Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-xl font-black text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white cursor-pointer"
                style={{
                  boxShadow:
                    "0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">
                  {scenarioId < scenariosData.scenarios.length
                    ? `CONTINUE TO SCENARIO ${scenarioId + 1} ➡️`
                    : "VIEW FINAL RESULTS 🏆"}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
