import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaTree, FaLightbulb, FaUsers, FaTools } from "react-icons/fa";

// Palette MKGS
const COLORS = {
  primary: "#002d52",
  secondary: "#006699",
  accent: "#f2c94c",
  neutral: "#333333",
  light: "#ffffff",
};

// Grid + Parallax + Glow
const AnimatedGrid = styled(motion.svg)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
  filter: blur(0.7px) drop-shadow(0 0 8px #00669944);
  transition: filter 0.5s;
`;

// Glow effect for icons
const IconWrapper = styled(motion.div)`
  position: absolute;
  font-size: 2.7rem;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 0 12px #f2c94c88);
  @media (max-width: 700px) {
    font-size: 1.4rem;
  }
`;

// Floating text
const CenterText = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  color: ${COLORS.accent};
  font-size: 2.1rem;
  font-weight: 700;
  opacity: 0.17;
  letter-spacing: 0.08em;
  pointer-events: none;
  text-shadow: 0 2px 14px #002d5240;
  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
`;

function FondAnimerPremium() {
  // Effet Parallax : on suit la souris
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      setPos({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Responsive fallback mobile (pas de parallax)
  const isMobile = window.innerWidth < 700;

  return (
    <>
      <AnimatedGrid
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        initial={{ scale: 1, opacity: 0.2 }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.2, 0.48, 0.32],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          filter: pos.x !== 0 ? "blur(1.3px) drop-shadow(0 0 22px #f2c94c)" : "",
        }}
      >
        {/* Vertical lines */}
        {[...Array(40)].map((_, i) => (
          <line
            key={"v" + i}
            x1={i * 30}
            y1="0"
            x2={i * 30}
            y2="800"
            stroke={COLORS.secondary}
            strokeWidth="0.7"
            opacity="0.34"
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(28)].map((_, i) => (
          <line
            key={"h" + i}
            x1="0"
            y1={i * 30}
            x2="1200"
            y2={i * 30}
            stroke={COLORS.primary}
            strokeWidth="0.7"
            opacity="0.23"
          />
        ))}
        {/* Diagonal lines (accent color, light) */}
        {[...Array(10)].map((_, i) => (
          <line
            key={"diag" + i}
            x1={i * 120}
            y1="0"
            x2="0"
            y2={i * 80}
            stroke={COLORS.accent}
            strokeWidth="0.55"
            opacity="0.16"
          />
        ))}
      </AnimatedGrid>

      {/* Icônes premium & animées, inspirées de l'identité MKGS */}
      <IconWrapper
        style={{
          top: `${isMobile ? 65 : 120 + pos.y * 0.06}px`,
          left: `${isMobile ? 12 : 70 + pos.x * 0.08}px`,
          color: COLORS.accent,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaTree />
      </IconWrapper>

      <IconWrapper
        style={{
          top: `${isMobile ? 20 : 420 - pos.y * 0.08}px`,
          left: `${isMobile ? 'calc(100vw - 40px)' : 1000 - pos.x * 0.09}px`,
          color: COLORS.secondary,
        }}
        animate={{ rotate: [0, 359] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      >
        <FaLightbulb />
      </IconWrapper>

      <IconWrapper
        style={{
          top: `${isMobile ? 330 : 670 - pos.y * 0.10}px`,
          left: `${isMobile ? 65 : 250 + pos.x * 0.10}px`,
          color: COLORS.primary,
        }}
        animate={{ scale: [1, 1.09, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaUsers />
      </IconWrapper>

      <IconWrapper
        style={{
          top: `${isMobile ? 370 : 110 + pos.y * 0.13}px`,
          left: `${isMobile ? 'calc(100vw - 60px)' : 950 - pos.x * 0.10}px`,
          color: COLORS.neutral,
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaTools />
      </IconWrapper>

      {/* Texte flottant inspirant */}
      <CenterText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.16, y: 0 }}
        transition={{ duration: 2.3, delay: 1.1 }}
      >
        Transformez vos espaces en expériences
      </CenterText>
    </>
  );
}

export default FondAnimerPremium;
