import React from "react";
import Image from "next/image";
import christmas from "../../public/christmas.jpg";
function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${christmas.src})` }}
      className="w-full bg-cover min-h-screen bg-slate-300 flex"
    ></div>
  );
}

export default Hero;
