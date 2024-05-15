import React, { useState } from "react";
import "./Cards.css";
import Image from "next/image";

function Cards() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleHover1 = () => {
    setIsHovered1(true);
  };

  const handleLeave1 = () => {
    setIsHovered1(false);
  };

  const handleHover2 = () => {
    setIsHovered2(true);
  };

  const handleLeave2 = () => {
    setIsHovered2(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div
        className={`relative w-72 h-52 bg-gray-300 transition-transform origin-top transform-gpu hover:scale-y-[2] hover:scale-x-[1.5] hover:z-10 ${
          isHovered1 ? "hovered" : ""
        }`}
        onMouseEnter={handleHover1}
        onMouseLeave={handleLeave1}
      >
        <Image src="/diwali.png" alt="diwali" width={300} height={200} />
      </div>
      <div
        className={`relative w-72 h-52 bg-gray-300 transition-transform origin-top transform-gpu hover:scale-y-[2] hover:scale-x-[1.5] hover:z-10 ${
          isHovered2 ? "hovered" : ""
        }`}
        onMouseEnter={handleHover2}
        onMouseLeave={handleLeave2}
      >
        <Image src="/image1.webp" alt="diwali" width={300} height={200} />
      </div>
      <div
        className={`relative w-72 h-52 bg-gray-300 transition-transform origin-top transform-gpu hover:scale-y-[2] hover:scale-x-[1.5] hover:z-10 ${
          isHovered2 ? "hovered" : ""
        }`}
      >
        <video width="320" height="240" controls>
          <source src="/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Cards;
