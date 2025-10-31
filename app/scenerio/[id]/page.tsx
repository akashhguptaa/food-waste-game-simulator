"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import scenariosData from "@/data/scenarios.json";

type FoodItem = {
  name: string;
  emoji: string;
  unit: string;
  min: number;
  max: number;
  optimal: number;
  step: number;
};

type Scenario = {
  id: number;
  emoji: string;
  title: string;
  setting: string;
  challenge: string;
  foods: FoodItem[];
};

const StyledText = ({ text }: { text: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="italic">{text}</span>;
  }

  const parts = text.split(/(<[^>]+>[^<]*<\/[^>]+>)/g);

  return (
    <>
      {parts.map((part, index) => {
        const key = `${part.substring(0, 20)}-${index}`;

        if (part.includes("<highlight>")) {
          const content = part.replace(/<\/?highlight>/g, "");
          return (
            <span
              key={key}
              className="text-yellow-300 font-bold text-xl animate-pulse"
            >
              {content}
            </span>
          );
        }
        if (part.includes("<marathon>")) {
          const content = part.replace(/<\/?marathon>/g, "");
          return (
            <span key={key} className="text-orange-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<starving>")) {
          const content = part.replace(/<\/?starving>/g, "");
          return (
            <span key={key} className="text-red-400 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<amazing>")) {
          const content = part.replace(/<\/?amazing>/g, "");
          return (
            <span key={key} className="text-green-300 font-bold">
              {content}
            </span>
          );
        }
        if (part.includes("<actually>")) {
          const content = part.replace(/<\/?actually>/g, "");
          return (
            <span key={key} className="text-cyan-300 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<exam>")) {
          const content = part.replace(/<\/?exam>/g, "");
          return (
            <span key={key} className="text-purple-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<fried>")) {
          const content = part.replace(/<\/?fried>/g, "");
          return (
            <span key={key} className="text-red-400 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<brain>")) {
          const content = part.replace(/<\/?brain>/g, "");
          return (
            <span key={key} className="text-pink-400 font-semibold">
              {content}
            </span>
          );
        }
        if (part.includes("<friday>")) {
          const content = part.replace(/<\/?friday>/g, "");
          return (
            <span key={key} className="text-yellow-300 font-bold text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<movie>")) {
          const content = part.replace(/<\/?movie>/g, "");
          return (
            <span key={key} className="text-purple-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<wasting>")) {
          const content = part.replace(/<\/?wasting>/g, "");
          return (
            <span key={key} className="text-red-400 font-bold">
              {content}
            </span>
          );
        }
        if (part.includes("<hiking>")) {
          const content = part.replace(/<\/?hiking>/g, "");
          return (
            <span key={key} className="text-green-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<morning>")) {
          const content = part.replace(/<\/?morning>/g, "");
          return (
            <span key={key} className="text-yellow-300 font-bold">
              {content}
            </span>
          );
        }
        if (part.includes("<campfire>")) {
          const content = part.replace(/<\/?campfire>/g, "");
          return (
            <span key={key} className="text-orange-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<carried>")) {
          const content = part.replace(/<\/?carried>/g, "");
          return (
            <span key={key} className="text-red-400 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<birthday>")) {
          const content = part.replace(/<\/?birthday>/g, "");
          return (
            <span key={key} className="text-pink-400 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<celebration>")) {
          const content = part.replace(/<\/?celebration>/g, "");
          return (
            <span key={key} className="text-yellow-300 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<overordering>")) {
          const content = part.replace(/<\/?overordering>/g, "");
          return (
            <span key={key} className="text-red-400 font-bold">
              {content}
            </span>
          );
        }
        if (part.includes("<wisely>")) {
          const content = part.replace(/<\/?wisely>/g, "");
          return (
            <span key={key} className="text-cyan-300 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<lazy>")) {
          const content = part.replace(/<\/?lazy>/g, "");
          return (
            <span key={key} className="text-blue-300 font-black text-xl">
              {content}
            </span>
          );
        }
        if (part.includes("<nothing>")) {
          const content = part.replace(/<\/?nothing>/g, "");
          return (
            <span key={key} className="text-gray-400 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<chilling>")) {
          const content = part.replace(/<\/?chilling>/g, "");
          return (
            <span key={key} className="text-green-300 font-semibold">
              {content}
            </span>
          );
        }
        if (part.includes("<really>")) {
          const content = part.replace(/<\/?really>/g, "");
          return (
            <span key={key} className="text-yellow-300 font-bold text-lg">
              {content}
            </span>
          );
        }
        if (part.includes("<light>")) {
          const content = part.replace(/<\/?light>/g, "");
          return (
            <span key={key} className="text-green-300 font-semibold">
              {content}
            </span>
          );
        }

        return (
          <span key={key} className="italic">
            {part}
          </span>
        );
      })}
    </>
  );
};

