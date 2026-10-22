import { education } from "../../data/resumeData";
import "./Sections.css";

export default function EducationSection() {
  return (
    <article className="section-card">
      <h2>Образование</h2>
      {education.map((edu, i) => (
        <div key={i}>
          <div className="diploma-head">
            <h3>{edu.institution}</h3>
            <span className="year">{edu.period}</span>
          </div>
          <p>{edu.degree}</p>
          <p className="muted" style={{ marginTop: 8 }}>{edu.description}</p>
        </div>
      ))}
    </article>
  );
}