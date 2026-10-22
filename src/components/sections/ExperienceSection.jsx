import { experience } from "../../data/resumeData";
import "./Sections.css";

export default function ExperienceSection() {
  return (
    <article className="section-card">
      <h2>Опыт работы</h2>
      {experience.map((job, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div className="diploma-head">
            <h3>{job.position} — {job.company}</h3>
            <span className="year">{job.period}</span>
          </div>
          <ul className="list">
            {job.description.map((d, j) => <li key={j}>{d}</li>)}
          </ul>
        </div>
      ))}
    </article>
  );
}