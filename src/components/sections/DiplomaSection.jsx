import { webProject as p } from "../../data/resumeData"; // <--- Исправлено на webProject
import "./Sections.css";

export default function DiplomaSection() {
  return (
    <article className="section-card">
      <h2>Другие проекты</h2>
      <div className="diploma-head">
        <h3>{p.title}</h3>
      </div>
      <p className="muted">{p.summary}</p>
      
      <h4>Стек технологий</h4>
      <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
      
      <h4>Ключевые особенности</h4>
      <ul className="list">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
      
      <h4>Архитектура</h4>
      <p className="muted">{p.architecture}</p>
      
      <h4>Результаты</h4>
      <ul className="list">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
      
      <div className="actions">
        <a className="btn" href={p.github} target="_blank" rel="noreferrer">Посмотреть на GitHub</a>
      </div>
    </article>
  );
}