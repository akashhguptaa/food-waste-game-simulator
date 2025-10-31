"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function InitialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });
  const [isStarting, setIsStarting] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleStart = () => {
    if (
      formData.name &&
      formData.age &&
      formData.weight &&
      formData.height &&
      formData.gender
    ) {
      setIsStarting(true);
      // Store form data in localStorage
      localStorage.setItem("playerData", JSON.stringify(formData));
      // Navigate to scenario page
      setTimeout(() => {
        router.push("/scenerio");
      }, 1000);
    }
  };

  const isFormValid =
    formData.name &&
    formData.age &&
    formData.weight &&
    formData.height &&
    formData.gender;

  // Particle system for space dust - only render after mount
  const particles = Array.from({ length: 50 });

  return (
    <div className="relative min-h-screen bg-[#0a0e27] overflow-hidden flex items-center justify-center p-4">
      {/* Space Background with Stars */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map((_, i) => (
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

      {/* Animated Nebula Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>

      {/* Floating Food Decorations - Top Left */}
      <motion.div
        className="absolute top-8 left-8 text-8xl z-20 drop-shadow-2xl"
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
        className="absolute top-12 right-12 text-7xl z-20 drop-shadow-2xl"
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
        className="absolute top-1/3 left-4 text-7xl z-20 drop-shadow-2xl"
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
        className="absolute bottom-20 left-8 text-9xl z-20 drop-shadow-2xl"
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
            <div className="bg-[#1a1f3a] rounded-[1.2rem] p-8 md:p-12 relative overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

              {/* Title */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10 relative"
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-black mb-2 relative"
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
                  className="text-5xl md:text-7xl font-black relative"
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
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-48">
                    <span className="text-3xl">🥜</span>
                    <label className="text-white font-bold text-lg tracking-wide uppercase">
                      NAME:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=""
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
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-48">
                    <span className="text-3xl">🍪</span>
                    <label className="text-white font-bold text-lg tracking-wide uppercase">
                      AGE:
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder=""
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
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-48">
                    <span className="text-3xl">🍗</span>
                    <label className="text-white font-bold text-lg tracking-wide uppercase">
                      WEIGHT (KG):
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder=""
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
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-48">
                    <span className="text-3xl">🍇</span>
                    <label className="text-white font-bold text-lg tracking-wide uppercase">
                      HEIGHT (CM):
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder=""
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
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 w-48">
                    <span className="text-3xl">🍄</span>
                    <label className="text-white font-bold text-lg tracking-wide uppercase">
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
                      <option value="">SELECT...</option>
                      <option value="male">MALE</option>
                      <option value="female">FEMALE</option>
                      <option value="other">ACHHUT COMMUNITY</option>
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
                <motion.button
                  onClick={handleStart}
                  disabled={!isFormValid}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  className={`w-full py-5 rounded-xl font-black text-xl md:text-2xl transition-all relative overflow-hidden shadow-lg ${
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

              {/* Now Playing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 flex items-center justify-center gap-3 bg-slate-900/50 rounded-lg py-2 px-4"
              >
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-green-400 rounded-full"
                      animate={{ height: ["8px", "16px", "8px"] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
                <span className="text-white/70 text-sm font-semibold">
                  NOW PLAYING: initial.wav
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More Food Decorations - Right Side */}
      <motion.div
        className="absolute top-1/2 right-8 text-7xl z-20 drop-shadow-2xl"
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.7 }}
      >
        🌶️
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-12 text-8xl z-20 drop-shadow-2xl"
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
