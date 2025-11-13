import React, { useEffect, useState } from "react";
import logo from "../../assets/adminLogo.png";

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out 2 seconds before the splash disappears
    const timer = setTimeout(() => setFadeOut(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center h-screen  transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="App Logo"
          className="w-[520px] h-[520px] mb-6 animate-bounce-slow"
        />
      
      </div>
    </div>
  );
};

export default SplashScreen;
