"use client";
import Image from "next/image";
import { useState } from "react";
import { images } from "@/assets/images";
import { useRouter } from "next/navigation";
import OnboardingModal from "@/app/ui/components/Onboarding";
import MusicPlayer from "@/app/ui/components/MusicPlayer";

const backgrounds = [
  { key: "default", label: "Beach Day" },
  { key: "1", label: "Mountain View" },
  { key: "2", label: "Forest Path" },
  { key: "3", label: "Sunset Sky" },
  { key: "4", label: "Ocean Waves" },
];

export default function Journal() {
  const router = useRouter();
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

  const handleSignOut = async () => {
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Redirect will be handled by the server response
        // but we can also force a refresh to be sure
        router.refresh();
      } else {
        console.error("Sign out failed");
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <button
            onClick={handleSignOut}
            className={`select-none mt-8 px-8 py-2 border border-black bg-spring rounded-xl text-2xl 
                      text-[#1E1E1E] font-semibold shadow-lg hover:bg-honey 
                      transition-all duration-500 hover:cursor-pointer`}
            type="button"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
