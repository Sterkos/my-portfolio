import { about } from "../../data/resumeData";
import "./Sections.css";

export default function AboutSection() {
  return (
    <article className="section-card">
      <h2>Обо мне</h2>
      <p className="muted" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>{about}</p>
    </article>
  );
}