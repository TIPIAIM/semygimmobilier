// src/components/Sections/ClientsTrust.jsx
import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import colors from "../../Styles/colors";
import {
  Briefcase,
  Users,
  Award,
  Handshake,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Logos (laisse-les comme tu les avais)
 import shelfistek from "../../assets/logos/shelfistek.png";
import essor from "../../assets/logos/essor.png";
import màgicpàrk from "../../assets/logos/màgicpàrk.png";
import officetourime from "../../assets/logos/officetourime.png";
import àlione from "../../assets/logos/àlione.png";
import pàlàbresconsulting from "../../assets/logos/pàlàbresconsulting.PNG";

// Images Semyg (watermark/fond)
 
const ClientsTrust = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-15% 0px" });

  /* ==================== Textes adaptés Semyg (immobilier) ==================== */
  const servicesItems = useMemo(
    () => [
      {
        icon: <Briefcase size={20} />,
        title: "Pilotage de projets immobiliers",
        content:
          "De la faisabilité au clos d’opération : coûts, délais, qualité et conformité maîtrisés sur tout le cycle projet.",
      },
      {
        icon: <Users size={20} />,
        title: "Expertise pluridisciplinaire",
        content:
          "Équipe intégrée (juridique, technique, financier) et réseau de partenaires : notaires, bureaux d’études, banques & assurances.",
      },
      {
        icon: <Award size={20} />,
        title: "Structuration & performance",
        content:
          "Montage sur‑mesure, asset management, reporting et optimisation des revenus pour des actifs durables et rentables.",
      },
    ],
    []
  );

  const clients = useMemo(
    () => [
      { name: "Shelfi stek", logo: shelfistek, alt: "Logo Shelfi stek" },
      { name: "Essor", logo: essor, alt: "Logo Essor" },
      { name: "Magic Park", logo: màgicpàrk, alt: "Logo Magic Park" },
      {
        name: "Office tourisme",
        logo: officetourime,
        alt: "Logo Office tourisme",
      },
      {
        name: "Palabres consulting",
        logo: pàlàbresconsulting,
        alt: "Logo Palabres consulting",
      },
      { name: "All in one", logo: àlione, alt: "Logo All in one" },
    ],
    []
  );

  return (
    <TrustContainer
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Dim />
      <ContentWrapper>
        <Header
          variants={headerVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Title>
            Ils nous font confiance
            <motion.span
              className="barre-animation"
              initial={{ width: 0 }}
              animate={{ width: 110 }}
              transition={{ duration: 0.85, delay: 0.1, type: "spring" }}
            />
          </Title>
          <ToggleButton
            aria-label={isExpanded ? "Réduire" : "Développer"}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </ToggleButton>
        </Header>

        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <IntroText>
              Semyg Groupe Immobilier accompagne institutions et entreprises sur
              des opérations **résidentielles, tertiaires et foncières**. Nos
              références couvrent :
              <ul>
                <li>Études de faisabilité & due diligence</li>
                <li>Promotion & développement d’actifs</li>
                <li>Gestion locative & asset management</li>
                <li>Conformité réglementaire & normes HSE</li>
              </ul>
            </IntroText>

            <ServicesGrid>
              {servicesItems.map((item, index) => (
                <ServiceItem
                  key={`service-item-${index}`}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  <TireeAnim
                    as={motion.div}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.55 + index * 0.1,
                      delay: 0.25 + index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                  <ItemHeader>
                    <ItemIcon>{item.icon}</ItemIcon>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemHeader>
                  <ItemContent>{item.content}</ItemContent>
                </ServiceItem>
              ))}
            </ServicesGrid>

            <ClientsSection variants={indicatorsVariants}>
              <ClientsTitle>
                <Handshake size={20} />
                Quelques partenaires & clients
              </ClientsTitle>
              <ClientsGrid>
                {clients.map((client, index) => (
                  <ClientLogo
                    key={`client-${index}`}
                    variants={indicatorVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    }}
                  >
                    <ClientLogoImage
                      src={client.logo}
                      alt={client.alt}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "block";
                      }}
                    />
                    <ClientName>{client.name}</ClientName>
                  </ClientLogo>
                ))}
              </ClientsGrid>
            </ClientsSection>

            <CTA>
              <CTAText>
                Confiez‑nous votre projet immobilier : transparence, rigueur &
                performance.
              </CTAText>
            </CTA>

            <Socials>
              <SocialDot color={colors.semygsecondar}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.semygprimary}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
              <SocialDot color={colors.semygprimar}>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <b>●</b>
                </motion.span>
              </SocialDot>
            </Socials>
          </motion.div>
        )}
      </ContentWrapper>
    </TrustContainer>
  );
};

