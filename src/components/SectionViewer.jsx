import { useEffect, useRef, useState } from "react";
import "./SectionViewer.css";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import DiplomaSection from "./sections/DiplomaSection";
import ContactSection from "./sections/ContactSection";

const COMPONENTS = [
  AboutSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  DiplomaSection,
  ContactSection,
];

export default function SectionViewer({ activeIndex, direction, isAnimating }) {
  const [phase, setPhase] = useState("idle"); // idle | out | in
  const prevIndexRef = useRef(activeIndex);

  // 1. Когда родитель запускает анимацию, начинаем фазу "out" (уход)
  // Добавили проверку, чтобы не вызывать setState без надобности
  useEffect(() => {
    if (isAnimating && phase !== "out") {
      setPhase("out");
    }
  }, [isAnimating, phase]);

  // 2. Когда activeIndex меняется (родитель сменил вкладку), запускаем фазу "in" (приход)
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      prevIndexRef.current = activeIndex;
      setPhase("in");
      
      const timer = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const ActiveComponent = COMPONENTS[activeIndex];

  return (
    <main className="viewer-wrap">
      <div className="viewer-perspective">
        <div className={`viewer-stage phase-${phase} dir-${direction}`}>
          <ActiveComponent />
        </div>
      </div>
    </main>
  );
}