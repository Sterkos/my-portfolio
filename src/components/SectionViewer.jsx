import { useEffect, useRef, useState } from "react";
import "./SectionViewer.css";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import MasterSection from "./sections/MasterSection"; // <--- ВАЖНО
import DiplomaSection from "./sections/DiplomaSection";
import ContactSection from "./sections/ContactSection";

const COMPONENTS = [
  AboutSection, 
  SkillsSection, 
  ExperienceSection, 
  EducationSection, 
  MasterSection, // <--- 5-й элемент
  DiplomaSection, 
  ContactSection,
];

export default function SectionViewer({ activeIndex, direction, isAnimating, isUfoActive }) {
  const [phase, setPhase] = useState("idle");
  const prevIndexRef = useRef(activeIndex);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isAnimating && phase !== "out") {
      const timer = setTimeout(() => setPhase("out"), 0);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, phase]);

  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      prevIndexRef.current = activeIndex;
      setPhase("in");
      const timer = setTimeout(() => setPhase("idle"), 600);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isAnimating) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const intensity = isUfoActive ? 4 : 10;
    const rotateX = -(y / rect.height) * intensity;
    const rotateY = (x / rect.width) * intensity;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  const ActiveComponent = COMPONENTS[activeIndex];

  return (
    <main className="viewer-wrap">
      <div className="viewer-perspective">
        <div className={`viewer-stage phase-${phase} dir-${direction}`}>
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`parallax-card ${isUfoActive ? "card-scanned" : ""}`}
          >
            {ActiveComponent ? <ActiveComponent /> : <div>Раздел не найден</div>}
          </div>
        </div>
      </div>
    </main>
  );
}