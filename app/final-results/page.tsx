"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import scenariosData from "@/data/scenarios.json";
import { calculateBMR, calculateTDEE } from "@/utils/calculations";

type ScenarioResult = {
  scenarioId: number;
  scenarioTitle: string;
  userCalories: number;
  optimalCalories: number;
  score: number;
  selections: { [key: string]: number };
};

export default function FinalResultsPage() {
  const router = useRouter();
  const [playerData, setPlayerData] = useState<any>(null);
  const [allResults, setAllResults] = useState<ScenarioResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("playerData");
    if (data) {
      setPlayerData(JSON.parse(data));
    }

    // Get all results
    const results: ScenarioResult[] = [];
    for (let i = 1; i <= scenariosData.scenarios.length; i++) {
      const key = `scenario_${i}_result`;
      const res = localStorage.getItem(key);
      if (res) {
        results.push(JSON.parse(res));
      }
    }
    setAllResults(results);
  }, []);

  const handlePlayAgain = () => {
    // Clear all results
    for (let i = 1; i <= scenariosData.scenarios.length; i++) {
      localStorage.removeItem(`scenario_${i}_result`);
    }
    router.push("/");
  };

  if (!playerData || !mounted) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <div>Loading final results...</div>
        </div>
      </div>
    );
  }

  const overallScore =
    allResults.length > 0
      ? allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length
      : 0;
  const totalUserCalories = allResults.reduce(
    (sum, r) => sum + r.userCalories,
    0
  );
  const totalOptimalCalories = allResults.reduce(
    (sum, r) => sum + r.optimalCalories,
    0
  );

  const bmr = calculateBMR(playerData);

  const getRank = (score: number) => {
    if (score >= 90)
      return { title: "PORTION MASTER", emoji: "👑", color: "text-yellow-300" };
    if (score >= 80)
      return {
        title: "NUTRITION EXPERT",
        emoji: "⭐",
        color: "text-green-300",
      };
    if (score >= 70)
      return { title: "PORTION PRO", emoji: "🎯", color: "text-cyan-300" };
    if (score >= 60)
      return {
        title: "LEARNING FAST",
        emoji: "📈",
        color: "text-blue-300",
      };
    return {
      title: "PORTION APPRENTICE",
      emoji: "🌱",
      color: "text-purple-300",
    };
  };

  const rank = getRank(overallScore);

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

      {/* Floating Emojis */}
      <motion.div
        className="absolute top-12 left-12 text-8xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🏆
      </motion.div>

      <motion.div
        className="absolute top-12 right-12 text-8xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        ⭐
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl"
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
                  className="text-5xl md:text-7xl font-black mb-4"
                  style={{
                    color: "#d4a574",
                    textShadow:
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  QUEST COMPLETE!
                </motion.h1>
              </div>

              {/* Overall Score */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-center mb-8"
              >
                <div className="text-8xl mb-4">{rank.emoji}</div>
                <div
                  className={`text-7xl md:text-9xl font-black ${rank.color} mb-4`}
                  style={{
                    textShadow: "0 0 30px currentColor",
                  }}
                >
                  {Math.round(overallScore)}%
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {rank.title}
                </div>
                <div className="text-lg text-white/70">
                  Overall Performance Across {allResults.length} Scenarios
                </div>
              </motion.div>

              {/* Player Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-900/30 to-purple-700/30 rounded-xl p-6 border-2 border-purple-500/40 text-center"
                >
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-sm text-white/60 mb-1">Your BMR</div>
                  <div className="text-3xl font-black text-purple-300">
                    {Math.round(bmr)}
                  </div>
                  <div className="text-xs text-white/50">calories/day</div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-cyan-900/30 to-cyan-700/30 rounded-xl p-6 border-2 border-cyan-500/40 text-center"
                >
                  <div className="text-3xl mb-2">🍽️</div>
                  <div className="text-sm text-white/60 mb-1">
                    Total Calories Chosen
                  </div>
                  <div className="text-3xl font-black text-cyan-300">
                    {Math.round(totalUserCalories)}
                  </div>
                  <div className="text-xs text-white/50">
                    across all scenarios
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-br from-green-900/30 to-green-700/30 rounded-xl p-6 border-2 border-green-500/40 text-center"
                >
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-sm text-white/60 mb-1">
                    Optimal Calories
                  </div>
                  <div className="text-3xl font-black text-green-300">
                    {Math.round(totalOptimalCalories)}
                  </div>
                  <div className="text-xs text-white/50">you should've had</div>
                </motion.div>
              </div>

              {/* Scenario Breakdown */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  📊 Your Journey
                </h2>
                <div className="space-y-4">
                  {allResults.map((result, index) => {
                    const scenario = scenariosData.scenarios.find(
                      (s) => s.id === result.scenarioId
                    );
                    return (
                      <motion.div
                        key={result.scenarioId}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">
                              {scenario?.emoji || "🍽️"}
                            </div>
                            <div>
                              <div className="text-xl font-bold text-white">
                                Scenario {result.scenarioId}:{" "}
                                {result.scenarioTitle}
                              </div>
                              <div className="text-sm text-white/60">
                                {result.userCalories} cal chosen vs{" "}
                                {result.optimalCalories} cal optimal
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div
                              className={`text-4xl font-black ${
                                result.score >= 85
                                  ? "text-green-400"
                                  : result.score >= 70
                                  ? "text-yellow-400"
                                  : "text-red-400"
                              }`}
                            >
                              {result.score}%
                            </div>
                            <div className="text-3xl">
                              {result.score >= 85
                                ? "🏆"
                                : result.score >= 70
                                ? "⭐"
                                : "📈"}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Learning Points */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-8 border-2 border-yellow-500/40 mb-8"
              >
                <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
                  💡 What You Learned
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <div className="font-bold">BMR Matters</div>
                      <div className="text-sm text-white/70">
                        Your body burns {Math.round(bmr)} calories daily just to
                        stay alive!
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏃</span>
                    <div>
                      <div className="font-bold">Activity Adjusts Needs</div>
                      <div className="text-sm text-white/70">
                        Different activities require different amounts of energy
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <div className="font-bold">Balance is Key</div>
                      <div className="text-sm text-white/70">
                        Not too much, not too little - just right for your body
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">♻️</span>
                    <div>
                      <div className="font-bold">Reduce Food Waste</div>
                      <div className="text-sm text-white/70">
                        Taking the right amount helps save the planet too!
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  onClick={handlePlayAgain}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-5 rounded-xl font-black text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white cursor-pointer"
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
                  <span className="relative z-10">PLAY AGAIN 🔄</span>
                </motion.button>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  onClick={() => router.push("/")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-5 rounded-xl font-black text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-white cursor-pointer"
                  style={{
                    boxShadow:
                      "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)",
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
                  <span className="relative z-10">BACK TO HOME 🏠</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
