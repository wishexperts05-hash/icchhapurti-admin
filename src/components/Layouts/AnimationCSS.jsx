import React from 'react';

const AnimationCSS = () => (
  <style>{`
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes iconBounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    
    @keyframes textReveal {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-slide-in-left {
      animation: slideInLeft 0.5s ease-out;
    }
    
    .animate-icon-bounce {
      animation: iconBounce 1s ease-in-out;
    }
    
    .animate-text-reveal {
      animation: textReveal 0.3s ease-out;
    }
    
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 200px 100%;
      animation: shimmer 2s infinite;
    }
    
    .animate-pulse-custom {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .animate-slide-down {
      animation: slideDown 0.3s ease-out;
    }
    
    .card-hover-effect {
      transition: all 0.2s ease-in-out;
    }
    
    .card-hover-effect:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .micro-bounce {
      transition: transform 0.15s ease-in-out;
    }
    
    .micro-bounce:hover {
      transform: scale(1.05);
    }
  `}</style>
);

export default AnimationCSS;