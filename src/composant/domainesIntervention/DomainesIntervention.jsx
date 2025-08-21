// src/components/Sections/DomainesExpertiseGrid.jsx
import React, { useState, memo, useCallback, useMemo, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import {
  FaTools,
  FaBuilding,
  FaShieldAlt,
  FaInfoCircle,
  FaTimes,
  FaChevronRight,
  FaArrowRight,
  FaChrome
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { useIntersectionObserver } from "./useIntersectionObserver";
import PremiumServices from "./Domàine2";
import SEO from "../../SEO";
import Navbard from "../Acueil/Barnav2";

/* ================= Helpers SEO ================= */
const getBaseUrl = () => {
  const env = import.meta?.env?.VITE_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://www.semyggroupimmobilier.com";
};
const toAbsolute = (src) => {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  const base = getBaseUrl();
  return `${base}${src.startsWith("/") ? "" : "/"}${src}`;
};

/* ================= Animations Premium ================= */
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulseBorder = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(180, 150, 100, 0.7); }
  70% { box-shadow: 0 0 0 12px rgba(180, 150, 100, 0); }
  100% { box-shadow: 0 0 0 0 rgba(180, 150, 100, 0); }
`;

const slideUpFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ================= Styles Premium ================= */
const Section = styled.section`
  margin-top: 4.1em;
  --card-aspect-ratio: 1/1.2;
  --card-radius: 20px;
  --transition-duration: 0.5s;
  --easing: cubic-bezier(0.23, 1, 0.32, 1);

  position: relative;
  background: linear-gradient(
    135deg,
    ${colors.semygsecondar} 100%,
    ${colors.semygsecondary} 50%,
    ${colors.semygsecondar} 100%
  );
  padding: clamp(3rem, 6vw, 6rem) 1rem;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
      z-index: -1;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 4rem;
  text-align: center;
  will-change: transform, opacity;
`;

const Title = styled(motion.h2).attrs({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1, ease: "easeOut" },
})`
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, ${colors.semygjouneclàire} 50%, ${colors.semygprimar} 50%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  padding-bottom: 1rem;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 6px;
    background: linear-gradient(90deg, ${colors.semygprimar} 50%, ${colors.semygsecondary} 50%);
    border-radius: 2px;
  }
`;

const Lead = styled(motion.p).attrs({
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1, ease: "easeOut", delay: 0.2 },
})`
  margin: 1.5rem auto 0;
  color: ${colors.semygjouneclàire};
  opacity: 0.95;
  max-width: 800px;
  line-height: 1.8;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 400;

   @media (max-width: 480px) {
   
   text-align : left;
  }

`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const Card = styled(motion.div).attrs(({ $reduceMotion }) => ({
  whileHover: $reduceMotion ? {} : { y: -12, rotate: 0 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
}))`
  position: relative;
  border: none;
  padding: 0;
  border-radius: var(--card-radius);
  overflow: hidden;
  cursor: pointer;
  background: ${colors.semygjouneclàire};
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  aspect-ratio: var(--card-aspect-ratio);
  will-change: transform;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    box-shadow: 
      0 35px 60px rgba(0, 0, 0, 0.15),
      0 10px 25px rgba(0, 0, 0, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  }

  &:focus-visible {
    outline: 3px solid ${colors.semygsecondar};
    outline-offset: 3px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--card-radius);
    background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
    background-size: 200% 200%;
    animation: ${shimmerAnimation} 3s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 3;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardImage = styled(motion.div).attrs({
  initial: { scale: 1 },
  whileHover: { scale: 1.08 },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
})`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.$image});
  background-size: cover;
  background-position: center;
  filter: saturate(1.1) contrast(1.05);
  position: relative;
  transition: filter 0.5s ease;

  ${Card}:hover & {
    filter: saturate(1.2) contrast(1.1);
  }
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.02) 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
  transition: opacity 0.5s ease;

  ${Card}:hover & {
    opacity: 0.7;
  }
`;

const Tag = styled(motion.div).attrs({
  initial: { opacity: 1, y: 0, x: 0 },
  animate: { opacity: 1, y: 0, x: 0 },
  whileHover: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeOut" }
})`
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1.4rem;
  border-radius: 12px;
  background: linear-gradient(135deg, ${colors.semygprimar} 50%, ${colors.semygsecondar} 50%);
  color: ${colors.semygjouneclàire};
  font-weight: 700;
  font-size: clamp(0.9rem, 1.6vw, 1.05rem);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  svg {
    color: ${colors.semygprimary};
    font-size: 1.1em;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const Overlay = styled(motion.div).attrs({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
})`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  gap: 1.2rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    ${colors.semygprimary}EA 100%
  );
  z-index: 1;

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 1rem;
  }
`;

const OverlayTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${colors.semygjouneclàire};
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 800;
  line-height: 1.3;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

const Bullets = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
`;

