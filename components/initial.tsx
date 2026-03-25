"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import scenariosData from "@/data/scenarios.json";

export default function InitialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });
  const [isStarting, setIsStarting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [startError, setStartError] = useState("");

  const isValidEmail = (email: string) => {
    // Accept 1-4 alphanumeric blocks before @plaksha.edu.in.
    const emailPattern =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+){0,3}@plaksha\.edu\.in$/;
    return emailPattern.test(email.trim());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStart = async () => {
    const emailIsValid = isValidEmail(formData.email);

    if (
      formData.name &&
      formData.email &&
      emailIsValid &&
      formData.age &&
      formData.weight &&
      formData.height &&
      formData.gender
    ) {
      setStartError("");
      setIsStarting(true);
      // Store form data in localStorage
      localStorage.setItem("playerData", JSON.stringify(formData));

      try {
        const res = await fetch("/api/db", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "initializeGame",
            payload: {
              player: {
                ...formData,
                gmail: formData.email,
              },
              scenarios: scenariosData.scenarios.map((s) => ({
                id: s.id,
                title: s.title,
              })),
            },
          }),
        });

        const { userId, sessionId, alreadyExists } = await res.json();
        if (alreadyExists) {
          setStartError(
            "This email has already been used for a submission. You can only submit once."
          );
          setIsStarting(false);
          return;
        }

        if (userId === null) {
          setStartError("Unable to start right now. Please try again.");
          setIsStarting(false);
          return;
        }

        localStorage.setItem("db_userId", String(userId));
        if (sessionId === null) {
          setStartError("Unable to start right now. Please try again.");
          setIsStarting(false);
          return;
        }

        localStorage.setItem("db_sessionId", String(sessionId));
      } catch (err) {
        console.error("[DB] Error during game start:", err);
        setStartError("Unable to start right now. Please try again.");
        setIsStarting(false);
        return;
      }

      // Navigate to scenario page
      setTimeout(() => {
        router.push("/scenerio");
      }, 1000);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    isValidEmail(formData.email) &&
    formData.age &&
    formData.weight &&
    formData.height &&
    formData.gender;

  const showEmailError =
    formData.email.length > 0 && !isValidEmail(formData.email);

  // Deterministic particle values prevent SSR/CSR hydration mismatches.
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    duration: 2 + (i % 4) * 0.75,
    delay: (i % 5) * 0.3,
  }));

  return (
    <div className="relative min-h-screen bg-[#0a0e27] overflow-hidden flex items-start md:items-center justify-center px-3 py-16 sm:p-4">
      {/* Space Background with Stars */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Nebula Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>

      {/* Floating Food Decorations - Top Left */}
      <motion.div
        className="hidden sm:block absolute top-8 left-8 text-5xl md:text-8xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -20, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🥦
      </motion.div>

      {/* Floating Food Decorations - Top Right */}
      <motion.div
        className="hidden sm:block absolute top-12 right-12 text-5xl md:text-7xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -15, 0],
          rotate: [5, -5, 5],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🥩
      </motion.div>

      {/* Avocado - Left Side */}
      <motion.div
        className="hidden md:block absolute top-1/3 left-4 text-7xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🥑
      </motion.div>

      {/* Meat - Bottom Left */}
      <motion.div
        className="hidden sm:block absolute bottom-20 left-8 text-6xl md:text-9xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -12, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.3 }}
      >
        🥩
      </motion.div>

      {/* Main Card with Metallic Frame */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Outer Metallic Frame */}
        <div className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-3xl p-1 shadow-2xl">
          {/* Corner Lights */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>

          {/* Inner Frame */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[1.3rem] p-1">
            <div className="bg-[#1a1f3a] rounded-[1.2rem] p-4 sm:p-6 md:p-12 relative overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

              {/* Title */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 sm:mb-10 relative"
              >
                <motion.h1
                  className="text-3xl sm:text-5xl md:text-7xl font-black mb-1 sm:mb-2 relative leading-tight"
                  style={{
                    color: "#d4a574",
                    textShadow:
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #8b6f47, 1px 1px 0 #f4d5a4",
                    letterSpacing: "0.05em",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                      "0 0 20px rgba(212,165,116,0.7), 0 0 30px rgba(212,165,116,0.5), 2px 2px 4px rgba(0,0,0,0.8)",
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  PORTION
                </motion.h1>
                <motion.h1
                  className="text-3xl sm:text-5xl md:text-7xl font-black relative leading-tight"
                  style={{
                    color: "#d4a574",
                    textShadow:
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #8b6f47, 1px 1px 0 #f4d5a4",
                    letterSpacing: "0.05em",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                      "0 0 20px rgba(212,165,116,0.7), 0 0 30px rgba(212,165,116,0.5), 2px 2px 4px rgba(0,0,0,0.8)",
                      "0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  PRODIGY
                </motion.h1>
              </motion.div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Name Input */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">🥜</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      NAME:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-400 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all font-medium text-base shadow-inner"
                    />
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🥕
                    </motion.div>
                  </div>
                </motion.div>

                {/* Age Input */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">📧</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      EMAIL:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+){0,3}@plaksha\.edu\.in$"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-lg bg-white border-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-medium text-base shadow-inner ${
                        showEmailError
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                          : "border-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                      }`}
                    />
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >
                      ✉️
                    </motion.div>
                  </div>
                </motion.div>

                {showEmailError && (
                  <p className="-mt-1 sm:-mt-2 pl-0 sm:pl-52 text-xs sm:text-sm text-red-400 font-medium">
                    Use 1 to 4 alphanumeric blocks before @plaksha.edu.in.
                    Example: abc@plaksha.edu.in, abc.def@plaksha.edu.in,
                    abc.def.ghi@plaksha.edu.in, abc.def.ghi.jkl@plaksha.edu.in.
                  </p>
                )}

                {/* Age Input */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">🍪</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      AGE:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-400 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all font-medium text-base shadow-inner"
                    />
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      ✂️
                    </motion.div>
                  </div>
                </motion.div>

                {/* Weight Input */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">🍗</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      WEIGHT (KG):
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Enter your weight (kg)"
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-400 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all font-medium text-base shadow-inner"
                    />
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ✅
                    </motion.div>
                  </div>
                </motion.div>

                {/* Height Input */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">🍇</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      HEIGHT (CM):
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Enter your height (cm)"
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-400 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all font-medium text-base shadow-inner"
                    />
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      💜
                    </motion.div>
                  </div>
                </motion.div>

                {/* Gender Select */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-2xl sm:text-3xl">🍄</span>
                    <label className="text-white font-bold text-sm sm:text-lg tracking-wide uppercase">
                      GENDER:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-slate-400 text-slate-800 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all font-medium text-base shadow-inner appearance-none cursor-pointer"
                    >
                      <option value="">Select your gender</option>
                      <option value="male">MALE</option>
                      <option value="female">FEMALE</option>
                      <option value="other">OTHERS...</option>
                    </select>
                    <motion.div
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl pointer-events-none"
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      ⚙️
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Start Button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                {startError && (
                  <p className="mb-3 text-center text-sm font-semibold text-red-400">
                    {startError}
                  </p>
                )}
                <motion.button
                  onClick={handleStart}
                  disabled={!isFormValid || isStarting}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  className={`w-full py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg ${
                    isFormValid
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-white cursor-pointer"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  style={{
                    boxShadow: isFormValid
                      ? "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)"
                      : "none",
                  }}
                >
                  {isFormValid && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(6, 182, 212, 0.4)",
                            "0 0 40px rgba(6, 182, 212, 0.8)",
                            "0 0 20px rgba(6, 182, 212, 0.4)",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      👆
                    </motion.span>
                    {isStarting ? "LOADING..." : "START YOUR QUEST!"}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More Food Decorations - Right Side */}
      <motion.div
        className="hidden sm:block absolute top-1/2 right-8 text-5xl md:text-7xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.7 }}
      >
        🌶️
      </motion.div>

      <motion.div
        className="hidden sm:block absolute bottom-32 right-12 text-6xl md:text-8xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -18, 0],
          rotate: [3, -3, 3],
        }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.2 }}
      >
        🥕
      </motion.div>
    </div>
  );
}
