"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

type AudioContextType = {
  isMuted: boolean;
  currentTrack: number;
  toggleMute: () => void;
  toggleTrack: () => void;
  isPlaying: boolean;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = ["/initial.wav", "/initial1.wav"];

  useEffect(() => {
    // Create audio element
    const audio = new Audio(tracks[currentTrack]);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Function to start audio after user interaction
    const startAudio = async () => {
      if (!userInteracted && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setUserInteracted(true);
          console.log("✅ Audio started successfully!");
        } catch (error) {
          console.log(
            "❌ Autoplay prevented, waiting for user interaction:",
            error
          );
        }
      }
    };

    // Try to start audio
    startAudio();

    // Listen for any user interaction to start audio
    const handleInteraction = () => {
      if (!userInteracted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setUserInteracted(true);
          })
          .catch(console.error);
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && userInteracted) {
      const currentTime = audioRef.current.currentTime;
      const wasPlaying = !audioRef.current.paused;

      audioRef.current.src = tracks[currentTrack];
      audioRef.current.currentTime = 0;

      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  // Handle mute changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  return (
    <AudioContext.Provider
      value={{ isMuted, currentTrack, toggleMute, toggleTrack, isPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
