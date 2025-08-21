// src/components/Sections/LesservicesSemyg.jsx
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  X,
  Info,
  MapPin,
  Building2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* =================== Animations =================== */
const shimmer = keyframes`
  0% { transform: translateX(-120%) }
  100% { transform: translateX(160%) }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

/* =================== Base layout (Palette Semyg verrouillée) =================== */
const Section = styled.section`
  --s-primary: ${colors.semygprimary};
  --s-secondary: ${colors.semygsecondar};
  --s-accent: ${colors.semygsecondary};
  --s-gold: ${colors.semygprimar};
  --s-soft: ${colors.semygjouneclàire};
  --s-black: ${colors.semygprimary || "#101418"};
  --s-white: ${colors.semygsecondar || "#ffffff"};
  --s-light: rgba(14, 45, 79, 0.04);

  position: relative;
 

  padding: clamp(3rem, 6vw, 6rem) 1rem clamp(5rem, 7vw, 6rem);
  overflow: hidden;
  isolation: isolate;

  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    inset: -42% -8% auto -8%;
    height: 52%;
    background: radial-gradient(
        640px 260px at 18% 28%,
        ${colors.semygprimar},
        transparent 65%
      ),
      radial-gradient(
        560px 240px at 88% 8%,
        ${colors.error},
        transparent 60%
      );
  }

  &::after {
    inset: auto -10% -30% -10%;
    height: 48%;
    background: radial-gradient(
        560px 220px at 12% 72%,
        ${colors.error},
        transparent 70%
      ),
      radial-gradient(
        520px 220px at 92% 82%,
        ${colors.error},
        transparent 70%
      );
  }

  @media (max-width: 900px) {
    padding: 3rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;

const Container = styled.div`
   margin: 0 auto;
  position: relative;
  z-index: 1; max-width: 1140px;
`;

/* =================== Header =================== */
const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  
  gap: 0.8rem 2rem;
  align-items: end;
  margin-bottom: 3rem;


  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    text-align: center;
  }
`;

const BigIndex = styled.div`
  font-size: clamp(3rem, 7vw, 5rem);
  line-height: 0.9;
  font-weight: 900;
  color: var(--s-gold);
  text-shadow: 0 8px 24px ${colors.semygprimar}40;
`;

const TitleWrap = styled.div`
  text-align: center;
  color: var(--s-secondary);
`;

const Overline = styled.p`
  margin: 0 0 0.5rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--s-secondary);
  font-weight: 900;
  font-size: 1.2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: var(--s-primary);
  line-height: 1.2;
`;

const Lead = styled.p`
  margin: 1rem auto 0;
  color: var(--s-black);
  opacity: 0.9;
  max-width: 900px;
  line-height: 1.8;
  font-size: clamp(1.1rem, 1.8vw, 1.2rem);
  font-weight: 400;
    @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
      margin: 1rem   ;

    text-align: center;
  }
`;

/* =================== Filters =================== */
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0 2.5rem;
  justify-content: center;
`;

const Chip = styled(motion.button)`
  border: 1px solid ${colors.semygprimary}15;
  background: ${({ $active }) =>
    $active ? `${colors.semygprimar}30` : `#fff`};
  color: var(--s-primary);
  padding: 0.7rem 1.2rem;
  border-radius:  9px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    background: ${colors.semygprimary}40;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

/* =================== Grid / Card =================== */
const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled(motion.button)`
  position: relative;
  display: block;
  border: none;
  padding: 0;
  border-radius:  0 36px 0 0;
  overflow: hidden;
  cursor: pointer;
  background: ${colors.semygjouneclàire}66;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  aspect-ratio: 4/3;
  transition: all 0.4s ease;

  &:focus-visible {
    outline: 3px solid var(--s-accent);
    outline-offset: 3px;
  }

  &:hover {
    box-shadow: 0 28px 50px rgba(0, 0, 0, 0.15);
    transform: translateY(-6px);
      border-radius: 36px  36px 36px 36px;

  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.25) 35%,
    rgba(0, 0, 0, 0.65) 100%
  );
`;

