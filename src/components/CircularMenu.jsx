import "./CircularMenu.css";

export default function CircularMenu({ sections, activeIndex, onSelect, disabled }) {
  const radius = 110; // радиус окружности в px

  return (
    <aside className="menu-wrap">
      <div className="menu-circle">
        <div className="menu-center">
          <span>{"<dev />"}</span>
        </div>
        {sections.map((s, i) => {
          const angle = (360 / sections.length) * i - 90; // начинаем сверху
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isActive = i === activeIndex;
          return (
            <button
              key={s.id}
              className={`menu-item ${isActive ? "active" : ""}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => onSelect(i)}
              disabled={disabled}
              title={s.label}
            >
              <span className="dot" />
              <span className="label">{s.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}