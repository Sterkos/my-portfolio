import { skills } from "../../data/resumeData";
import "./Sections.css";

export default function SkillsSection() {
  return (
    <article className="section-card">
      <h2>Навыки</h2>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {skills.map((group) => (
          <div key={group.category}>
            <h3>{group.category}</h3>
            <ul className="tags" style={{ marginTop: 12 }}>
              {group.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}