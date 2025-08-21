// src/components/APropos.jsx
import React, { lazy, Suspense, memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import MonQRCode from "../../MonQRCode";

// ============ SEO (Lazy + memo) ============
const SEO = lazy(() => import("../../SEO"));
const Navbard = lazy(() => import("../Acueil/Barnav2"));

const SEOMemo = memo((props) => {
  const { title, description, image, keywords, url, children } = props;
  return (
    <SEO title={title} description={description} image={image} keywords={keywords} url={url}>
      {children}
    </SEO>
  );
});

// ============ STYLES ============
const AnimatedBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    ${colors.semygsecondar} 50%,
    ${colors.semygprimar} 20%
  );
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.35;
    background: url("data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 60V0H60' stroke='%23586320' stroke-width='0.7' stroke-dasharray='7 5'/></svg>")
      repeat;
    animation: gridmove 10s linear infinite;
  }
  @keyframes gridmove {
    40% { background-position: 0 0; }
    50% { background-position: 120px 60px; }
  }
`;

const AboutContainer = styled.section`
  padding: 2rem 1rem;
  margin-top: 70px;
  position: relative;
  overflow: hidden;
  @media (min-width: 480px) { padding: 3rem 1.5rem; }
  @media (min-width: 768px) { padding: 4rem 2rem; }
  @media (min-width: 1200px) { padding: 6rem 2rem; }
`;

const ContentGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  align-items: center;
  @media (min-width: 992px) {
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
  }
`;

const VisualSection = styled(motion.div)`
  position: relative;
  background: ${colors.semygsecondar};
  border-radius: 0.1rem;
  overflow: hidden;
  min-height: 280px;
  width: 100%;
  aspect-ratio: 1;
  @media (min-width: 480px) { aspect-ratio: 16/9; }
  @media (min-width: 768px) { min-height: 380px; aspect-ratio: 1; }
  @media (min-width: 992px) { aspect-ratio: unset; min-height: 480px; }
`;

const MainVisual = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: grayscale(8%) contrast(102%);
  transition: transform 2.2s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center;
  @media (hover: hover) {
    ${VisualSection}:hover & {
      transform: scale(1.025);
      filter: grayscale(0%) contrast(110%);
    }
  }
`;

const TextContent = styled.div`
  padding: 1rem;
  position: relative;
  @media (min-width: 488px) { padding: 2rem; }
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 800;
  color: ${colors.semygprimar};
  margin-bottom: 1.5rem;
  line-height: 1.3;
  @media (min-width: 480px) { font-size: 2.4rem; }
  @media (min-width: 768px) { font-size: 2.8rem; margin-bottom: 2rem; }
`;

const Highlight = styled.span`
  color: ${colors.semygprimary};
  font-weight: 900;
  position: relative;
  margin-left: 0.2rem;
  display: inline-block;
  &::before {
    content: "";
    position: absolute; bottom: -2px; left: 0;
    width: 0; height: 3px;
    background: ${colors.semygprimar};
    transition: width 0.4s ease;
  }
  &:hover::before { width: 100%; }
