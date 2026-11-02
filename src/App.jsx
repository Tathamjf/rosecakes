import { useState, useEffect } from "react";
import "./App.css";

// ====== EDITE AQUI ======
const BRAND = "Rose Cake";
const WHATSAPP = "5511999999999"; // DDI + DDD + número, só dígitos
const INSTAGRAM = "https://instagram.com/";
const wa = (msg = `Olá! Vi o site da ${BRAND} e gostaria de um orçamento.`) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// Fotos: exporte do Figma e salve em /public/images com estes nomes.
// Se o arquivo não existir, aparece um degradê no lugar.
const BASE = import.meta.env.BASE_URL;
const img = (f) => `url(${BASE}images/${f})`;
const photo = (f, a = "#ead9cc", b = "#c9a892") => ({
  backgroundImage: `${img(f)}, linear-gradient(135deg, ${a}, ${b})`,
});
const sweetBg = (f, tone) => ({
  backgroundImage: `${img(f)}, radial-gradient(circle, ${tone} 0 36%, #fbe6da 38%, #f6d8c8)`,
});

const LINKS = [
  ["Início", "inicio"], ["Doces", "doces"], ["Eventos", "eventos"],
  ["Galeria", "galeria"], ["Depoimentos", "depoimentos"], ["Contato", "contato"],
];

const SWEETS = [
  { name: "Brigadeiro Tradicional", file: "doce-1.png", tone: "#4a2418" },
  { name: "Brigadeiro Gourmet", file: "doce-2.png", tone: "#5a3020" },
  { name: "Beijinho", file: "doce-3.png", tone: "#f6ecdc" },
  { name: "Bombom Personalizado", file: "doce-4.png", tone: "#3b2218" },
  { name: "Macaron", file: "doce-5.png", tone: "#e5578a" },
  { name: "Cones Trufados", file: "doce-6.png", tone: "#6b3a28" },
];

const CARDS = [
  { title: "Casamentos dos sonhos", file: "card-casamentos.jpg", btn: "Descubra",
    text: "Mesas de doces, bem-casados e lembrancinhas feitos à mão, no estilo do seu grande dia." },
  { title: "Eventos e celebrações", file: "card-eventos.jpg", btn: "Fale conosco",
    text: "Aniversários, noivados e eventos corporativos com doces finos e personalizados." },
];

const TESTIMONIALS = [
  { text: "Os doces foram o assunto da festa. Delicados, saborosos e a mesa ficou um sonho.", who: "Mariana & Pedro" },
  { text: "Atendimento impecável do orçamento até a entrega. Superou todas as expectativas.", who: "Camila R." },
  { text: "Contratamos para o evento da empresa e todos pediram o contato. Qualidade de alta confeitaria.", who: "Fernanda L." },
];

const HeartLine = ({ className }) => (
  <svg className={className} viewBox="0 0 520 90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path pathLength="1" d="M0 30C90 82 220 86 318 50c24-9 28-14 28-18" />
    <path pathLength="1" d="M346 36C331 24 332 10 341 9c3 0 5 2 5 4 0-2 2-4 5-4 9 1 10 15-5 27z" />
  </svg>
);

const Petals = ({ n = 10 }) => (
  <div className="petals" aria-hidden="true">
    {Array.from({ length: n }, (_, i) => (
      <span key={i} style={{ left: `${(i * 97) % 100}%`, "--s": `${8 + (i % 4) * 4}px`, "--t": `${9 + (i % 5) * 2}s`, "--pd": `${-i * 1.7}s` }} />
    ))}
  </div>
);

