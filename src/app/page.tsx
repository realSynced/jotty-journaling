"use client";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/assets/images";
import OnboardingModal from "@/app/ui/components/Onboarding";
import MusicPlayer from "./ui/components/MusicPlayer";

const backgrounds = [
  { key: "default", label: "Beach Day" },
  { key: "1", label: "Mountain View" },
  { key: "2", label: "Forest Path" },
  { key: "3", label: "Sunset Sky" },
  { key: "4", label: "Ocean Waves" },
];

export default function Home() {
  const [selectedBackground, setSelectedBackground] = useState("default");
  const [animationState, setAnimationState] = useState("initial"); // initial, fadeButton, slideText, fadeText, showQuestions
  const jottyText = "jotty";

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBackground(e.target.value);
  };

  const handleButtonClick = () => {
    setAnimationState("fadeButton");

    // Chain animations with timeouts
    setTimeout(() => {
      setAnimationState("slideText");
      setTimeout(() => {
        setAnimationState("fadeText");
        setTimeout(() => {
          setAnimationState("showQuestions");
        }, 800); // Wait for text to fade before showing questions
      }, 700); // Wait for text slide before starting fade
    }, 500); // Wait for button to fade before sliding text
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

        {/* Content overlay with logo and button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Logo text with staggered fade effect */}
          <div
            className={`transition-transform duration-700 ${
              animationState === "slideText" ||
              animationState === "fadeText" ||
              animationState === "showQuestions"
                ? "transform -translate-y-8"
                : ""
            }`}
          >
            <h1 className="text-9xl font-bold flex justify-center">
              {jottyText.split("").map((char, index) => (
                <span
                  key={index}
                  className={`text-caramel transition-opacity duration-500 select-none`}
                  style={{
                    WebkitTextStroke: "0.05px black",
                    textShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
                    opacity:
                      animationState === "fadeText" ||
                      animationState === "showQuestions"
                        ? 0
                        : 1,
                    transitionDelay:
                      animationState === "fadeText"
                        ? `${(jottyText.length - 1 - index) * 100}ms` // Staggered from right to left
                        : "0ms",
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* "lets go" button with fade out */}
          <button
            onClick={handleButtonClick}
            className={`select-none mt-8 px-8 py-2 border border-black bg-spring rounded-xl text-2xl 
                      text-[#1E1E1E] font-semibold shadow-lg hover:bg-honey 
                      transition-all duration-500 hover:cursor-pointer ${
                        animationState !== "initial"
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
          >
            lets go
          </button>
        </div>

        {/* Questions div that appears after animations */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
            animationState === "showQuestions"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <OnboardingModal />
        </div>

        {/* Music Player - fixed in bottom left */}
        {/* <div className="absolute bottom-4 left-4 z-10 w-64">
          <MusicPlayer />
        </div> */}

        {/* Background select menu */}
        <div
          className={`absolute bottom-4 right-4 z-10 transition-opacity duration-500 flex flex-col justify-center items-center`}
        >
          <div className="mb-4">
            <MusicPlayer />
          </div>
          <select
            value={selectedBackground}
            onChange={handleBackgroundChange}
            className="w-max bg-honey bg-opacity-80 text-caramel border border-caramel rounded-lg px-3 py-1.5 text-sm font-medium appearance-none cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-spring"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4A373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            {backgrounds.map((bg) => (
              <option key={bg.key} value={bg.key}>
                {bg.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
