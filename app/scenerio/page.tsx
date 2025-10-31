'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScenarioPage() {
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    // Get player data from localStorage
    const data = localStorage.getItem('playerData');
    if (data) {
      setPlayerData(JSON.parse(data));
    }
  }, []);

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

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
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
                className="text-center mb-10"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-black mb-2"
                  style={{
                    color: '#d4a574',
                    textShadow: '0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #8b6f47, 1px 1px 0 #f4d5a4',
                    letterSpacing: '0.05em'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)',
                      '0 0 20px rgba(212,165,116,0.7), 0 0 30px rgba(212,165,116,0.5), 2px 2px 4px rgba(0,0,0,0.8)',
                      '0 0 10px rgba(212,165,116,0.5), 0 0 20px rgba(212,165,116,0.3), 2px 2px 4px rgba(0,0,0,0.8)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  SCENARIO
                </motion.h1>
              </motion.div>

              {/* Player Info Display */}
              {playerData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-cyan-500/30"
                >
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <span>👤</span> Player Profile
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-white/60 text-sm uppercase">Name</p>
                      <p className="text-white font-bold">{playerData.name}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase">Age</p>
                      <p className="text-white font-bold">{playerData.age}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase">Weight</p>
                      <p className="text-white font-bold">{playerData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase">Height</p>
                      <p className="text-white font-bold">{playerData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase">Gender</p>
                      <p className="text-white font-bold capitalize">{playerData.gender}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scenario Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center space-y-6"
              >
                <div className="text-8xl mb-6">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎮
                  </motion.span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Welcome to the Game, {playerData?.name || 'Player'}!
                </h2>
                
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Get ready to test your portion estimation skills. We'll show you various foods, 
                  and you'll need to guess their portion sizes based on your nutritional knowledge!
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-5xl mt-8">
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  >
                    🍕
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  >
                    🍔
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  >
                    🥗
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  >
                    🍜
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                  >
                    🍰
                  </motion.span>
                </div>

                {/* Continue Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-12 py-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-white font-black text-xl rounded-xl shadow-lg relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative z-10">
                    CONTINUE TO GAME
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Food Decorations */}
      <motion.div
        className="absolute top-12 left-12 text-7xl z-20 drop-shadow-2xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🥦
      </motion.div>

      <motion.div
        className="absolute top-12 right-12 text-7xl z-20 drop-shadow-2xl"
        animate={{ 
          y: [0, -15, 0],
          rotate: [5, -5, 5]
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🥩
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-8 text-8xl z-20 drop-shadow-2xl"
        animate={{ 
          y: [0, -12, 0],
          rotate: [-3, 3, -3]
        }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.3 }}
      >
        🍇
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-12 text-8xl z-20 drop-shadow-2xl"
        animate={{ 
          y: [0, -18, 0],
          rotate: [3, -3, 3]
        }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 0.2 }}
      >
        🥕
      </motion.div>
    </div>
  );
}
