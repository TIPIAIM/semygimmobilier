// src/components/Sections/Temoignage.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ================== Styles (palette Semyg) ================== */
const TestimonialContainer = styled.section`
  --bg-top: ${colors.semygprimar};
  --bg-bottom: ${colors.semygsecondary};
  --text: ${colors.semygjouneclàire};
  --card-bg: ${colors.semygjouneclàire};
  --muted: ${colors.semygprimary};
  --accent: ${colors.semygsecondar};
 background: linear-gradient(
    120deg,
    ${colors.semygprimary} 80%,
    ${colors.semygprimar} 60%
  );
  padding: clamp(0rem, 3vw, 2rem) 1rem  ;
  position: relative;
  overflow: hidden;
  min-height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  isolation: isolate;
  
  &::before {
    content: "";
    position: absolute;
    inset: -30% -10% auto -10%;
    height: 52%;
    background:
      radial-gradient(600px 240px at 18% 30%, ${colors.accentGold}22, transparent 65%),
      radial-gradient(560px 260px at 88% 5%, ${colors.semygsecondar}26, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto -10% -30% -10%;
    height: 48%;
    background:
      radial-gradient(560px 220px at 12% 72%, ${colors.semygprimar}22, transparent 70%),
      radial-gradient(520px 220px at 92% 82%, ${colors.semygprimary}1a, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 2.5rem;
  color: var(--text);
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  line-height: 1.15;
  color: ${colors.semygprimar};
  position: relative;
  display: inline-block;
  padding-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.15);

  .barre-animation {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 4px;
    width: 0;
    background: linear-gradient(90deg, ${colors.semygprimar} 0%, ${colors.semygsecondar} 100%);
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
  margin: 1rem auto 0;
  max-width: 860px;
  color: var(--text);
  opacity: 0.95;
  line-height: 1.8;
  font-weight: 500;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  padding: 0 1.5rem;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Stage = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const TestimonialContent = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorImage = styled(motion.img)`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  filter: grayscale(10%);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  z-index: 2;
  border: 4px solid ${colors.semygprimar}33;

  &:hover {
    filter: grayscale(0%);
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
`;

const QuoteContainer = styled(motion.div)`
  background: var(--card-bg);
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid ${colors.semygprimary}14;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background: var(--card-bg);
    border-radius: 3px;
    box-shadow: -2px -2px 5px rgba(0,0,0,0.05);
    z-index: 1;
  }
`;

const Quote = styled.blockquote`
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  color: ${colors.semygprimary};
  line-height: 1.8;
  margin: 0 0 1.5rem;
  position: relative;
  padding: 0 1rem;
  font-weight: 600;
  font-style: italic;

  svg {
    color: ${colors.semygprimar};
    font-size: 1.2rem;
    margin: 0 0.5rem;
    opacity: 0.9;
    vertical-align: middle;
  }
