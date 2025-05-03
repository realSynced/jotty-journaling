"use client";
import { useState } from "react";
import Image from "next/image";
import { icons } from "@/assets/icons"; // Adjust the import path as necessary

export default function PromptLoader() {
  const [loading, setLoading] = useState(true);

  // Simulate loading state for demonstration purposes
  setTimeout(() => {
    setLoading(false);
  }, 5000); // Simulate a 2-second loading time
  return (
    <div className="w-72 h-max select-none px-2 py-2 rounded-xl text-[#1E1E1E] font-semibold group bg-honey/25 backdrop-blur-xs drop-shadow-xl glassmorphism2 scrollbar-thin ">
      <div className="flex flex-col gap-2">
        <div className=" ml-auto">
          <button className="cursor-pointer" onClick={() => setLoading(true)}>
            <Image
              src={icons.Refresh}
              alt="Refresh Icon"
              width={20}
              height={20}
              className={`${
                loading ? "animate-spin" : ""
              } hover:scale-110 transition-transform duration-300`}
            />
          </button>
        </div>
        <div className=" -mt-2 overflow-y-auto scrollbar-thin">
          <h1 className="text-2xl text-[#1E1E1E]">Prompt:</h1>
          <p>
            "Write a short story about a time traveler who visits the year 3000
            and discovers a world where humans and AI coexist peacefully."
          </p>
        </div>
      </div>
    </div>
  );
}