const WaIcon = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16 3a13 13 0 0 0-11.1 19.7L3 29l6.5-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-3.900-.6-5.500-1.600l-.4-.2-3.800 1 1-3.700-.3-.4A10.700 10.700 0 1 1 16 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200s-.8 1-1 1.200c-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.6c.2-.2.200-.3.300-.5.100-.2.100-.4 0-.6l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400-.3.300-1.200 1.200-1.200 2.900s1.200 3.400 1.400 3.600c.2.200 2.400 3.700 5.800 5.100 2.100.9 2.900.9 3.900.8.600-.1 1.900-.8 2.200-1.500.3-.8.300-1.400.2-1.500-.1-.2-.3-.2-.6-.4z" />
  </svg>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [light, setLight] = useState(null); // índice da foto aberta na galeria

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  // animações ao rolar: adiciona a classe "in" quando o elemento aparece
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal, .watch").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // lightbox: Esc fecha, setas navegam
  useEffect(() => {
    if (light === null) return;
    const k = (e) => {
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") setLight((i) => (i + 1) % 6);
      if (e.key === "ArrowLeft") setLight((i) => (i + 5) % 6);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [light]);

  const go = (d) => setT((t + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav--solid" : ""}`}>
        {/* Para usar seu logo: <a className="logo"><img src={`${BASE}images/logo.png`} alt={BRAND} /></a> */}
        <a href="#inicio" className="logo">{BRAND}</a>
        <button className="burger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={`links ${open ? "links--open" : ""}`}>
          {LINKS.map(([l, id]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a className="btn btn--sm" href={wa()} target="_blank" rel="noreferrer"><WaIcon /> Fale Conosco</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <Petals />
          <div className="hero__text">
            <h1>Doces que tornam seus momentos ainda mais <em>especiais</em></h1>
            <p>Confeitaria artesanal para casamentos, eventos e celebrações inesquecíveis.</p>
            <a className="btn" href="#doces">Conheça nossos doces <span aria-hidden="true">›</span></a>
          </div>
          <div className="hero__img" style={photo("hero.jpg", "#6b3a28", "#2e1710")} role="img" aria-label="Brigadeiros gourmet" />
          <HeartLine className="hero__line" />
        </section>

        <section id="doces" className="section">
          <div className="heading reveal"><h2>Nossos Doces</h2></div>
          <p className="sub reveal">Delicadeza em cada detalhe, do clássico ao sofisticado.</p>
          <ul className="sweets">
            {SWEETS.map((s, i) => (
              <li key={s.name} className="reveal" style={{ "--d": `${i * 90}ms` }}>
                <a href={wa(`Olá! Quero saber mais sobre o ${s.name}.`)} target="_blank" rel="noreferrer">
                  <div className="sweet__img" style={sweetBg(s.file, s.tone)} role="img" aria-label={s.name} />
                  <span>{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="galeria" className="section">
          <div className="gallery">
            <div className="g-intro reveal">
              <h2>Nossa galeria de eventos!</h2>
              <p>tenha o seu sonho realizado também, sempre com aquele carinho doce</p>
            </div>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} className={`g g${n} reveal`} style={{ ...photo(`galeria-${n}.jpg`, "#e9e9e9", "#d6d6d6"), "--d": `${n * 100}ms` }} aria-label={`Ampliar foto do evento ${n}`} onClick={() => setLight(n - 1)} />
            ))}
          </div>
        </section>

        <section id="eventos" className="soft">
          <h2 className="title-up reveal">O doce perfeito para cada celebração</h2>
          <div className="cards">
            {CARDS.map((c, i) => (
              <article key={c.title} className="card reveal" style={{ "--d": `${i * 150}ms` }}>
                <div className="card__img" style={photo(c.file, "#e8d8cb", "#b9917b")} role="img" aria-label={c.title} />
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a className="mini" href={wa()} target="_blank" rel="noreferrer">— {c.btn}</a>
              </article>
            ))}
          </div>
        </section>

        <section id="depoimentos" className="soft soft--end">
          <small>O que dizem sobre nós</small>
          <div className="testi reveal">
            <button aria-label="Anterior" onClick={() => go(-1)}>‹</button>
            <blockquote key={t}>
              <span className="stars" aria-label="5 estrelas">★★★★★</span>
              “{TESTIMONIALS[t].text}”
              <cite>— {TESTIMONIALS[t].who}</cite>
            </blockquote>
            <button aria-label="Próximo" onClick={() => go(1)}>›</button>
          </div>
          <div className="dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={i === t ? "on" : ""} aria-label={`Depoimento ${i + 1}`} onClick={() => setT(i)} />
            ))}
          </div>
        </section>

        <section
          id="contato"
          className="cta watch"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(74,38,24,.3), rgba(74,38,24,.86) 42%), ${img("cta.jpg")}, linear-gradient(135deg, #8a5a45, #4a2618)` }}
        >
          <Petals n={8} />
          <h2>Vamos adoçar o seu grande dia?</h2>
          <p>Entre em contato e solicite um orçamento personalizado.</p>
          <a className="btn btn--white pulse" href={wa()} target="_blank" rel="noreferrer"><WaIcon /> Falar no WhatsApp</a>
          <HeartLine className="cta__line" />
        </section>
      </main>

      {light !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLight(null)}>
          <button className="lb-x" aria-label="Fechar">×</button>
          <button className="lb-a" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setLight((light + 5) % 6); }}>‹</button>
          <div className="lb-img" style={photo(`galeria-${light + 1}.jpg`, "#e9e9e9", "#d6d6d6")} onClick={(e) => e.stopPropagation()} />
          <button className="lb-b" aria-label="Próxima" onClick={(e) => { e.stopPropagation(); setLight((light + 1) % 6); }}>›</button>
        </div>
      )}

      <footer className="footer">
        <a href="#inicio" className="logo logo--sm">{BRAND}</a>
        <nav>
          <a href="#inicio">Início</a>
          <a href="#eventos">Casamentos</a>
          <a href="#doces">Doces</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="footer__right">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
          <span>São Paulo - SP</span>
        </div>
      </footer>
    </>
  );
}