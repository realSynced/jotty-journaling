"use client";
import { useState, useEffect, useRef } from "react";

interface Song {
  id: string;
  title: string;
  src: string;
}

// Sample songs - you'll need to add actual audio files to your public folder
const songs: Song[] = [
  { id: "1", title: "Ocean Waves", src: "/audio/ocean-waves.mp3" },
  { id: "2", title: "Forest Ambience", src: "/audio/forest-ambience.mp3" },
  { id: "3", title: "Gentle Rain", src: "/audio/gentle-rain.mp3" },
  { id: "4", title: "Meditation Bells", src: "/audio/meditation.mp3" },
];

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and autoplay on component mount
  useEffect(() => {
    // Attempt to play audio as soon as the component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Autoplay failed:", error);
          setIsPlaying(false);
          // Show visual indicator that user needs to interact
        }
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // Empty dependency array to run only on mount

  // Handle changes to song or playing state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying, volume]);

  // Handle song change
  const handleSongChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSong = songs.find((song) => song.id === e.target.value);
    if (selectedSong) {
      setCurrentSong(selectedSong);
      setIsPlaying(true);
    }
  };

  // Handle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle stop
  const handleStop = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative z-20">
      {/* Floating music control button with playing indicator */}
      <button
        onClick={toggleExpanded}
        className={`absolute bg-cream rounded-full p-3 shadow-lg border-2 ${
          isPlaying ? "border-jotty-caramel" : "border-red-400"
        } hover:bg-honey transition-colors duration-300`}
        style={{ bottom: isExpanded ? "220px" : "0px" }}
        aria-label="Toggle music player"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 ${isPlaying ? "text-caramel" : "text-red-400"}`}
        >
          <path
            fillRule="evenodd"
            d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Collapsible music player panel */}
      <div
        className={`bg-cream bg-opacity-90 p-4 rounded-xl shadow-lg transition-all duration-300 w-56 ${
          isExpanded
            ? "opacity-100 translate-y-0 -translate-x-40"
            : "opacity-0 translate-y-12  pointer-events-none"
        }`}
        style={{ position: "absolute", bottom: "12px" }}
      >
        <audio
          ref={audioRef}
          src={currentSong.src}
          loop
          autoPlay
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-caramel font-bold text-lg">Ambient Sounds</h3>
          <div className="flex space-x-1">
            {/* Play/Pause button */}
            <button
              onClick={togglePlayPause}
              className="p-2 bg-honey text-caramel rounded-lg hover:bg-spring transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Stop button */}
            <button
              onClick={handleStop}
              className="p-2 bg-honey text-caramel rounded-lg hover:bg-spring transition-colors"
              aria-label="Stop"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Song selection dropdown */}
        <div className="mb-3">
          <select
            value={currentSong.id}
            onChange={handleSongChange}
            className="w-full bg-honey bg-opacity-80 text-caramel border border-jotty-caramel rounded-lg px-3 py-1.5 text-sm font-medium appearance-none cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-jotty-spring"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4A373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title}
              </option>
            ))}
          </select>
        </div>

        {/* Volume slider */}
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-caramel opacity-60"
          >
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-spring"
            style={{
              backgroundImage: `linear-gradient(to right, #D4A373 0%, #D4A373 ${
                volume * 100
              }%, #E9EDC9 ${volume * 100}%, #E9EDC9 100%)`,
            }}
          />
        </div>

        {/* Now playing indicator */}
        <div className="mt-3 text-center text-caramel text-sm opacity-80">
          {isPlaying ? `Now playing: ${currentSong.title}` : "Paused"}
        </div>
      </div>
    </div>
  );
}
