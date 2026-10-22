import "./CircularMenu.css";

// 7 иконок для 7 разделов
const ICONS = ["👤", "⚙️", "💼", "🎓", "🤖", "💻", "✉️"];

export default function CircularMenu({ sections, activeIndex, onSelect, disabled, isUfoActive, toggleUfo }) {
  const radius = 110; // Радиус круга

  return (
    <aside className="menu-wrap">
      <div className="menu-circle">
        {/* Кнопка вызова НЛО в центре */}
        <div 
          className={`menu-center ${isUfoActive ? "ufo-active" : ""}`} 
          onClick={toggleUfo}
          title={isUfoActive ? "Убрать НЛО" : "Вызвать НЛО"}
        >
          <span>{isUfoActive ? "✖" : "🛸"}</span>
        </div>
        
        {sections.map((s, i) => {
          // Полный круг: 360 градусов
          const angle = (360 / sections.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isActive = i === activeIndex;
          
          return (
            <button
              key={s.id}
              className={`menu-item ${isActive ? "active" : ""}`}
              style={{ 
                "--x": `${x}px`, 
                "--y": `${y}px`,
                transform: `translate(${x}px, ${y}px)` 
              }}
              onClick={() => {
                 if(isUfoActive) toggleUfo();
                 onSelect(i);
              }}
              disabled={disabled}
            >
              {ICONS[i] || "•"}
              <span className="label">{s.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}