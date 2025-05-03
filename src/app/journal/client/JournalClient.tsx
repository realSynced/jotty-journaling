"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { images } from "@/assets/images";
import { useRouter } from "next/navigation";

// components
import HomeHoverPanel from "@/app/ui/components/HomeHoverPanel";
import MusicPlayer from "@/app/ui/components/MusicPlayer";
import PromptLoader from "@/app/ui/components/PromptLoader";

const backgrounds = [
  { key: "default", label: "Beach Day" },
  { key: "1", label: "Mountain View" },
  { key: "2", label: "Forest Path" },
  { key: "3", label: "Sunset Sky" },
  { key: "4", label: "Ocean Waves" },
];

export default function JournalClient({ username }: { username: string }) {
  const router = useRouter();
  const [selectedBackground, setSelectedBackground] = useState("default");
  const [time, setTime] = useState<Date>(new Date());

  // Add real-time clock update
  useEffect(() => {
    // Update time immediately on first render
    setTime(new Date());

    // Set up interval to update time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBackground(e.target.value);
  };

  // Determine which background image to use
  const backgroundImage =
    selectedBackground === "default"
      ? images.DefaultBackground4
      : images[`DefaultBackground${selectedBackground}` as keyof typeof images];

  return (
    <div className="min-h-screen relative bg-cream flex justify-center items-center">
      <div className="w-[100%] h-[calc(100vh-2rem)] rounded-3xl overflow-hidden relative">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl mx-auto w-3/4">
          <Image
            src={backgroundImage}
            alt="Background image"
            fill
            quality={100}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-3xl"
          />
        </div>

        {/* Cream overlay */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundColor: "#FEFAE0", opacity: 0.15 }}
        ></div>
        <div className="absolute h-auto inset-0 flex flex-col items-center w-3/4 mx-auto px-4">
          <div className="z-20 w-full h-max py-4 justify-center flex ">
            <div className="flex space-x-4 w-full">
              <div
                className={`select-none h-max px-8 py-2 border border-black bg-honey rounded-xl text-2xl 
                      text-[#1E1E1E] font-semibold shadow-lg hover:scale-105 
                      transition-all duration-500`}
              >
                <p>Good morning, {username}</p>
              </div>
              <div
                className={`mr-auto h-max select-none px-8 py-2 border border-black bg-honey rounded-xl text-2xl 
                      text-[#1E1E1E] font-semibold shadow-lg hover:scale-105 
                      transition-all duration-500`}
              >
                <p>{time.toLocaleTimeString()}</p>
              </div>

              <div className="">
                <HomeHoverPanel />
              </div>
            </div>
          </div>
          <div className="z-10 absolute h-full w-full  flex flex-col items-center justify-center space-y-4">
            <div className="sticky">
              <PromptLoader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