export default function ScenarioGamePage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = parseInt(params.id as string);
  const scenario = scenariosData.scenarios.find(
    (s: Scenario) => s.id === scenarioId
  );

  const [playerData, setPlayerData] = useState<any>(null);
  const [selections, setSelections] = useState<{ [key: string]: number }>({});
  const [showStory, setShowStory] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("playerData");
    if (data) {
      setPlayerData(JSON.parse(data));
    }

    if (scenario) {
      const initial: { [key: string]: number } = {};
      scenario.foods.forEach((food) => {
        initial[food.name] = 0;
      });
      setSelections(initial);
    }
  }, [scenario]);

  const handleSliderChange = (foodName: string, value: number) => {
    setSelections((prev) => ({ ...prev, [foodName]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Calculate score logic here
    console.log("Selections:", selections);

    // Navigate to next scenario or home after a delay
    setTimeout(() => {
      const nextScenarioId = scenarioId + 1;
      const totalScenarios = scenariosData.scenarios.length;

      if (nextScenarioId <= totalScenarios) {
        router.push(`/scenerio/${nextScenarioId}`);
      } else {
        // All scenarios completed, go back home
        router.push("/");
      }
    }, 2000);
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center text-white">
        Scenario not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0e27] overflow-hidden flex items-center justify-center p-4">
      {/* Space Background with Stars */}
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

      {/* Animated Nebula Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>

      {/* Floating Food Decorations */}
      <motion.div
        className="absolute top-12 left-12 text-6xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🏃
      </motion.div>

      <motion.div
        className="absolute top-12 right-12 text-6xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🎽
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-8 text-7xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.3 }}
      >
        🏆
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-12 text-7xl z-20 drop-shadow-2xl"
        animate={{ y: [0, -18, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.2 }}
      >
        ⚡
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div
            key="story"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-4xl"
          >
            <div className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-3xl p-1 shadow-2xl">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>

              <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[1.3rem] p-1">
                <div className="bg-[#1a1f3a] rounded-[1.2rem] p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                  {/* Story Content */}
                  <motion.div className="text-center space-y-5">
                    <motion.h1
                      className="text-2xl md:text-3xl font-black"
                      style={{
                        color: "#d4a574",
                        textShadow:
                          "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      SCENARIO {scenario.id}
                    </motion.h1>

                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-4xl font-bold text-cyan-400"
                    >
                      {scenario.title}
                    </motion.h2>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl"
                    >
                      🏃‍♂️💨
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      <div className="text-left px-2">
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                          <span className="text-cyan-400 font-black text-lg">
                            Setting:
                          </span>{" "}
                          <StyledText text={scenario.setting} />
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-900/40 via-orange-800/30 to-orange-900/40 rounded-xl p-4 border-2 border-orange-500/40 shadow-lg shadow-orange-500/20">
                        <p className="text-base md:text-lg text-white/95 leading-relaxed">
                          <span className="text-orange-300 font-black text-lg">
                            Challenge:
                          </span>{" "}
                          <StyledText text={scenario.challenge} />
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex justify-center gap-3 text-3xl"
                    >
                      {scenario.foods.map((food, i) => (
                        <motion.span
                          key={food.name}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          {food.emoji}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      onClick={() => setShowStory(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-10 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-white font-black text-lg rounded-xl shadow-lg relative overflow-hidden cursor-pointer"
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
                      <span className="relative z-10">START CHOOSING! 🍽️</span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
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

                  {/* Game Content */}
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <motion.h1
                        className="text-3xl md:text-5xl font-black mb-2"
                        style={{
                          color: "#d4a574",
                          textShadow:
                            "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        CHOOSE YOUR PORTIONS
                      </motion.h1>
                      <p className="text-white/70 text-sm mt-2">
                        Hey {playerData?.name}! Select the right amount of food
                        for your post-marathon meal 🏃‍♂️
                      </p>
                    </div>

                    {/* Food Selection Grid */}
                    <div className="space-y-6">
                      {scenario.foods.map((food, index) => (
                        <motion.div
                          key={food.name}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-900/50 rounded-xl p-6 border-2 border-slate-700 hover:border-cyan-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <motion.span
                                className="text-6xl"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.2,
                                }}
                              >
                                {food.emoji}
                              </motion.span>
                              <div>
                                <h3 className="text-2xl font-bold text-white">
                                  {food.name}
                                </h3>
                                <p className="text-white/60 text-sm">
                                  Adjust your portion size
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-4xl font-black text-cyan-400">
                                {selections[food.name]}
                              </div>
                              <div className="text-sm text-white/60">
                                {food.unit}
                              </div>
                            </div>
                          </div>

                          {/* Slider */}
                          <div className="relative">
                            <input
                              type="range"
                              min={food.min}
                              max={food.max}
                              step={food.step}
                              value={selections[food.name] || 0}
                              onChange={(e) =>
                                handleSliderChange(
                                  food.name,
                                  parseFloat(e.target.value)
                                )
                              }
                              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                              style={{
                                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                                  (selections[food.name] / food.max) * 100
                                }%, #1e293b ${
                                  (selections[food.name] / food.max) * 100
                                }%, #1e293b 100%)`,
                              }}
                            />
                            <div className="flex justify-between mt-2 text-xs text-white/40">
                              <span>0</span>
                              <span>
                                {food.max} {food.unit}
                              </span>
                            </div>
                          </div>

                          {/* Visual Portion Indicator */}
                          <div className="flex gap-2 mt-4">
                            {Array.from({ length: food.max / food.step }).map(
                              (_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 h-2 rounded-full transition-all ${
                                    i < selections[food.name] / food.step
                                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"
                                      : "bg-slate-700"
                                  }`}
                                />
                              )
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={Object.values(selections).every((v) => v === 0)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-5 rounded-xl font-black text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg mt-8 ${
                        Object.values(selections).some((v) => v > 0)
                          ? "bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white cursor-pointer"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                      style={{
                        boxShadow: Object.values(selections).some((v) => v > 0)
                          ? "0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3)"
                          : "none",
                      }}
                    >
                      {Object.values(selections).some((v) => v > 0) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {submitted ? (
                          scenarioId < scenariosData.scenarios.length ? (
                            <>🎉 LOADING NEXT SCENARIO...</>
                          ) : (
                            <>🏆 GAME COMPLETE!</>
                          )
                        ) : (
                          <>✅ SUBMIT MY CHOICES</>
                        )}
                      </span>
                    </motion.button>

                    {/* Next Scenario Preview */}
                    {submitted &&
                      scenarioId < scenariosData.scenarios.length && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-center"
                        >
                          <p className="text-white/70 text-sm">
                            Next up:{" "}
                            <span className="text-cyan-400 font-bold">
                              {scenariosData.scenarios[scenarioId].emoji}{" "}
                              {scenariosData.scenarios[scenarioId].title}
                            </span>
                          </p>
                        </motion.div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
          border: 3px solid white;
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
          border: 3px solid white;
        }
      `}</style>
    </div>
  );
}
