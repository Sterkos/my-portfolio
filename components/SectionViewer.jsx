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

  useEffect(() => {
    if (isAnimating) {
      // Фаза "out" начинается, когда родитель запустил анимацию
      setPhase("out");
    } else if (prevIndexRef.current !== activeIndex) {
      // пришёл новый activeIndex — запускаем "in"
      prevIndexRef.current = activeIndex;
      setPhase("in");
      const t = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(t);
    }
  }, [activeIndex, isAnimating]);

  // Когда родитель сообщает isAnimating=true — играем "out"
  useEffect(() => {
    if (isAnimating) {
      setPhase("out");
    } else if (phase === "out") {
      setPhase("in");
      const t = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(t);
    }
  }, [isAnimating]); // eslint-disable-line

  const Active = COMPONENTS[activeIndex];

  return (
    <main className="viewer-wrap">
      <div className="viewer-perspective">
        <div className={`viewer-stage phase-${phase} dir-${direction}`}>
          <Active />
        </div>
      </div>
    </main>
  );
}