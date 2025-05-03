"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeHoverPanel() {
  const router = useRouter();
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
    <div className=" w-72 select-none px-2 py-2 border border-black bg-honey bg-opacity-50 rounded-xl text-[#1E1E1E] font-semibold group glassmorphism scrollbar-thin">
      <div className="transition-all duration-500 ease-in-out overflow-hidden ">
        <h1 className="text-2xl">Extra Content</h1>
        <div className="flex max-h-0 scrollbar-thin overflow-y-scroll transition-all duration-500 group-hover:max-h-32 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleSignOut}
            className={`select-none mt-8 px-8 py-1 border rounded-xl text-lg 
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