`;

const AuthorInfo = styled.cite`
  display: block;
  font-style: normal;
  color: ${colors.semygprimary};
  font-weight: 900;
  margin-top: 1.5rem;
  font-size: 1.12rem;
  position: relative;

  span {
    display: block;
    font-weight: 600;
    color: ${colors.semygsecondar};
    font-size: 0.98rem;
    margin-top: 0.5rem;
  }

  &::before {
    content: "";
    display: block;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, ${colors.accentGold}, transparent);
    margin: 0 auto 1rem;
    opacity: 0.8;
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 3;
  pointer-events: none;

  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    justify-content: center;
    gap: 1rem;
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: ${colors.semygjouneclàire};
  color: ${colors.semygprimary};
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  pointer-events: auto;

  &:hover {
    background: ${colors.semygprimar};
    transform: scale(1.1);
    color: ${colors.semygjouneclàire};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg { width: 24px; height: 24px; }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? colors.semygprimar : "rgba(255,255,255,0.55)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute; inset: 0;
    background: ${colors.semygprimar};
    border-radius: 50%;
    transform: scale(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
    &::after { transform: scale(1); }
  }
`;

const CompanyLogos = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 0 1rem;
`;

const CompanyLogo = styled(motion.img)`
  height: 40px;
  max-width: 120px;
  object-fit: contain;
  filter: grayscale(100%) contrast(0.5) brightness(1.3);
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%) contrast(1) brightness(1);
    opacity: 1;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    height: 30px;
    max-width: 100px;
  }
`;

/* ================== Composant ================== */
const Temoignage = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const fallback =
    imagess?.moussakaba ||
    imagess?.paul ||
    imagess?.abdoulayeavoc ||
    imagess?.businesskey3 ||
    "/placeholder.jpg";

  // Si tu ajoutes des logos dans imagess (ex: enabel_logo…), ils s’afficheront automatiquement
  const companyLogos = [
    imagess?.enabel_logo,
    imagess?.gpc_logo,
    imagess?.orange_logo,
    imagess?.sobragui_logo,
    imagess?.gavalan_logo,
  ].filter(Boolean);

  // >>> Témoignages orientés immobilier (Semyg)
  const testimonials = [
    {
      author: "N. Kourouma",
      role: "Investisseur résidentiel",
      text:
        "Semyg a sécurisé notre opération de A à Z : étude de faisabilité, montage juridique et suivi chantier. Délais tenus, budget maîtrisé, et une commercialisation fluide — on a dépassé le taux de pré‑réservation attendu.",
      image: imagess?.naroumb || imagess?.chàntier4 || fallback,
    },
    {
      author: "A. O. Diallo",
      role: "Directeur – Asset Management",
      text:
        "Leur reporting est d’une clarté rare : cash‑flows, avancement, risques HSE — tout est piloté. Les arbitrages proposés par Semyg ont amélioré le rendement locatif de 1,8 point en 6 mois.",
      image: imagess?.àlphà || imagess?.bàtimentecole || fallback,
    },
    {
      author: "P. Lamah",
      role: "Maîtrise d’ouvrage déléguée",
      text:
        "La coordination technique a été irréprochable : choix des matériaux, contrôle qualité, et conformité réglementaire. Résultat : réception sans réserve et coûts d’exploitation optimisés.",
      image: imagess?.paul || imagess?.chàntier7 || fallback,
    },
    {
      author: "M. A. Bah",
      role: "Partenaire bancaire",
      text:
        "Dossiers structurés, garanties solides et visibilité sur la commercialisation : Semyg nous apporte des projets bancables avec des risques parfaitement cadrés.",
      image: imagess?.abdoulayeavoc || imagess?.bàtimentmosk2 || fallback,
    },
  ];

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isDragging]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: direction > 0 ? 20 : -20,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        rotateY: { duration: 0.6 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: direction < 0 ? 20 : -20,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        rotateY: { duration: 0.6 },
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <TestimonialContainer ref={containerRef}>
      <Header
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Title>
          Ce que disent nos clients & partenaires
          <motion.span
            className="barre-animation"
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </Title>
        <Subtitle>
          Promotion, investissement, gestion d’actifs : Semyg transforme le potentiel en valeur durable.
          Découvrez des retours concrets sur notre exigence opérationnelle, notre transparence et nos résultats.
        </Subtitle>
      </Header>

      <Stage>
        <AnimatePresence mode="wait" custom={direction}>
          <TestimonialContent
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, { offset, velocity }) => {
              setIsDragging(false);
              const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500;
              if (swipe) {
                offset.x > 0 || velocity.x > 0 ? handlePrev() : handleNext();
              }
            }}
          >
            <AuthorImage
              src={testimonials[current].image}
              alt={testimonials[current].author}
              loading="lazy"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />

            <QuoteContainer initial="hidden" animate="visible" variants={quoteVariants}>
              <Quote>
                <FaQuoteLeft />
                {testimonials[current].text}
                <FaQuoteRight />
              </Quote>

              <AuthorInfo>
                {testimonials[current].author}
                <span>{testimonials[current].role}</span>
              </AuthorInfo>
            </QuoteContainer>
          </TestimonialContent>
        </AnimatePresence>

        <Controls>
          <NavButton onClick={handlePrev} aria-label="Précédent">
            <ChevronLeft />
          </NavButton>
          <NavButton onClick={handleNext} aria-label="Suivant">
            <ChevronRight />
          </NavButton>
        </Controls>
      </Stage>

      <DotsContainer>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            $active={index === current}
            onClick={() => goToTestimonial(index)}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </DotsContainer>

      {companyLogos.length > 0 && (
        <CompanyLogos>
          {companyLogos.map((logo, index) => (
            <CompanyLogo
              key={index}
              src={logo}
              alt={`Client ${index + 1}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{
                opacity: 0.8,
                y: 0,
                transition: { delay: 0.1 * index, duration: 0.5 },
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            />
          ))}
        </CompanyLogos>
      )}
    </TestimonialContainer>
  );
};

export default Temoignage;
