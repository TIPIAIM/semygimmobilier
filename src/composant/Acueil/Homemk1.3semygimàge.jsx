// src/components/Sections/Semygimàge.jsx
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, MapPin, Home, Building, Trees, Warehouse, Anchor, Users } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* =============== Layout & Styles Premium =============== */
const Section = styled.section`
  position: relative;
  background: ${colors.semygjouneclàire};
  padding: clamp(2rem, 4vw, 4rem) 1rem;
  overflow: hidden;
  
  /* Effet de texture subtile */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(0,0,0,0.03) 0%, transparent 20%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem 2rem;
  align-items: end;
  margin-bottom: clamp(1.5rem, 3vw, 3rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

const BigIndex = styled.div`
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 0.85;
  font-weight: 900;
  color: ${colors.accentGold};
  opacity: 0.9;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) { 
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const TitleBlock = styled.div``;

/* Titre premium avec effet métallique */
const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  background: linear-gradient(90deg, ${colors.semygprimar}, ${colors.semygsecondar} 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, ${colors.semygprimar}, ${colors.semygsecondar});
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    text-align: center;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    }
  }
`;

const Lead = styled(motion.p)`
  color: ${colors.semygprimary};
  opacity: 0.95;
  font-size: clamp(1rem, 2.1vw, 1.15rem);
  line-height: 1.8;
  max-width: 56ch;
  margin: 1rem 0 0;
  font-weight: 400;

  strong {
    color: ${colors.semygprimar};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin: 1rem auto 0;
    padding: 0 1rem;
  }
`;

/* Grille premium avec espacement optimal */
const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 0.5rem 0 clamp(3rem, 5vw, 5rem);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const Card = styled(motion.button)`
  position: relative;
  display: block;
  border: none;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: ${colors.semygsecondary};
  box-shadow: 
    0 12px 24px rgba(0,0,0,0.08),
    0 4px 12px rgba(0,0,0,0.05);
  transform: translateZ(0);
  transition: all 0.3s ease;

  &:focus-visible {
    outline: 3px solid ${colors.semygprimar};
    outline-offset: 3px;
  }

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
    box-shadow: 
      0 24px 48px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.1);

    &::before {
      opacity: 1;
    }
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.05) contrast(1.05);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    rgba(0,0,0,0.7) 0%, 
    rgba(0,0,0,0.3) 50%, 
    rgba(0,0,0,0.1) 100%
  );
`;

const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg, 
    transparent 25%, 
    rgba(255,255,255,0.25) 40%, 
    transparent 55%
  );
  transform: translateX(-120%);
`;

const Tag = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0.7rem 1.1rem;
  border-radius: 10px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(4px);
  color: ${colors.semygprimary};
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
  transition: all 0.3s ease;

  svg {
    color: ${colors.semygprimar};
  }

  ${Card}:hover & {
    transform: translateY(-4px);
    background: rgba(255,255,255,0.95);
  }
`;

const ZoomBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(4px);
  color: ${colors.semygprimary};
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(0,0,0,0.15);
  transition: all 0.3s ease;

  svg {
    color: ${colors.semygprimar};
  }

  ${Card}:hover & {
    background: rgba(255,255,255,0.95);
    transform: scale(1.05);
  }
`;

/* Lightbox Premium */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: min(96vw, 1400px);
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 40px 80px rgba(0,0,0,0.5),
    0 0 0 1px rgba(255,255,255,0.05);
  background: ${colors.semygprimary};
`;

const Close = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  color: ${colors.semygprimary};
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: ${colors.accentGold};
    color: ${colors.semygprimary};
    transform: rotate(90deg);
  }
`;

const ModalImg = styled(motion.img)`
  width: 100%;
  height: min(80vh, 800px);
  object-fit: contain;
  object-position: center;
  cursor: grab;
  background: #f5f5f5;
`;

