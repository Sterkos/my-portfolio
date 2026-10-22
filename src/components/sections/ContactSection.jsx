import { personalInfo } from "../../data/resumeData";
import "./Sections.css";

export default function ContactSection() {
  // Массив с контактами для удобного вывода
  const contacts = [
    { icon: "📍", label: "Локация", value: personalInfo.location, href: null },
    { icon: "📞", label: "Телефон", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}` },
    { icon: "✉️", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: "💻", label: "GitHub", value: "saumon3808-cmyk", href: personalInfo.github },
  ];

  return (
    <article className="section-card">
      <h2>Контакты</h2>
      <p className="muted" style={{ marginBottom: "32px", fontSize: "1.1rem" }}>
        Открыт к предложениям о работе, стажировках и интересным проектам в сфере разработки или автоматизации. Давайте созвонимся или спишемся!
      </p>
      
      {/* Сетка контактов */}
      <div className="contacts-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
        gap: "16px" 
      }}>
        {contacts.map((contact, index) => {
          // Если есть ссылка, делаем карточку кликабельной
          const CardWrapper = contact.href ? "a" : "div";
          
          return (
            <CardWrapper 
              key={index}
              href={contact.href}
              target={contact.href?.startsWith("http") ? "_blank" : undefined}
              rel={contact.href?.startsWith("http") ? "noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 20px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                transition: "all 0.3s ease",
                textDecoration: "none",
                color: "inherit",
                cursor: contact.href ? "pointer" : "default"
              }}
              // Эффект при наведении (через inline-стили для простоты)
              onMouseEnter={(e) => {
                if (contact.href) {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 4px 20px var(--accent-glow)";
                  e.currentTarget.style.background = "rgba(16, 185, 129, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (contact.href) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }
              }}
            >
              <div style={{ 
                fontSize: "1.5rem", 
                background: "var(--bg)", 
                padding: "12px", 
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border)"
              }}>
                {contact.icon}
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                  {contact.label}
                </div>
                <div style={{ fontWeight: "600", fontSize: "1.05rem", color: contact.href ? "var(--text)" : "var(--muted)" }}>
                  {contact.value}
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Кнопка призыва к действию */}
      <div className="actions" style={{ marginTop: "40px", justifyContent: "center" }}>
        <a className="btn" href={`mailto:${personalInfo.email}`} style={{ width: "100%", maxWidth: "300px", fontSize: "1.1rem" }}>
          Написать мне
        </a>
      </div>
    </article>
  );
}