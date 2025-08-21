// src/components/Sections/CreationSection.jsx
import React, { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMagic,
  FaSeedling,
  FaUsers,
  FaLightbulb,
  FaChevronRight,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ===================== Animations ===================== */
const gradientFlow = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;
const floatSoft = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0px) }
`;

/* ===================== Layout ===================== */
const Container = styled.section`
  background: linear-gradient(
    135deg,
    ${colors.white} 0%,
    ${colors.lightGrey} 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 70% 30%,
      ${colors.accentGold}22 0%,
      transparent 30%
    );
    z-index: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  width: 100%;
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;

  @media (max-width: 900px) {
    padding: 0 1rem 2rem 1rem;
    text-align: center;
    align-items: center;
  }
`;

const Overline = styled(motion.span)`
  font-size: 0.97rem;
  letter-spacing: 0.16em;
  color: ${colors.accentTurquoise};
  font-weight: 800;
  margin-bottom: 1rem;
  text-transform: uppercase;
  display: inline-block;
  background: rgba(26, 127, 138, 0.06);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
`;

const MainTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
  color: ${colors.primary};
  margin: 0 0 1.4rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.8rem;
    left: 0;
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      ${colors.primary},
      ${colors.accentTurquoise}
    );
    @media (max-width: 900px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const HighlightText = styled.span`
  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientFlow} 8s ease infinite;
`;

const SubText = styled(motion.p)`
  font-size: 1.12rem;
  line-height: 1.75;
  color: ${colors.black};
  opacity: 0.92;
  max-width: 560px;
  margin: 0.35rem 0 0.2rem;

  @media (max-width: 900px) {
    max-width: 100%;
  }
  @media (max-width: 480px) {
    text-align: left;
  }
`;

const FeaturesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.05rem;
  margin: 2.2rem 0 0;
  padding: 0;
  list-style: none;
  @media (max-width: 900px) {
    align-items: center;
    max-width: 560px;
  }
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 0.95rem;
  color: ${colors.primary};
  font-size: 1.05rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.86);
  padding: 0.86rem 1.15rem;
  border-radius: 12px;
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06), 4px 0 0 -2px ${colors.primary}22;

  svg {
    color: ${colors.accentGold};
    font-size: 1.22rem;
    min-width: 24px;
  }
`;

const RightCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 3rem;
  @media (max-width: 900px) {
    padding: 2rem 1rem;
    width: 100%;
  }
`;

const ImageContainer = styled(motion.button)`
  position: relative;
  width: 100%;
  max-width: 620px;
  height: 480px;
  border-radius: 22px;
  overflow: hidden;
  border: none;
  padding: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  cursor: zoom-in;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(26, 127, 138, 0.18) 0%,
      rgba(242, 201, 76, 0.12) 100%
    );
    z-index: 1;
  }

  @media (max-width: 900px) {
    height: 360px;
    max-width: 100%;
  }
`;

const ZoomBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  font-size: 0.94rem;
  color: ${colors.primary};
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
`;

const EcoBadge = styled(motion.div)`
  position: absolute;
  bottom: 1.6rem;
  left: 1.6rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  font-size: 0.97rem;
  color: ${colors.accentTurquoise};
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
  animation: ${floatSoft} 6s ease-in-out infinite;
`;

/* ===================== Lightbox plein écran ===================== */
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: ${colors.darkOverlay};
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxInner = styled(motion.div)`
  position: relative;
  width: min(92vw, 1200px);
  height: min(84vh, 820px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
  background: ${colors.black};
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.92);
  color: ${colors.primary};
  display: grid;
  place-items: center;
  font-size: 1rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  &:hover {
    background: ${colors.accentGold};
    color: ${colors.primary};
  }
`;

const ZoomHelp = styled.div`
  position: absolute;
  left: 16px;
  bottom: 12px;
  z-index: 2;
  color: #fff;
  opacity: 0.85;
  font-size: 0.92rem;
  font-weight: 600;
`;

