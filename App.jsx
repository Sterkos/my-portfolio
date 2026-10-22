import { useState, useCallback } from "react";
import CircularMenu from "./components/CircularMenu";
import SectionViewer from "./components/SectionViewer";
import "./styles/global.css";

export const SECTIONS = [
  { id: "about",      label: "Обо мне" },
  { id: "skills",     label: "Навыки" },
  { id: "experience", label: "Опыт" },
  { id: "education",  label: "Образование" },
  { id: "diploma",    label: "Диплом" },
  { id: "contact",    label: "Контакты" },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = вперёд, -1 = назад
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = useCallback((newIndex) => {
    if (isAnimating || newIndex === activeIndex) return;

    // Определяем направление поворота: короче ли вперёд или назад
    const diff = newIndex - activeIndex;
    const forward = Math.abs(diff) <= SECTIONS.length / 2 ? diff > 0 : diff < 0;
    setDirection(forward ? 1 : -1);
    setIsAnimating(true);

    // 1 фаза — уводим текущий раздел (400 мс), затем меняем контент
    setTimeout(() => {
      setActiveIndex(newIndex);
      // 2 фаза — вводим новый (400 мс), затем снимаем блокировку
      setTimeout(() => setIsAnimating(false), 400);
    }, 400);
  }, [activeIndex, isAnimating]);

  return (
    <div className="app">
      <CircularMenu
        sections={SECTIONS}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        disabled={isAnimating}
      />
      <SectionViewer
        activeIndex={activeIndex}
        direction={direction}
        isAnimating={isAnimating}
      />
    </div>
  );
}