const Bullet = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${colors.semygjouneclàire};
  font-weight: 500;
  font-size: clamp(0.95rem, 1.7vw, 1.05rem);
  line-height: 1.5;
  opacity: 0.95;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  .dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${colors.semygjouneclàire};
    color: ${colors.semygsecondar};
    flex-shrink: 0;
    transition: all 0.3s var(--easing);
    cursor: help;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

    &:hover {
      transform: scale(1.1);
      background: ${colors.semygprimar};
      color: ${colors.semygprimary};
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      animation: ${pulseBorder} 1.5s infinite;
    }
  }

  .tip {
    position: absolute;
    left: 35px;
    bottom: 120%;
    white-space: nowrap;
    background: ${colors.semygjouneclàire};
    color: ${colors.semygprimary};
    border-radius: 10px;
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transform-origin: bottom left;
    pointer-events: none;
    z-index: 10;
    font-weight: 600;
    border: 1px solid ${colors.semygsecondary}30;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`;

const CTAButton = styled(motion.button).attrs({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
})`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, ${colors.semygprimar} 0%, ${colors.semygsecondar} 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(180, 150, 100, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(180, 150, 100, 0.4);
    gap: 0.8rem;
  }
`;

const LightboxOverlay = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
})`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2rem);
`;

const Lightbox = styled(motion.div).attrs({
  initial: { scale: 0.95, y: 30, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.95, y: 30, opacity: 0 },
  transition: { type: "spring", stiffness: 340, damping: 30 },
})`
  position: relative;
  width: min(94vw, 1500px);
  max-height: 90vh;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
  background: ${colors.semygprimary};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: ${colors.semygjouneclàire};
  color: ${colors.semygprimary};
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: ${colors.semygprimar};
    color: ${colors.semygprimary};
    transform: rotate(90deg) scale(1.08);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${colors.semygjouneclàire};
    outline-offset: 2px;
  }
`;

const FullImg = styled(motion.img).attrs({
  initial: { scale: 1.05 },
  animate: { scale: 1 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
})`
  width: 100%;
  height: min(80vh, 900px);
  object-fit: cover;
  object-position: center;
`;

const LightboxContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.9) 100%);
  color: white;
  z-index: 2;
`;

const LightboxTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const LightboxDescription = styled.p`
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 800px;
`;

const FloatingDecoration = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, ${colors.semygprimar}20 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
  animation: ${floatAnimation} 10s ease-in-out infinite;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
    width: 180px;
    height: 180px;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    bottom: 15%;
    right: 8%;
    width: 200px;
    height: 200px;
    animation-delay: 1.5s;
    background: radial-gradient(circle, ${colors.semygsecondar}20 0%, transparent 70%);
  }
  &:nth-child(3) {
    top: 25%;
    right: 15%;
    width: 120px;
    height: 120px;
    animation-delay: 2.5s;
    background: radial-gradient(circle, ${colors.semygjouneclàire}15 0%, transparent 70%);
  }