`;

const Description = styled(motion.p)`
  font-size: 1.08rem;
  line-height: 1.8;
  color: ${colors.semygprimary};
  margin-bottom: 2rem;
  opacity: 0.95;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-top: 2rem;
  @media (min-width: 480px) { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
`;

const StatCard = styled(motion.div)`
  padding: 1.1rem;
  background: ${colors.semygsecondary};
  border-radius: 0.2rem;
  transition: all 0.25s ease;
  border: 1px solid ${colors.semygprimary}14;
  &:hover { transform: translateY(-5px); background: ${colors.semygjouneclàire}; }
`;

const StatValue = styled.div`
  font-size: 1.18rem;
  color: ${colors.semygprimar};
  font-weight: 800;
  margin-bottom: 0.25rem;
  display: flex; align-items: center; gap: 0.8rem;
`;

const StatLabel = styled.div`
  color: ${colors.semygsecondar};
  font-size: 0.98rem;
  font-weight: 600;
`;

// --- Team Section ---
const TeamGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 0 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  @media (min-width: 480px) { gap: 1.5rem; padding: 0 1.5rem; }
  @media (min-width: 768px) { gap: 2rem; padding: 0 2rem; }
  @media (min-width: 992px) { gap: 2.5rem; padding: 0 3rem; }
`;

const TeamMember = styled(motion.div)`
  background: ${colors.semygsecondary};
  border-radius: 0.2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid ${colors.semygprimary}14;
  &:hover { transform: translateY(-10px); }
`;

const TeamSection = styled.div`
  margin-top: 4rem;
  padding: 3rem 0;
  background: none;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) { margin-top: 2rem; padding: 2rem 0; }
`;

const TeamTitle = styled(SectionTitle)`
  color: ${colors.semygjouneclàire};
  text-align: center;
  margin-bottom: 4rem;
  margin-top: 2rem;
  margin-left: 1rem;
  background: linear-gradient(-150deg, ${colors.semygsecondary} 94%, ${colors.semygprimar} 10%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const MemberPhoto = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center top;
  border-bottom: 4px solid ${colors.semygprimar};
`;

const MemberInfo = styled.div`
  padding: 1.6rem;
  text-align: center;
  background: ${colors.semygjouneclàire};
`;

const MemberName = styled.h3`
  color: ${colors.semygprimar};
  margin-bottom: 0.4rem;
  font-weight: 800;
  font-size: 1.4rem;
`;

const MemberRole = styled.p`
  color: ${colors.semygsecondar};
  font-weight: 700;
  font-size: 1rem;
`;

// ============ COMPOSANT ============
const APropos = () => {
  // Visuel SEO (immobilier Semyg)
  const seoImg = imagess.chàntier4

  const seoTitle = "Qui sommes‑nous ? | Semyg Groupe Immobilier";
  const seoDescription =
    "Semyg Groupe Immobilier conçoit, développe et gère des actifs résidentiels et tertiaires : études de faisabilité, montage, promotion, commercialisation et gestion locative. Notre promesse : transparence, rigueur et performance durable.";
  const seoKeywords = [
    "Semyg Groupe Immobilier",
    "promotion immobilière",
    "investissement immobilier Guinée",
    "gestion d’actifs",
    "gestion locative",
    "asset management",
    "montage d’opérations",
    "HSE conformité",
  ];
  const seoUrl = "https://www.semyggroupeimmobilier.com/presentation";

  return (
    <>
      {/* SEO */}
      <Suspense fallback={null}>
        <SEOMemo
          title={seoTitle}
          description={seoDescription}
          image={seoImg}
          keywords={seoKeywords}
          url={seoUrl}
        />
      </Suspense>

      {/* Barre de navigation (lazy) */}
      <Suspense fallback={null}>
        <Navbard />
      </Suspense>

      {/* À propos */}
      <AboutContainer>
        <ContentGrid>
          <VisualSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MainVisual src={seoImg} alt="Présentation Semyg Groupe Immobilier" loading="lazy" />
          </VisualSection>

          <TextContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Qui <Highlight>sommes‑nous</Highlight> ?
            </SectionTitle>

            <Description
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Highlight>Semyg Groupe Immobilier</Highlight> accompagne ses clients sur
              l’<strong>ensemble de la chaîne de valeur</strong> : identification foncière,
              <strong> études de faisabilité</strong>, <strong>montage juridique, technique et financier</strong>,
              <strong> développement & pilotage de chantier</strong>, <strong>commercialisation</strong> et
              <strong> gestion locative</strong>. Notre approche intègre la <strong>conformité HSE</strong>,
              la qualité d’exécution et la <strong>performance durable</strong>, afin de transformer le potentiel
              des projets en <strong>valeur pérenne</strong>.
            </Description>

            <StatsGrid>
              <StatCard whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 260 }}>
                <StatValue>Notre vision</StatValue>
                <StatLabel>
                  Bâtir des actifs résilients qui améliorent le cadre de vie et soutiennent la
                  croissance urbaine, tout en offrant des <strong>rendements compétitifs</strong>
                  adossés à des fondamentaux solides.
                </StatLabel>
              </StatCard>

              <StatCard whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 260 }}>
                <StatValue>Notre mission</StatValue>
                <StatLabel>
                  <strong>Sécuriser, développer et valoriser</strong> des portefeuilles immobiliers
                  (résidentiel, tertiaire, foncier) grâce à une <strong>exécution rigoureuse</strong> et
                  un pilotage <strong>transparent</strong> des risques, des délais et des coûts.
                </StatLabel>
              </StatCard>
            </StatsGrid>
          </TextContent>
        </ContentGrid>
      </AboutContainer>

      {/* Équipe */}
      <TeamSection>
        <AnimatedBg />
        <TeamTitle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <Highlight style={{ color: colors.semygjouneclàire }}>Rencontrez l’</Highlight>
          <Highlight>équipe</Highlight>
        </TeamTitle>

        <TeamGrid>
          {[
            {
              name: "Thierno Bachir",
              role: "Direction Générale – Semyg Groupe Immobilier",
              photo: imagess.bàtimentetàge2 || "/placeholder.jpg",
            },
            {
              name: "Me Amadou Oury",
              role: "Conseil juridique & structuration",
              photo: imagess.bàtimentetàge1 || "/placeholder.jpg",
            },
            {
              name: "Alpha Ousmane",
              role: "Direction Technique & Qualité chantier",
              photo: imagess.bàtimentecole4 || imagess.àlphà || "/placeholder.jpg",
            },
            {
              name: "Moussadjan Kaba",
              role: "Direction Financière & Développement",
              photo: imagess.bàtimentvillà || "/placeholder.jpg",
            },
          ].map((member, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0.6, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <MemberPhoto
                src={member.photo}
                sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
                alt={`Portrait de ${member.name}`}
                loading="lazy"
              />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid> 
      </TeamSection>
     
    </>
  );
};

export default memo(APropos);