/* ================= VARIANTS ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};
const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.8 },
  },
};
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};
const cardVariants = {
  hidden: (i) => ({ opacity: 0, y: 50, x: i % 2 === 0 ? -30 : 30 }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  }),
};
const indicatorsVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.4, duration: 0.6 } },
};
const indicatorVariants = {
  hidden: () => ({ opacity: 0, scale: 0.8, y: 20 }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  }),
};

/* ================= STYLES — Palette Semyg ================= */
const TrustContainer = styled(motion.section)`
  --bg: ${colors.semygprimary};
  --gold: ${colors.semygprimar};
  --text: ${colors.semygjouneclàire};
  --accent: ${colors.semygsecondar};

  position: relative;
  width: 100%;
  padding: clamp(3rem, 6vw, 4rem) 1.5rem;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
      120deg,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.55) 100%
    ),
    url(${(p) => p.$bg}) center/cover no-repeat, var(--bg);
`;

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      60% 60% at 20% 10%,
      ${colors.semygsecondar} 0%,
      transparent 20%
    ),
    radial-gradient(
      30% 30% at 100% 100%,
      ${colors.semygprimar} 0%,
      transparent 30%
    );
  backdrop-filter: blur(1px);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1040px;
  width: 100%;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.2rem;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  font-weight: 900;
  color: ${colors.semygprimar};
  margin: 0;
  position: relative;
  padding-bottom: 1.1rem;
  line-height: 1.4;

  .barre-animation {
    display: block;
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 5px;
    background: linear-gradient(90deg, var(--gold) 0%, transparent 100%);
    border-radius: 2px;
    z-index: 2;
  }
`;

const ToggleButton = styled(motion.button)`
  background: ${colors.semygjouneclàire}60;
  border: none;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.semygprimar};
  }
`;

const IntroText = styled.div`
  color: var(--text);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  font-weight: 500;
  line-height: 1.75;
  margin-bottom: 2.3rem;
  padding: 0 0.25rem;

  ul {
    margin-top: 0.8rem;
    padding-left: 1.2rem;
  }
  li {
    margin-bottom: 0.35rem;
  }
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2.6rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TireeAnim = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 18px;
  background: linear-gradient(
    120deg,
    ${colors.semygsecondary} 50%,
    ${colors.semygprimar} 50%
  );
  border-radius: 1px;
  z-index: 2;
`;

const ServiceItem = styled(motion.div)`
  position: relative;
  background: ${colors.semygjouneclàire};
  border-radius: 180px 0 0 0;
  padding: 1.6rem 1.2rem 1.6rem 2rem;
  min-height: 170px;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${colors.semygprimar};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    color: ;
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.18rem;
  color: ${colors.semygprimary};
  margin: 0;
  font-weight: 900;
`;

const ItemContent = styled.p`
  color: ${colors.semygprimary};
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.7;
  margin: 0;
`;

const ClientsSection = styled(motion.div)`
  border-radius: 8px;
  padding: 1.6rem 0 0.6rem;
  text-align: center;
`;

const ClientsTitle = styled.h4`
  font-size: 1.8rem;
  color: var(--text);
  font-weight: 900;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }
`;

const ClientLogo = styled(motion.div)`
  background: ${colors.semygprima};
  padding: 1.2rem 1rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid ${colors.semygprimar};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 110px;

  &:hover {
    transform: translateY(-4px);
    background: ${colors.semygjouneclàire};
    img {
      transform: scale(1.06);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${colors.semygprimar},
      ${colors.semygsecondar}
    );
  }
`;

const ClientLogoImage = styled.img`
  max-width: 78%;
  max-height: 46px;
  margin-bottom: 0.8rem;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const ClientName = styled.span`
  display: none;
  font-size: 0.98rem;
  font-weight: 800;
  color: ${colors.semygprimary};

  ${ClientLogo}:hover & {
    display: block;
  }
`;

const CTA = styled.div`
  text-align: center;
  margin: 2.4rem 0 0.4rem;
`;

const CTAText = styled.p`
  font-size: 1.15rem;
  color: ${colors.semygjouneclàire};
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
`;

const SocialDot = styled.span`
  color: ${({ color }) => color || colors.semygsecondar};
  font-size: 18px;
  display: inline-block;
`;

export default React.memo(ClientsTrust);