const LightboxImg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: grab;
`;

/* ===================== Component ===================== */
const CreationSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // Fermer avec ECHAP
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setLightboxOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoom((z) => (z === 1 ? 1.6 : 1));
    if (zoom !== 1) setPos({ x: 0, y: 0 });
  }, [zoom]);

  return (
    <>
      <Container>
        <ContentWrapper>
          <LeftCol>
            <Overline
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
            ></Overline>

            <MainTitle>
              <HighlightText>Innovation et </HighlightText> création
              {/*             <HighlightText>création</HighlightText> au service de vos publics
               */}{" "}
            </MainTitle>

            <SubText
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              MK Global Services conçoit des expériences marquantes A l'aide des
              solutions <b>sur‑mesure</b>, durables et sécurisées, pilotées par
              une équipe pluridisciplinaire.
            </SubText>

            <FeaturesList>
              {[
                {
                  icon: <FaMagic />,
                  text: "Conception 3D & design sur‑mesure",
                },
                {
                  icon: <FaSeedling />,
                  text: "Solutions écoresponsables (PEFC, peintures sans COV)",
                },
                {
                  icon: <FaUsers />,
                  text: "Équipe pluridisciplinaire & logistique intégrée",
                },
                {
                  icon: <FaLightbulb />,
                  text: "Idées uniques adaptées à votre public",
                },
              ].map((feature, i) => (
                <FeatureItem
                  key={i}
                  onHoverStart={() => setHoveredFeature(i)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                  animate={{
                    scale: hoveredFeature === i ? 1.03 : 1,
                    boxShadow:
                      hoveredFeature === i
                        ? "0 16px 36px rgba(0,0,0,0.08), 4px 0 0 -2px rgba(0,45,82,0.26)"
                        : "0 8px 26px rgba(0,0,0,0.06), 4px 0 0 -2px rgba(0,45,82,0.13)",
                  }}
                >
                  {feature.icon}
                  {feature.text}
                  <FaChevronRight
                    style={{
                      marginLeft: "auto",
                      opacity: hoveredFeature === i ? 1 : 0,
                      transition: "opacity .25s ease",
                      color: colors.accentTurquoise,
                    }}
                  />
                </FeatureItem>
              ))}
            </FeaturesList>
          </LeftCol>

          <RightCol>
            <ImageContainer
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightboxOpen(true)}
              aria-label="Afficher l’image en plein écran"
            >
              <img
                src={imagess.oloni6}
                alt="Projet MKGS"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <ZoomBadge
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <FaPlusCircle /> Voir
              </ZoomBadge>

              <EcoBadge
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.45 }}
              >
                <FaSeedling /> Concept durable
              </EcoBadge>
            </ImageContainer>
          </RightCol>
        </ContentWrapper>
      </Container>

      {/* ===================== Lightbox ===================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <LightboxInner
              initial={{ scale: 0.96, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 18, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseBtn
                onClick={() => setLightboxOpen(false)}
                aria-label="Fermer l’aperçu"
              >
                <FaTimes />
              </CloseBtn>

              <ZoomHelp>Double‑cliquez pour zoomer / dézoomer</ZoomHelp>

              <LightboxImg
                src={imagess.oloni6}
                alt="Aperçu plein écran"
                style={{ cursor: dragging ? "grabbing" : "grab" }}
                animate={{ scale: zoom }}
                onDoubleClick={toggleZoom}
                drag={zoom > 1}
                dragConstraints={{
                  left: -200,
                  right: 200,
                  top: -200,
                  bottom: 200,
                }}
                onDragStart={() => setDragging(true)}
                onDragEnd={(_, info) => {
                  setDragging(false);
                  setPos({ x: pos.x + info.delta.x, y: pos.y + info.delta.y });
                }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              />
            </LightboxInner>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreationSection;