const ModalCaption = styled.div`
  background: ${colors.semygjouneclàire};
  padding: 1.2rem 1.5rem;
  color: ${colors.semygprimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  font-weight: 700;
  font-size: 1.1rem;

  span:last-child {
    font-weight: 600;
    color: ${colors.semygprimar};
    opacity: 0.9;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

/* Icônes thématiques */
const iconComponents = {
  residential: <Home size={20} />,
  exterior: <Trees size={20} />,
  team: <Users size={20} />,
  coastal: <Anchor size={20} />,
  commercial: <Building size={20} />,
  land: <MapPin size={20} />,
  construction: <Warehouse size={20} />
};

/* =============== Données Premium =============== */
const fallback = (imagess && (imagess.plàinàirr || imagess.pàrkenfàntjoue)) || "/placeholder.jpg";

const venues = [
  { 
    label: "Résidentiel & lotissements", 
    img: imagess?.bàtimentvillà || fallback,
    type: "residential"
  },
  
  { 
    label: "Équipe de construction", 
    img: imagess?.chàntier || fallback,
    type: "team"
  },
  { 
    label: "Sites côtiers & fleuves",   
    img: imagess?.vueàerien || fallback,
    type: "coastal"
  },
  
  { 
    label: "Chantiers en cours",     
    img: imagess?.chàntier5 || fallback,
    type: "construction"
  },
  { 
    label: "Villages aménagés",     
    img: imagess?.echàngevillàge || fallback,
    type: "land"
  },
  { 
    label: "Bâtiments publics",     
    img: imagess?.bàtimentmosk || fallback,
    type: "commercial"
  }
];

/* =============== Composant Principal Premium =============== */
const Semygimàge = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (index) => {
    setCurrent(index);
    setZoom(1);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleZoom = useCallback(() => setZoom((z) => (z === 1 ? 1.8 : 1)), []);

  return (
    <Section id="references">
      <Container>
        <Header>
          <BigIndex>§</BigIndex>
          <TitleBlock>
            <Title>Nos Réalisations Immobilières</Title>
            <Lead
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Découvrez notre portfolio de projets immobiliers soigneusement sélectionnés et développés en Guinée.
              <strong> Chaque réalisation</strong> témoigne de notre expertise en matière de
              <strong> sécurisation foncière</strong>, de conformité réglementaire et
              d'<strong>innovation durable</strong>.
            </Lead>
          </TitleBlock>
        </Header>

        <Grid>
          {venues.map((v, i) => (
            <Card
              key={`${v.label}-${i}`}
              onClick={() => openModal(i)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Voir le projet ${v.label} en détail`}
            >
              <CardImage
                src={v.img}
                alt={`Projet ${v.label} par Semyg`}
                loading="lazy"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
              <CardOverlay />
              <Shimmer as={motion.div} whileHover={{ x: "160%" }} transition={{ duration: 1.2 }} />
              <Tag>
                {iconComponents[v.type]}
                {v.label}
              </Tag>
              <ZoomBadge>
                <ZoomIn size={18} />
                Détails
              </ZoomBadge>
            </Card>
          ))}
        </Grid>
      </Container>

      {/* Lightbox Premium */}
      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <Modal
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-caption"
            >
              <Close onClick={closeModal} aria-label="Fermer la visionneuse">
                <X size={24} />
              </Close>

              <ModalImg
                key={current}
                src={venues[current].img}
                alt={`Projet ${venues[current].label} - Vue détaillée`}
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onDoubleClick={toggleZoom}
                drag={zoom > 1}
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                onDragStart={() => setDragging(true)}
                onDragEnd={() => setDragging(false)}
                style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
              />

              <ModalCaption id="lightbox-caption">
                <span>{venues[current].label}</span>
                <span>
                  {zoom === 1 ? "Double-cliquez pour zoomer" : "Double-cliquez pour réinitialiser"}
                </span>
              </ModalCaption>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Semygimàge;