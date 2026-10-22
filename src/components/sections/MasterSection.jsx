import { masterDiploma as p } from "../../data/resumeData";
import "./Sections.css";

export default function MasterSection() {
  return (
    <article className="section-card">
      <h2>Магистерская диссертация</h2>
      <div className="diploma-head">
        <h3>{p.title}</h3>
        <span className="year">{p.year}</span>
      </div>
      <p className="muted">{p.summary}</p>
      
      <h4>Технологии и железо</h4>
      <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
      
      <h4>Ключевые задачи</h4>
      <ul className="list">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
      
      <h4>Архитектура</h4>
      <p className="muted">{p.architecture}</p>
      
      <h4>Текущий статус</h4>
      <ul className="list">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
    </article>
  );
}