import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

// --- Animation du tiret ---
const dashIn = keyframes`
  from { width: 0; opacity: 0.3; }
  to { width: 85%; opacity: 1; }
`;

// >>>>>>>>> Textes adaptés Semyg Groupe Immobilier (titres + descriptions) <<<<<<<<<
const cardsData = [
  {
    img: imagess.bàtimentvillàg2,
    title: "Promotion & résidentiel",
    desc: "Études, acquisition, développement : des logements bien conçus, conformes et pensés pour la valeur à long terme.",
  },
  {
    img: imagess.bàtimentvillà,
    title: "Gestion d’actifs & locatif",
    desc: "Location, suivi, optimisation et valorisation d’actifs pour sécuriser les revenus et pérenniser le patrimoine.",
  },
  {
    img: imagess.echàngevillàge,
    title: "Partenariats & montage",
    desc: "Structuration juridique et financière, co-développement et réseau de partenaires (notaires, BE, banques).",
  },
];

const Section = styled(motion.section)`
  position: relative;
  min-height: 80vh;
  width: 100%;
  background: linear-gradient(
    120deg,
    ${colors.semygsecondar} 72%,
    ${colors.semygsecondary} 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 6vw 0 4vw 0;
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 2.8rem 0 1.7rem 0;
    min-height: unset;
  }
  @media (max-width: 600px) {
    padding: 2.8rem 0 1.7rem 0;
    min-height: unset;
  }
`;

const BigTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1.1rem;
  letter-spacing: 0.01em;
  display: inline-block;
  padding-bottom: 0.32rem;
  background: none;
  @media (max-width: 900px) {
    font-size: 2.5rem;
    margin-bottom: 0.9rem;
  }
  @media (max-width: 600px) {
    font-size: 2.1rem;
    padding-bottom: 0.86rem;
  }
  .gold {
    color: ${colors.semygprimar};
  }
  .white {
    color: ${colors.white};
    font-weight: 800;
    margin-left: 0.7rem;
  }
`;

const AnimatedBar = styled(motion.div)`
  height: 5px;
  background: linear-gradient(90deg, ${colors.semygsecondary} 60%, #fff5c7 100%);
  border-radius: 3px;
  margin: 0.19rem auto 0.46rem auto;
  width: 85%;
  opacity: 1;
  animation: ${dashIn} 4.85s cubic-bezier(0.72, 0.07, 0.64, 1.05);
  transition: background 0.23s, width 0.17s;
  will-change: width, background;
`;

const Description = styled(motion.div)`
  color: ${colors.white};
  font-size: 1.18rem;
  text-align: center;
  font-weight: 400;
  max-width: 680px;
  margin: 0 auto 2.8rem auto;
  line-height: 1.63;
  @media (max-width: 900px) {
    font-size: 1.04rem;
    margin-bottom: 2.1rem;
    width: 80%;
    max-width: 97vw;
  }
  @media (max-width: 600px) {
    font-size: 0.97rem;
    margin-bottom: 1.7rem;
    width: 80%;
    text-align: left;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1100px;
  z-index: 3;
  @media (max-width: 900px) {
    gap: 1.2rem;
    flex-direction: column;
    align-items: center;
    max-width: 98vw;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(5px);
  border-radius: 1px;
  box-shadow: 0 10px 48px 0 rgba(22, 42, 80, 0.13);
  padding: 1.18rem 1.1rem 1.38rem 1.1rem;
  min-width: 240px;
  max-width: 340px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.27s cubic-bezier(0.22, 0.68, 0.52, 1.01),
    transform 0.22s cubic-bezier(0.22, 0.68, 0.52, 1.01);
  cursor: pointer;
  @media (max-width: 900px) {
    max-width: 440px;
    min-width: 0;
    width: 98vw;
    padding: 1.05rem 0.8rem 1.18rem 0.8rem;
  }
  @media (max-width: 600px) {
    max-width: 99vw;
    width: 82%;
    border-radius: 1px;
    background: linear-gradient(
      -40deg,
      ${colors.semygsecondar} 70%,
      ${colors.semygsecondary} 60%
    );
  }
`;

const CardImg = styled(motion.img)`
  width: 108px;
  height: 88px;
  object-fit: cover;
  border-radius: 1px 1px 50px 50px;
  box-shadow: 0 4px 22px 0 rgba(20, 30, 70, 0.11);
  margin-bottom: 1.12rem;
  margin-top: 0.2rem;
  @media (max-width: 900px) {
    width: 56px;
    height: 56px;
    margin-bottom: 0.82rem;
  }
  @media (max-width: 600px) {
    width: 240px;
    height: 254px;
    border-radius: 1px;
  }
`;

const CardTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  color: ${colors.semygprimar};
  font-size: 1.23rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.01em;
  padding-bottom: 0.07rem;
  @media (max-width: 900px) {
    font-size: 1.2rem;
    width: 95%;
    margin-bottom: 0.4rem;
  }
`;

const CardDesc = styled.div`
  color: ${colors.white};
  font-size: 1.01rem;
  font-weight: 400;
  text-align: center;
  line-height: 1.54;
  @media (max-width: 900px) {
    font-size: 0.96rem;
  }
`;

// Cascade + rebond : utilise spring et bounce pour animate
const cardVariants = {
  initial: (idx) => ({
    opacity: 0,
    y: 64,
    scale: 0.85,
    transition: { duration: 0.12, delay: idx * 0.15 },
  }),
  animate: (idx) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 330,
      damping: 19,
      bounce: 0.44,
      duration: 0.81,
      delay: idx * 0.58,
    },
  }),
  exit: (idx) => ({
    opacity: 0,
    y: 50,
    scale: 0.88,
    transition: { duration: 0.37, delay: idx * 0.08, ease: "easeInOut" },
  }),
};

