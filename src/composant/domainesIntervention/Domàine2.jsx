// src/components/Sections/PremiumServicesSemyg.jsx
import styled from "styled-components";
import {   FaScaleUnbalanced, FaBuildingCircleCheck } from "react-icons/fa6";
import { FaChartArea, FaWhatsappSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
 import colors from "../../Styles/colors";
 
/* ===== WhatsApp utils ===== */
const WHATSAPP_NUMBER = "224624292931"; // TODO: Remplacer par le numéro Semyg si différent (format international sans +)
const waMsg = (topic) =>
  `Bonjour, je viens du site Semyg. ${topic} Merci !`;
const waHref = (topic) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg(topic))}`;

const PremiumServicesSemyg = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <ServicesContainer ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Header
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          SERVICES PREMIUM SEMYG
        </motion.h1>

        <HeaderDecoration
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <Subtitle
          initial={{ y: 10, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Conseil, pilotage et exécution pour des projets immobiliers et d’aménagement à fort impact, alignés aux meilleurs standards.
        </Subtitle>
      </Header>

      <ServicesGrid>
        {/* 1) Études & Montage */}
        <ServiceCard
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.semygsecondary}>
            <FaChartArea size={24} />
          </ServiceIcon>

          <h2>Études & Montage</h2>

          <ServiceHighlight $color={colors.semygsecondary}>
            <p>
              De l’étude d’opportunité au plan de montage financier et technique, pour sécuriser la faisabilité de vos projets.
            </p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Diagnostics territoriaux, fonciers et techniques",
              "APS/APD, chiffrages, phasage et macro‑planning",
              "Business plan, CAPEX/OPEX, matrices de risques",
              "Dossiers d’autorisations et cahiers des charges",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.45 + index * 0.08 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je souhaite un devis pour Études & Montage.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour demander un devis"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsappSquare /> Demander un devis
          </CtaLink>
        </ServiceCard>

        {/* 2) Promotion & Gestion d’actifs — Featured */}
        <ServiceCard
          $featured
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.semygprimar}>
            <FaBuildingCircleCheck size={24} />
          </ServiceIcon>

          <h2>Promotion & Gestion d’actifs</h2>

          <ServiceHighlight $color={colors.semygprimar}>
            <p>
              Pilotage opérationnel et valorisation d’actifs: de la promotion à l’exploitation, avec reporting clair et KPI.
            </p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Schémas de commercialisation et mix‑produits",
              "Suivi de chantier, contrôle qualité et délais",
              "Mise en exploitation, contrats et SLA",
              "Tableaux de bord financiers et performance ESG",
              "Asset management: arbitrages et valorisation",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je veux échanger sur la Promotion & Gestion d’actifs.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour voir nos réalisations"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsappSquare /> Parler à un expert
          </CtaLink>
        </ServiceCard>

        {/* 3) Conformité & Impact */}
        <ServiceCard
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={{ y: -8 }}
        >
          <ServiceIcon $color={colors.semygsecondar}>
            <FaScaleUnbalanced size={24} />
          </ServiceIcon>

          <h2>Conformité & Impact</h2>

          <ServiceHighlight $color={colors.semygsecondar}>
            <p>
              Sécuriser la conformité réglementaire et maximiser l’impact social et environnemental de vos opérations.
            </p>
          </ServiceHighlight>

          <BenefitsList>
            {[
              "Due diligences juridiques et administratives",
              "Études d’impact environnemental et social (EIES)",
              "Conformité foncière, servitudes et titres",
              "Politiques RSE et plans d’atténuation",
              "Audits et certification (normes locales & internationales)",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + index * 0.08 }}
              >
                {item}
              </motion.li>
            ))}
          </BenefitsList>

          <CtaLink
            href={waHref("Je souhaite planifier un audit Conformité & Impact.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp pour planifier un audit"
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsappSquare /> Planifier un audit
          </CtaLink>
        </ServiceCard>
      </ServicesGrid>

     
    </ServicesContainer>
  );
};

/* ===================== Styled Components ===================== */
const ServicesContainer = styled(motion.div)`
  /* Variables palette Semyg */
  --primary-color: ${colors.semygprimary};
  --secondary-color: ${colors.semygsecondary};
  --accent-color: ${colors.semygsecondar};
  --featured-color: ${colors.semygprimar};
  --accent-soft: ${colors.semygjouneclàire};
   --light-bg: rgba(14,45,79,0.04);
  --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    background: linear-gradient(-120deg, ${colors.semygsecondar} 55%,  ${colors.semygprimar} 50%);

  font-family: "Montserrat", sans-serif;
   margin: 0rem auto;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    z-index: -1;
  }

  @media (max-width: 900px) {
    padding: 3rem 1.25rem;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    border-radius: 10px;
  }
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.6rem;

  h1 {
    font-size: clamp(1.6rem, 3.4vw, 2.4rem);
    margin-bottom: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background: linear-gradient(90deg, ${colors.semygsecondary} 50%,  ${colors.semygprimar} 50%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 480px) {
    margin-bottom: 2.1rem;
    h1 {
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
  }
`;

const HeaderDecoration = styled(motion.div)`
  width: 140px;
  height: 4px;
  background: linear-gradient(90deg, ${colors.semygsecondary} 50%, ${colors.semygprimary} 50%);
  margin: 0 auto 1.6rem;
  
  transform-origin: left center;

  @media (max-width: 480px) {
    width: 100px;
    height: 3px;
    margin-bottom: 1.1rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: ${colors.semygjouneclàire || "#3f4650"};
  font-size: clamp(0.98rem, 1.8vw, 1.1rem);
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 500;

  @media (max-width: 480px) {
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.1rem;
  margin-bottom: 3.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }
`;

const ServiceCard = styled(motion.div)`
  border-radius: 2px;
  padding: 2rem;
  background: ${colors.semygprimary};
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  border-top: 4px solid ${(p) => (p.$featured ? "var(--featured-color)" : "transparent")};
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg,${colors.semygprimar} 50%, ${colors.semygsecondary} 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    box-shadow: var(--hover-shadow);
    &::after { opacity: 1; }
  }

  h2 {
    font-size: 1.35rem;
    color:  ${ colors.semygprimar };
    margin-bottom: 1rem;
    font-weight: 800;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    padding: 1.35rem;
    h2 { font-size: 1.1rem; }
  }
`;

const ServiceIcon = styled.div`
  width: 68px;
  height: 68px;
  background: ${(p) => `${p.$color || colors.error}10`};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  color: ${(p) => p.$color || colors.semygsecondary};
  font-size: 1.6rem;
  transition: transform 0.3s ease;

  ${ServiceCard}:hover & {
    transform: rotate(8deg) scale(1.06);
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    margin-bottom: 0.9rem;
    svg { width: 20px; height: 20px; }
  }
`;

const ServiceHighlight = styled.div`
  background:  ${ colors.semygsecondar }20;
  padding: 1rem 1.1rem;
  border-left: 4px solid  ${ colors.semygprimar };
  margin-bottom: 1.25rem;
  border-radius: 0 12px 12px 0;
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    background: ${(p) => `${p.$color}0d`};
    border-left-color: ${(p) => p.$color};
  }

  p {
    margin: 0;
    color:  ${ colors.semygjouneclàire };
    font-size: 0.98rem;
    line-height: 1.55;
  }

  @media (max-width: 480px) {
    padding: 0.85rem 1rem;
    p { font-size: 0.95rem; }
  }
`;

const BenefitsList = styled.ul`
  margin: 1.2rem 0 0.2rem;
  padding-left: 0;
  display: grid;
  gap: 0.65rem;

  li {
    color:  ${ colors.semygjouneclàire };
    position: relative;
    list-style-type: none;
    padding-left: 1.5rem;
    line-height: 1.55;
    font-size: 0.98rem;

    &::before {
      content: "✓";
      color: ${ colors.semygprimar };
      position: absolute;
      left: 0;
      font-weight: 900;
      font-size: 1.05rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    li { font-size: 0.94rem; padding-left: 1.35rem; }
  }
`;

const CtaLink = styled(motion.a)`
  background: linear-gradient(90deg,  ${ colors.semygsecondar } 90%, ${ colors.semygprimar } 0%);
  color:${ colors.semygjouneclàire };
  border: none;
  padding: 0.95rem 1.2rem;
  border-radius: 2px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1.2rem;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, ${colors.semygsecondar} 50%, ${colors.semygsecondary} 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    &::before { opacity: 1; }
  }

  @media (max-width: 480px) {
    border-radius: 8px;
    font-size: 0.88rem;
    padding: 0.85rem 1.05rem;
  }
`;

const Footer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.1rem;
  }
  @media (max-width: 480px) {
    padding-top: 1.4rem;
  }
`;

const Signature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: ${colors.semygjouneclàire };
  font-size: 0.95rem;
`;

const Logo = styled(motion.img)`
  height: 36px;
  @media (max-width: 480px) { height: 22px; }
`;

const ContactPromo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: ${colors.semygprimary};
  font-weight: 600;

  a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 800;
    transition: color 0.25s ease;
    display: inline-flex;
    align-items: center;
  }
   svg { color: var(--featured-color); }

  @media (max-width: 480px) { font-size: 0.9rem; }
`;

export default PremiumServicesSemyg;
