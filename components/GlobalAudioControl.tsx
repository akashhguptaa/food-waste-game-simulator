"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAudio } from "@/contexts/AudioContext";

export default function GlobalAudioControl() {
  const { isMuted, currentTrack, toggleMute, toggleTrack, isPlaying } =
    useAudio();
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {/* Mute/Unmute Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 p-3 rounded-full shadow-lg border-2 border-slate-500 hover:border-cyan-400 transition-colors"
      >
        <div className="text-3xl">{isMuted ? "🔇" : "🔊"}</div>

        {/* Red corner light */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
            >
              {isMuted ? "Unmute Music" : "Mute Music"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Track Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTrack}
        className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-3 rounded-full shadow-lg border-2 border-purple-500 hover:border-cyan-400 transition-colors"
      >
        <div className="text-2xl">{currentTrack === 0 ? "🎵" : "🎶"}</div>

        {/* Green corner light for active */}
        {isPlaying && (
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
        )}
      </motion.button>

      {/* Now Playing Indicator */}
      {isPlaying && !isMuted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600"
        >
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
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
          <span className="text-white/70 text-xs font-semibold">
            Track {currentTrack + 1}
          </span>
        </motion.div>
      )}
    </div>
  );
}