const Shine = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 25%,
    rgba(255, 255, 255, 0.25) 42%,
    transparent 60%
  );
  transform: translateX(-120%);
  animation: ${shimmer} 1.5s ease both;
  opacity: 0;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.2rem;
  z-index: 2;
  color: white;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  line-height: 1.3;
`;

const CardType = styled.span`
  font-size: 0.9rem;
  opacity: 0.95;
  margin-top: 0.4rem;
  display: block;
  font-weight: 500;
`;

const ActionButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.95);
  color: ${colors.semygprimar};
  padding: 0.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background:  ${colors.semygprimary};
    transform: scale(1.15);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

/* =================== Lightbox =================== */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: min(96vw, 1200px);
  height: min(80vh, 800px);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  background: #000;
  display: flex;
  flex-direction: column;
`;

const ModalControls = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  display: flex;
  gap: 0.8rem;
  z-index: 3;
`;

const ControlButton = styled.button`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  color: var(--s-primary);
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: var(--s-gold);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ModalImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImg = styled(motion.img)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  cursor: ${({ $zoom }) => ($zoom > 1 ? "grab" : "zoom-in")};
  transition: transform 0.3s ease;
`;

const ModalFooter = styled.div`
  background:  ${colors.semygprimary};
  padding: 1rem 1.5rem;
  color:  ${colors.semygprimar};
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ModalTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
`;

const ZoomHint = styled.div`
  color: var(--s-accent);
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
`;

const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 2;
  transform: translateY(-50%);
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: all 0.3s ease;

  &:hover {
    background: var(--s-gold);
    transform: scale(1.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* =================== Info Panel =================== */
const InfoPanel = styled(motion.div)`
  position: fixed;
  right: 24px;
  bottom: 1px;
  z-index: 2010;
  width: min(92vw, 450px);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.22);
  border: 1px solid ${colors.semygprimary}15;
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 480px) {
    right: 16px;
    bottom: 16px;
    border-radius: 14px;
    width: calc(100vw - 32px);
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;
  background: ${colors.semygprimar}20;
  font-weight: 900;
  color: var(--s-primary);
  font-size: 1.1rem;
`;

const InfoBody = styled.div`
  padding: 1.2rem 1.2rem 1.4rem;
  color: var(--s-black);
  line-height: 1.7;
  font-size: 1.05rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 1rem 1rem 1.2rem;
  }