`;

/* ================= Données (textes Semyg + images Semyg) ================= */
const fallback =
  imagess?.vueàerien || "/placeholder.jpg";

const ITEMS = [
  {
    key: "promotion",
    title: "Promotion & développement",
    icon: <FaTools />,
    cover: imagess?.businesskey3 || imagess?.vueAerienne1 || fallback,
    overlayTitle: "Études, montage & pilotage d'opérations",
    bullets: [
      "Faisabilité & due diligence complètes",
      "Montage juridique, technique & financier",
      "Urbanisme, autorisations & permis",
      "Pilotage chantier : coûts, délais, qualité",
    ],
    description: "Notre expertise en promotion immobilière couvre l'ensemble du processus de développement, de l'identification des opportunités à la livraison des projets clés en main. Nous garantissons une gestion optimale des coûts, des délais et de la qualité."
  },
  {
    key: "conformite",
    title: "Conformité, titres & HSE",
    icon: <FaShieldAlt />,
    cover: imagess?.businesskey || imagess?.echange1 || fallback,
    overlayTitle: "Sécurisation juridique & maîtrise des risques",
    bullets: [
      "Sécurisation foncière : titres & contrats",
      "Conformité réglementaire & assurances",
      "Normes HSE & sécurité chantier",
      "Gouvernance & audits réguliers",
    ],
    description: "Nous assurons la conformité réglementaire de tous vos projets immobiliers, avec une attention particulière aux aspects juridiques, techniques et environnementaux. Notre approche proactive minimise les risques et maximise la valeur de vos investissements."
  },
  {
    key: "gestion",
    title: "Gestion locative",
    icon: <FaBuilding />,
    cover: imagess?.vueàerienvide3 || imagess?.village1 || fallback,
    overlayTitle: "Exploitation performante des actifs",
    bullets: [
      "Baux, encaissements & relation locataires",
      "Maintenance, conciergerie & services",
      "Optimisation loyers & réduction vacance",
      "Reporting de performance & valorisation",
    ],
    description: "Notre service de gestion locative maximise la rentabilité de votre patrimoine immobilier grâce à une approche proactive de la relation locative, une maintenance préventive et une optimisation continue des performances."
  },
];

/* ================= Composant ================= */
const DomainesExpertiseGrid = memo(function DomainesExpertiseGrid() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hoverIndex, setHoverIndex] = useState({ card: -1, bullet: -1 });
  const prefersReducedMotion = useReducedMotion();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const navigate = useNavigate(); // Hook pour la navigation

  const openLightbox = useCallback((i) => {
    setCurrent(i);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const handleHover = useCallback((cardIdx, bulletIdx = -1) => {
    setHoverIndex({ card: cardIdx, bullet: bulletIdx });
  }, []);

  // Fonction pour naviguer vers la page des projets
  const navigateToProjects = useCallback(() => {
    navigate("/projets"); // Assurez-vous que cette route correspond à votre configuration
  }, [navigate]);

  const memoizedItems = useMemo(() => ITEMS, []);

  /* ===== SEO props ===== */
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/domaines`;
  const ogImage = toAbsolute(memoizedItems[0]?.cover);

  // Fermer la lightbox avec la touche Échap en s
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeLightbox]);

  return (
    <>
      <SEO
        title="Domaines d'expertise — Semyg Groupe Immobilier"
        description="Promotion & développement, gestion locative, conformité & HSE, infrastructures & co-développement : découvrez les domaines d'expertise de Semyg Groupe Immobilier."
        image={ogImage}
        url={pageUrl}
        keywords={[
          "Semyg Groupe Immobilier",
          "promotion immobilière",
          "gestion locative",
          "asset management",
          "infrastructures",
          "HSE",
          "immobilier",
        ]}
      >
        <link rel="canonical" href={pageUrl} />
      </SEO>

      <div>
        <Navbard />
      </div>

      <Section ref={sectionRef}>
        <FloatingDecoration />
        <FloatingDecoration />
        <FloatingDecoration />

        <Container>
          <Header>
            <Title animate={isInView ? { y: 0, opacity: 1 } : {}}>
              Domaines d'expertise
            </Title>
            <Lead animate={isInView ? { y: 0, opacity: 1 } : {}}>
              Semyg Groupe Immobilier accompagne vos opérations de bout en bout :
              faisabilité, montage, développement, gestion locative, conformité & HSE.
              Découvrez notre savoir-faire en survolant les cartes ci-dessous.
            </Lead>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <CTAButton onClick={navigateToProjects}>
                Réalisations <FaArrowRight />
              </CTAButton>
            </motion.div>
          </Header>

          <Grid>
            {memoizedItems.map((item, i) => (
              <Card
                key={item.key}
                $reduceMotion={prefersReducedMotion}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleHover(-1)}
                onClick={() => openLightbox(i)}
                aria-label={`Voir ${item.title}`}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                initial={{ y: 40, opacity: 0, rotate: -1 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <CardImage $image={item.cover} />
                <Dim />

                <Tag>
                  {item.icon}
                  {item.title}
                </Tag>

                <AnimatePresence>
                  {hoverIndex.card === i && (
                    <Overlay>
                      <OverlayTitle>{item.overlayTitle}</OverlayTitle>
                      <Bullets>
                        {item.bullets.map((b, bi) => (
                          <Bullet key={bi}>
                            <div
                              className="dot"
                              onMouseEnter={() => handleHover(i, bi)}
                              onMouseLeave={() => handleHover(i, -1)}
                              aria-label={`Info: ${b}`}
                              title={b}
                            >
                              <FaInfoCircle size={12} />
                            </div>
                            {b}
                            <AnimatePresence>
                              {hoverIndex.bullet === bi && (
                                <motion.span
                                  className="tip"
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {b}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Bullet>
                        ))}
                      </Bullets>
                    </Overlay>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </Grid>
        </Container>

        <AnimatePresence>
          {open && (
            <LightboxOverlay onClick={closeLightbox}>
              <Lightbox
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="lightbox-title"
              >
                <CloseButton
                  onClick={closeLightbox}
                  aria-label="Fermer la lightbox"
                >
                  <FaTimes />
                </CloseButton>

                <FullImg
                  src={memoizedItems[current].cover}
                  alt={memoizedItems[current].title}
                  loading="eager"
                  decoding="async"
                />
                
                <LightboxContent>
                  <LightboxTitle id="lightbox-title">
                    {memoizedItems[current].title}
                  </LightboxTitle>
                  <LightboxDescription>
                    {memoizedItems[current].description}
                  </LightboxDescription>
                  <CTAButton>
                      <FaChrome size={14} />
                  </CTAButton>
                </LightboxContent>
              </Lightbox>
            </LightboxOverlay>
          )}
        </AnimatePresence>

     
      </Section> 
      <div>
        <PremiumServices />
      </div>
    </>
  );
});

export default DomainesExpertiseGrid;