const Home3semyg = () => (
  <Section
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.63, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <BigTitle
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.59, delay: 0.07, type: "spring" }}
    >
      <span className="gold">Semyg</span>
      <span className="white">Groupe Immobilier</span>
    </BigTitle>

    <Description
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, type: "spring" }}
    >
      Semyg accompagne vos projets immobiliers de bout en bout : faisabilité,
      acquisition, développement, montage et gestion. Notre approche allie
      rigueur opérationnelle, conformité et création de valeur durable pour des
      actifs performants — du résidentiel à l’asset management, en passant par
      la commercialisation et le locatif.
    </Description>

    <CardsWrapper>
      <AnimatePresence>
        {cardsData.map((card, idx) => (
          <Card
            key={card.title}
            custom={idx}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            exit="exit"
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            whileHover={{
              scale: 1.038,
              y: -8,
              boxShadow: "0 20px 50px 0 rgba(41,70,180,0.17)",
            }}
          >
            <CardImg
              src={card.img}
              alt={card.title}
              whileHover={{
                scale: 1.13,
                rotate: -4.3,
                boxShadow: "0 15px 32px 0 rgba(55,65,120,0.16)",
              }}
              transition={{ duration: 0.22, type: "spring" }}
            />
            <CardTitleWrapper>
              <CardTitle>{card.title}</CardTitle>
              <AnimatedBar
                layout
                initial={{ width: 0, background: colors.accentGold }}
                animate={{ width: "85%" }}
                whileHover={{
                  background: `linear-gradient(90deg, ${colors.accentTurquoise} 40%, ${colors.white} 100%)`,
                  width: "98%",
                }}
                exit={{ width: 0, opacity: 0, transition: { duration: 0.22 } }}
                transition={{
                  background: { duration: 0.22 },
                  width: { duration: 0.34 },
                }}
              />
            </CardTitleWrapper>
            <CardDesc>{card.desc}</CardDesc>
          </Card>
        ))}
      </AnimatePresence>
    </CardsWrapper>
  </Section>
);

export default Home3semyg;