`;

const InfoFooter = styled.div`
  padding: 0 1.2rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 0 1rem 1rem;
    gap: 0.8rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--s-gold) 55%,
    var(--s-secondary) 100%
  );
  box-shadow: 0 15px 35px ${colors.semygprimar}55;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px ${colors.semygprimar}77;
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  margin-left: auto;
  font-weight: 800;
  background: transparent;
  border: none;
  color: var(--s-primary);
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--s-light);
  }
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 0.8rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:first-child {
    background: var(--s-primary);
    color: white;
  }

  &:last-child {
    background: #25d366;
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

/* =================== Floating Decorations =================== */
const FloatingDecoration = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${colors.semygprimar}12 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: -1;
  animation: ${floatAnimation} 12s ease-in-out infinite;

  &:nth-child(1) {
    top: 15%;
    left: 8%;
    width: 200px;
    height: 200px;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    bottom: 20%;
    right: 10%;
    width: 220px;
    height: 220px;
    animation-delay: 2s;
    background: radial-gradient(
      circle,
      ${colors.semygsecondar}10 0%,
      transparent 70%
    );
  }

  &:nth-child(3) {
    top: 30%;
    right: 20%;
    width: 150px;
    height: 150px;
    animation-delay: 4s;
    background: radial-gradient(
      circle,
      ${colors.semygjouneclàire}08 0%,
      transparent 70%
    );
  }
`;

/* =================== Data (Images Semyg) =================== */
const fallback =
  (imagess && (imagess.semygCover || imagess.amenagement_exterieux0)) ||
  "/placeholder.jpg";

  const VENUES = [
    // CHANTIERS
    {
      label: "Chantier — Suivi des travaux 01",
      img: imagess?.chàntier || fallback,
      type: "Chantier",
      description:
        "Suivi rigoureux des travaux avec une organisation professionnelle et sécurisée sur site.",
    },
    {
      label: "Chantier — Suivi des travaux 02",
      img: imagess?.chàntier2 || fallback,
      type: "Chantier",
      description:
        "Encadrement des équipes et respect des normes pour garantir la qualité des constructions.",
    },
    {
      label: "Chantier — Suivi des travaux 03",
      img: imagess?.chàntier3 || fallback,
      type: "Chantier",
      description:
        "Maîtrise des délais et gestion efficace pour assurer l’avancement des projets immobiliers.",
    },
    {
      label: "Chantier — Travaux en cours",
      img: imagess?.chàntier4 || fallback,
      type: "Chantier",
      description:
        "Étapes de construction suivies avec rigueur, garantissant durabilité et solidité.",
    },
    {
      label: "Chantier — Vue générale",
      img: imagess?.chàntier5 || fallback,
      type: "Chantier",
      description:
        "Vue d’ensemble d’un chantier Semyg, symbole d’intégrité et de confiance.",
    },
    {
      label: "Chantier — Équipes au travail",
      img: imagess?.chàntier6 || fallback,
      type: "Chantier",
      description:
        "Mobilisation des équipes pour construire des projets solides et responsables.",
    },
    {
      label: "Chantier — Étapes d’avancement",
      img: imagess?.chàntier7 || fallback,
      type: "Chantier",
      description:
        "Contrôle qualité permanent à chaque étape du chantier pour assurer des finitions parfaites.",
    },
    {
      label: "Chantier — Infrastructure",
      img: imagess?.chàntier8 || fallback,
      type: "Chantier",
      description:
        "Mise en place des infrastructures de base, respectant sécurité et normes internationales.",
    },
    {
      label: "Chantier — Gros œuvre",
      img: imagess?.chàntier9 || fallback,
      type: "Chantier",
      description:
        "Construction du gros œuvre garantissant la stabilité et la solidité des bâtiments.",
    },
    {
      label: "Chantier — Suivi technique",
      img: imagess?.chàntier10 || fallback,
      type: "Chantier",
      description:
        "Supervision technique par Semyg pour garantir la conformité des ouvrages.",
    },
    {
      label: "Chantier — Coordination",
      img: imagess?.chàntier13 || fallback,
      type: "Chantier",
      description:
        "Coordination des équipes et contrôle des délais pour un avancement maîtrisé.",
    },
  
    // BÂTIMENTS
    {
      label: "Bâtiment — Mosquée terminée",
      img: imagess?.bàtimentmosk || fallback,
      type: "Bâtiment",
      description:
        "Construction d’édifices religieux durables et harmonieux pour la communauté.",
    },
    {
      label: "Bâtiment — Mosquée en finition",
      img: imagess?.bàtimentmosk2 || fallback,
      type: "Bâtiment",
      description:
        "Travaux de finition alliant qualité des matériaux et respect de l’architecture locale.",
    },
    {
      label: "Bâtiment — École en construction",
      img: imagess?.bàtimentecole3 || fallback,
      type: "Bâtiment",
      description:
        "Édification d’espaces éducatifs modernes et accessibles pour les générations futures.",
    },
    {
      label: "Bâtiment — Villas en cours",
      img: imagess?.bàtimentvillà || fallback,
      type: "Bâtiment",
      description:
        "Conception et suivi de villas modernes, alliant confort et durabilité.",
    },
    {
      label: "Bâtiment — École achevée",
      img: imagess?.bàtimentecole4 || fallback,
      type: "Bâtiment",
      description:
        "Structures éducatives construites avec soin et pensées pour la longévité.",
    },
    {
      label: "Bâtiment — Étages en construction",
      img: imagess?.bàtimentetàge2 || fallback,
      type: "Bâtiment",
      description:
        "Suivi des travaux d’élévation, avec une maîtrise technique et architecturale.",
    },
    {
      label: "Bâtiment — Gros œuvre étage",
      img: imagess?.bàtimentetàge3nonfini || fallback,
      type: "Bâtiment",
      description:
        "Construction des étages supérieurs avec des normes de sécurité optimales.",
    },
    {
      label: "Bâtiment — Villa au bord du fleuve",
      img: imagess?.bàtimentvillà1fleuve || fallback,
      type: "Bâtiment",
      description:
        "Projet résidentiel unique intégrant environnement naturel et architecture moderne.",
    },
    {
      label: "Bâtiment — Villas en lotissement",
      img: imagess?.bàtimentvillàg2 || fallback,
      type: "Bâtiment",
      description:
        "Développement de quartiers résidentiels avec une vision durable et harmonieuse.",
    },
  
    // VILLAGES EN CONSTRUCTION (vues aériennes)
    {
      label: "Village — Vue aérienne 01",
      img: imagess?.vueàerien || fallback,
      type: "Village en construction",
      description:
        "Vue d’ensemble des sites en construction, symbole de l’engagement Semyg.",
    },
    {
      label: "Village — Vue aérienne 02",
      img: imagess?.vueàerien1 || fallback,
      type: "Village en construction",
      description:
        "Aménagement global du site et suivi de l’avancement à grande échelle.",
    },
    {
      label: "Village — Vue aérienne 03",
      img: imagess?.vueàerien2 || fallback,
      type: "Village en construction",
      description:
        "Suivi du développement de nouveaux espaces résidentiels et communautaires.",
    },
    {
      label: "Village — Vue aérienne 04",
      img: imagess?.vueàerienvide2 || fallback,
      type: "Village en construction",
      description:
        "Contrôle de l’urbanisation progressive et de l’intégration dans l’environnement.",
    },
    {
      label: "Village — Vue aérienne 05",
      img: imagess?.vueàerienvide3 || fallback,
      type: "Village en construction",
      description:
        "Travaux supervisés avec rigueur pour garantir durabilité et modernité.",
    },
    {
      label: "Village — Vue aérienne 06",
      img: imagess?.vueàerienvide || fallback,
      type: "Village en construction",
      description:
        "Vision globale des projets Semyg intégrant infrastructures et habitations.",
    },
  
    // ÉCHANGES AVEC LES VILLAGEOIS
    {
      label: "Échanges avec les villageois 01",
      img: imagess?.echàngevillàge || fallback,
      type: "Échanges",
      description:
        "Dialogue permanent avec les habitants pour intégrer leurs besoins aux projets.",
    },
    {
      label: "Échanges avec les villageois 02",
      img: imagess?.echàngevillàge2 || fallback,
      type: "Échanges",
      description:
        "Rencontres sur le terrain afin d’assurer la transparence et la confiance.",
    },
    {
      label: "Échanges avec les villageois 03",
      img: imagess?.echàngevillàge3 || fallback,
      type: "Échanges",
      description:
        "Collaboration active avec les communautés locales pour un développement inclusif.",
    },
  ];
  

const FILTERS = [
  "Tous",
  "Chantier",
  "Bâtiment",
  "Village en construction",
  "Échanges",
];

/* =================== Component =================== */
const LesservicesSemyg = () => {
  const [filter, setFilter] = useState("Tous");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [infoIdx, setInfoIdx] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const whatsappNumber = "+224624292931";
  const imageRef = useRef(null);

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setInfoIdx(null);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const data = useMemo(
    () =>
      filter === "Tous" ? VENUES : VENUES.filter((v) => v.type === filter),
    [filter]
  );

  const openModal = (index) => {
    setCurrent(index);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setOpen(true);
  };

  const navigateImage = (direction) => {
    setCurrent((prev) => {
      if (direction === "prev") return prev === 0 ? data.length - 1 : prev - 1;
      return prev === data.length - 1 ? 0 : prev + 1;
    });
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleZoom = useCallback(() => {
    setZoom((z) => (z === 1 ? 2 : 1));
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleDrag = (event, info) => {
    if (zoom > 1) {
      setPosition({
        x: position.x + info.delta.x,
        y: position.y + info.delta.y,
      });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`, "_blank");
  };

  return (
    <Section>
      <FloatingDecoration />
      <FloatingDecoration />
      <FloatingDecoration />

      <Container>
        {/* Header */}
        <Header
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <BigIndex>SGI</BigIndex>
          <TitleWrap>
            <Overline>sélection Semyg</Overline>
            <Title>Les services & références en images</Title>
            <Lead>
              <strong>
                Avec Semyg, bâtir sur des fondations solides, c’est investir
                dans des terrains sécurisés et des constructions durables,
                guidées par l’intégrité et la confiance, pour garantir la valeur
                d’aujourd’hui et de demain.
              </strong>
            </Lead>
            <Filters>
              {FILTERS.map((f) => (
                <Chip
                  key={f}
                  $active={filter === f}
                  onClick={() => setFilter(f)}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  {f}
                </Chip>
              ))}
            </Filters>
          </TitleWrap>
        </Header>

        {/* Grid */}
        <Grid>
          {data.map((v, i) => (
            <Card
              key={`${v.label}-${i}`}
              onClick={() => openModal(i)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Voir ${v.label} en grand`}
              onContextMenu={(e) => {
                e.preventDefault();
                setInfoIdx(i);
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <ImageContainer>
                <Img
                  src={v.img}
                  alt={v.label}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                  decoding="async"
                />
                <Shade />
                <Shine />
              </ImageContainer>
              <CardContent>
                <CardTitle>
                  <Building2 size={18} />
                  {v.label}
                </CardTitle>
                <CardType>{v.type}</CardType>
              </CardContent>
              <ActionButton aria-label="Voir en détail">
                <ZoomIn size={20} />
              </ActionButton>
            </Card>
          ))}
        </Grid>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(false);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
          >
            <Modal
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <ModalControls>
                <ControlButton
                  onClick={toggleZoom}
                  aria-label={zoom === 1 ? "Zoomer" : "Dézoomer"}
                >
                  {zoom === 1 ? (
                    <Maximize2 size={22} />
                  ) : (
                    <Minimize2 size={22} />
                  )}
                </ControlButton>
                <ControlButton
                  onClick={() => {
                    setOpen(false);
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                  aria-label="Fermer"
                >
                  <X size={22} />
                </ControlButton>
              </ModalControls>

              <NavigationButtons>
                <NavButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={28} />
                </NavButton>
                <NavButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  aria-label="Image suivante"
                >
                  <ChevronRight size={28} />
                </NavButton>
              </NavigationButtons>

              <ModalImageContainer>
                <ModalImg
                  key={current}
                  src={data[current].img}
                  alt={data[current].label}
                  animate={{ scale: zoom, x: position.x, y: position.y }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  onDoubleClick={toggleZoom}
                  drag={zoom > 1}
                  dragConstraints={{
                    left: -400,
                    right: 400,
                    top: -400,
                    bottom: 400,
                  }}
                  onDrag={handleDrag}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                  $zoom={zoom}
                  ref={imageRef}
                />
              </ModalImageContainer>

              <ModalFooter>
                <ModalTitle>
                  <MapPin size={18} />
                  {data[current].label}
                </ModalTitle>
                <ZoomHint>
                  {zoom === 1 ? (
                    <>
                      <Maximize2 size={16} /> Double-clic pour zoomer
                    </>
                  ) : (
                    <>
                      <Minimize2 size={16} /> Double-clic pour dézoomer
                    </>
                  )}
                </ZoomHint>
              </ModalFooter>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>

      {/* Info Panel */}
      <AnimatePresence>
        {infoIdx !== null && (
          <InfoPanel
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <InfoHeader>
              <Info size={20} />
              Détails — {data[infoIdx].label}
            </InfoHeader>
            <InfoBody>
              <p>{data[infoIdx].description}</p>
              <p>
                Idéal pour : inaugurations, team building, showrooms, soirées
                VIP.
              </p>
              <p>
                Gestion technique complète (sécurité, logistique,
                autorisations).
              </p>
              <p>
                Options durables (réemploi, éclairage LED, tri à la source).
              </p>
              <ContactButtons>
                <ContactButton href={`tel:${whatsappNumber}`}>
                  Appeler
                </ContactButton>
                <ContactButton
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                >
                  WhatsApp
                </ContactButton>
              </ContactButtons>
            </InfoBody>
            <InfoFooter>
              <CTAButton
                href="/contact"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Demander un devis
              </CTAButton>
              <SecondaryButton onClick={() => setInfoIdx(null)}>
                Fermer
              </SecondaryButton>
            </InfoFooter>
          </InfoPanel>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default LesservicesSemyg;
