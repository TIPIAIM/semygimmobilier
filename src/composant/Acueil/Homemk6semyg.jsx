// src/components/Sections/IdeasToLife.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaStar,
 
  FaBuilding,
  FaChartLine,
  FaShieldAlt,
  FaHandshake
} from "react-icons/fa";
import colors from "../../Styles/colors";

/* =================== Section améliorée =================== */
const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(3rem, 4vw, 6rem) 1rem;
  background:
    linear-gradient(135deg, ${colors.semygprimary} 0%, ${colors.semygsecondar} 100%),
    radial-gradient(ellipse at 20% 20%, ${colors.semygsecondary}40 0%, transparent 40%),
    radial-gradient(ellipse at 80% 30%, ${colors.accentGold}26 0%, transparent 40%);
  color: ${colors.semygjouneclàire};
  border-top: 1px solid ${colors.semygjouneclàire}10;
  border-bottom: 1px solid ${colors.semygjouneclàire}10;
  
  /* Effet de lumière subtil */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 70% 30%, ${colors.semygprimar}10 0%, transparent 30%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  --side-pad: clamp(0.75rem, 2.5vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: var(--side-pad);
  position: relative;
  z-index: 2;

  @media (max-width: 640px) {
    padding-inline: clamp(0.75rem, 4vw, 1.25rem);
  }
`;

/* =================== Titre premium =================== */
const Title = styled(motion.h2)`
  margin: 0 auto clamp(1.5rem, 3vw, 3rem);
  font-size: clamp(1.6rem, 3.8vw, 2.6rem);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  max-width: 52ch;
  position: relative;
  padding-bottom: 1rem;
  background-image: linear-gradient(
    90deg,
    ${colors.semygprimar} 50%,
    ${colors.semygjouneclàire} 50%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &::after {
    content: "";
    position: absolute;
    inset-inline-start: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: clamp(84px, 10vw, 120px);
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      ${colors.semygjouneclàire} 50%,
      ${colors.semygprimar} 50%
    );
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
`;

/* =================== Grille améliorée =================== */
const Grid = styled.div`
  display: grid;
  gap: clamp(0.9rem, 2.5vw, 1.8rem);
  grid-template-columns: repeat(12, minmax(0, 1fr));

  /* Desktop: 3 colonnes égales */
  & > article:nth-child(1) { grid-column: span 4; }
  & > article:nth-child(2) { grid-column: span 4; }
  & > article:nth-child(3) { grid-column: span 4; }

  /* Tablette */
  @media (max-width: 1024px) {
    & > article { grid-column: span 6 !important; }
  }

  /* Mobile */
  @media (max-width: 640px) {
    & > article { grid-column: 1 / -1 !important; }
  }
`;

/* =================== Cartes premium =================== */
const Card = styled(motion.article)`
  position: relative;
  background: linear-gradient(145deg, ${colors.semygsecondar}, rgba(255,255,255,0.03));
  //border: 1px solid ${colors.semygjouneclàire}15;
  border-radius: 2px;
  padding: clamp(1.5rem, 2.5vw, 2.2rem) clamp(1.2rem, 2.2vw, 2rem);
  backdrop-filter: blur(12px);
  box-shadow:
    0 12px 36px rgba(0,0,0,0.24),
    0 4px 12px rgba(0,0,0,0.12),
    inset 0 1px 0 rgba(255,255,255,0.08);
  transition: all .4s cubic-bezier(.16,1,.3,1);
  overflow: hidden;

  /* Effet de bordure animé */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(135deg, ${colors.semygprimar}60, ${colors.semygsecondar}60);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 56px rgba(0,0,0,0.32);
    
    &::before {
      opacity: 1;
    }
  }

  /* Ligne décorative interne */
  &::after {
    content: "";
    position: absolute;
    top: 60px;
    left: clamp(0.9rem, 2vw, 1.2rem);
    right: clamp(0.9rem, 2vw, 1.2rem);
    height: 2px;
    background: linear-gradient(
      90deg,
      ${colors.semygsecondar}99,
      ${colors.semygprimar}99
    );
    border-radius: 2px;
  }
`;

const IconBadge = styled.div`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(50px, 5.4vw, 60px);
  height: clamp(50px, 5.4vw, 60px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${colors.error};
  background: ${colors.semygsecondary};
  box-shadow: 0 10px 28px rgba(0,0,0,0.35), 0 0 0 8px rgba(255,255,255,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${Card}:hover & {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 0 8px rgba(255,255,255,0.15);
  }

  svg { 
    font-size: clamp(1.2rem, 2.2vw, 1.5rem); 
    color: ${colors.semygprimary}; 
  }
`;

const CardTitle = styled.h3`
  margin: clamp(3rem, 4vw, 3.8rem) 0 1rem;
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 800;
  color: ${colors.semygjouneclàire};
  text-align: center;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
`;

const CardText = styled.p`
  margin: 0;
  font-size: clamp(0.98rem, 1.8vw, 1.08rem);
  line-height: 1.8;
  color: ${colors.semygjouneclàire}ee;
  text-align: center;
  font-weight: 300;

  strong {
    color: ${colors.semygprimar};
    font-weight: 600;
    position: relative;
    display: inline-block;
    
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: currentColor;
      opacity: 0.6;
    }
  }
`;

/* =================== Liste premium =================== */
 
 
/* =================== Animation premium =================== */
const AnimatedGrid = styled(motion.svg)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.45;
  pointer-events: none;
  filter: blur(0.6px) drop-shadow(0 0 10px ${colors.semygsecondar}55);

  @media (max-width: 640px) {
    opacity: 0.3;
    filter: blur(0.5px);
  }
`;

const IconWrapper = styled(motion.div)`
  position: absolute;
  font-size: clamp(1.2rem, 2.8vw, 2.5rem);
  z-index: 1;
  pointer-events: none;
  filter: drop-shadow(0 0 12px ${colors.semygjouneclàire});
`;
/* Hook: détection prefers-reduced-motion */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/* Animation de fond premium */
function FondAnimerSemyg() {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 700);
    updateMobile();

    const move = (e) => {
      if (reduced) return;
      setPos({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      });
    };

    window.addEventListener("resize", updateMobile);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("resize", updateMobile);
      window.removeEventListener("mousemove", move);
    };
  }, [reduced]);

  const gridAnim = reduced
    ? { opacity: 0.25 }
    : { scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.35] };

  return (
    <>
      <AnimatedGrid
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        initial={{ scale: 1, opacity: 0.25 }}
        animate={gridAnim}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }
        style={{
          filter:
            !reduced && pos.x !== 0
              ? `blur(1.2px) drop-shadow(0 0 18px ${colors.semygprimar}88)`
              : undefined,
        }}
        aria-hidden
      >
        {/* Lignes verticales */}
        {[...Array(36)].map((_, i) => (
          <line
          key={"h" + i}
          x1="600"
          y1={i *360}
          x2="1100"
          y2={i * 10}
            stroke={colors.semygprimar}
            strokeWidth="0.7"
            opacity="0.95"
          />
        ))}
        {/* Lignes horizontales */}
        {[...Array(6)].map((_, i) => (
          <line
            key={"h" + i}
            x1="600"
            y1={i *360}
            x2="1100"
            y2={i * 10}
            stroke={colors.semygjouneclàire}
            strokeWidth="0.7"
            opacity="0.9"
          />
        ))}
        {/* Diagonales */}
        {[...Array(9)].map((_, i) => (
          <line
          key={"h" + i}
          x1="600"
          y1={i *360}
          x2="1100"
          y2={i * 10}
            stroke={colors.semygprimary}
            strokeWidth="0.7"
            opacity="0.8"
          />
        ))}
      </AnimatedGrid>

      {/* Icônes flottantes */}
      {!reduced && (
        <>
          <IconWrapper
            style={{
              top: `${isMobile ? 60 : 120 + pos.y * 0.05}px`,
              left: `${isMobile ? 14 : 70 + pos.x * 0.07}px`,
              color: colors.semygprimar,
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <FaBuilding />
          </IconWrapper>

          <IconWrapper
            style={{
              top: `${isMobile ? 24 : 420 - pos.y * 0.07}px`,
              left: `${isMobile ? "calc(100% - 42px)" : 1000 - pos.x * 0.08}px`,
              color: colors.semygsecondar,
            }}
            animate={{ rotate: [0, 359] }}
            transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <FaChartLine />
          </IconWrapper>

          <IconWrapper
            style={{
              top: `${isMobile ? 320 : 660 - pos.y * 0.09}px`,
              left: `${isMobile ? 66 : 240 + pos.x * 0.09}px`,
              color: colors.semygprimary,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <FaShieldAlt />
          </IconWrapper>

          <IconWrapper
            style={{
              top: `${isMobile ? 360 : 120 + pos.y * 0.1}px`,
              left: `${isMobile ? "calc(100% - 60px)" : 940 - pos.x * 0.09}px`,
              color: colors.semygjouneclàire,
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <FaHandshake />
          </IconWrapper>
        </>
      )}

      
    </>
  );
}

/* =================== Composant principal amélioré =================== */
const IdeasToLife = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="expertise">
      {/* Animation intégrée */}
      <FondAnimerSemyg />

      <Container>
        <Title
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Expertise Immobilière Sur Mesure
        </Title>

        <Grid>
          {/* Carte 1 — Études & Montage */}
          <Card
            initial={reduced ? false : { opacity: 0, x: -30 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <IconBadge aria-hidden>
              <FaBullseye />
            </IconBadge>
            <CardTitle>Conseil & Stratégie</CardTitle>
            <CardText>
              <strong>Études de faisabilité</strong> approfondies, due diligence et structuration 
              juridique/financière pour <strong>sécuriser</strong> vos investissements et maximiser 
              leur potentiel.
            </CardText>
          </Card>

          {/* Carte 2 — Promotion & Asset Management */}
          <Card
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <IconBadge aria-hidden>
              <FaStar />
            </IconBadge>
            <CardTitle>Gestion & Valorisation</CardTitle>
            <CardText>
              <strong>Promotion immobilière</strong> clé en main et gestion d'actifs performante 
              pour optimiser la <strong>rentabilité</strong> de votre patrimoine sur le long terme.
            </CardText>
          </Card>

         
        </Grid>
      </Container>
    </Section>
  );
};

export default IdeasToLife;