import { useState, useCallback, useEffect } from "react";
import CircularMenu from "./components/CircularMenu";
import SectionViewer from "./components/SectionViewer";
import Ufo from "./components/Ufo";
import "./styles/global.css";

const Particles = () => {
  return (
    <div className="particles-bg">
      {[...Array(15)].map((_, i) => (
        <div key={i} className={`particle particle-${i + 1}`}></div>
      ))}
    </div>
  );
};

export const SECTIONS = [
  { id: "about",      label: "Обо мне" },
  { id: "skills",     label: "Навыки" },
  { id: "experience", label: "Опыт" },
  { id: "education",  label: "Образование" },
  { id: "master",     label: "Магистерский диплом" }, // <--- Новая вкладка
  { id: "diploma",    label: "Другие проекты" },      // <--- Переименовали (сюда войдет сайт)
  { id: "contact",    label: "Контакты" },
];
export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUfoActive, setIsUfoActive] = useState(false);

  const handleSelect = useCallback((newIndex) => {
    if (isAnimating || newIndex === activeIndex) return;

    const diff = newIndex - activeIndex;
    const forward = Math.abs(diff) <= SECTIONS.length / 2 ? diff > 0 : diff < 0;
    setDirection(forward ? 1 : -1);
    setIsAnimating(true);

    // Задержка 600мс для анимации барабана
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 600);
    }, 600);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleSelect((activeIndex + 1) % SECTIONS.length);
      if (e.key === "ArrowLeft")  handleSelect((activeIndex - 1 + SECTIONS.length) % SECTIONS.length);
      if (e.key === "Escape") setIsUfoActive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, handleSelect]);

  return (
    <div className="app">
      <Particles />
      
      <CircularMenu
        sections={SECTIONS}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        disabled={isAnimating}
        isUfoActive={isUfoActive}
        toggleUfo={() => setIsUfoActive(!isUfoActive)}
      />
      
      <SectionViewer
        activeIndex={activeIndex}
        direction={direction}
        isAnimating={isAnimating}
        isUfoActive={isUfoActive}
      />

      <Ufo isActive={isUfoActive} />
    </div>
  );
}