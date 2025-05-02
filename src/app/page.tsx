import Image from "next/image";
import Link from "next/link";
import { images } from "@/assets/images";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] min-h-screen relative bg-jotty-cream">
      {/* Main content container with beach background */}
      <div className="m-4 h-[calc(100vh-2rem)] rounded-3xl overflow-hidden relative ">
        {/* Beach background image */}
        <div className="absolute inset-0 overflow-hidden  rounded-3xl w-5/6 mx-auto">
          <Image
            src={images.DefaultBackground}
            alt="Beach background"
            fill
            // sizes="100vw"

            quality={100}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="rounded-3xl "
          />
        </div>

        {/* Cream overlay with 25% opacity */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundColor: "#FEFAE0", opacity: 0.15 }}
        ></div>

        {/* Content overlay with logo and button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Logo text with very thin black outline and caramel fill */}
          <h1
            className="text-9xl font-bold text-caramel"
            style={{
              // color: "#D4A373",
              WebkitTextStroke: "0.05px black",
              textShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            jotty
          </h1>

          {/* "lets go" button */}
          <button className="mt-8 px-8 py-2 border border-black  bg-spring rounded-xl text-2xl text-[#1E1E1E] font-semibold  shadow-lg hover:bg-spring-dark transition-colors duration-300 hover:cursor-pointer">
            lets go
          </button>
        </div>
      </div>
    </div>
  );
}
