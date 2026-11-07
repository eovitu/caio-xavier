"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  ["#manifesto", "A ideia"],
  ["#peca", "A peça"],
  ["#caio", "O ateliê"],
  ["#rua", "A rua"],
];
const details = [
  {
    name: "A forma",
    title: "Um jeito próprio.",
    text: "Jeans, cordão e uma alça que atravessa o corpo. A peça começa no encontro desses elementos.",
    src: "/peca.jpg",
    alt: "Bolsa jeans suspensa pela alça, com bolso frontal e cordão",
  },
  {
    name: "O fazer",
    title: "De perto, outro olhar.",
    text: "Tecido sobre a mesa. Recorte, dobra, costura. O desenho aparece no jeito de juntar tudo isso.",
    src: "/processo.jpg",
    alt: "Bolsas e tecidos sobre a bancada junto à máquina de costura",
  },
  {
    name: "O caminho",
    title: "Fora da bancada.",
    text: "Na calçada, no encontro, no caminho de volta. A peça ganha outra presença quando encontra a rua.",
    src: "/rua.jpg",
    alt: "Mulher usando bolsa de tecido em uma rua à noite",
  },
];
function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={up ? { transform: "rotate(-90deg)" } : undefined}
    >
      <path d="M3 12h17M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function Photo({
  src,
  alt,
  sizes = "(max-width: 760px) 100vw, 60vw",
}: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  return (
    <div className="photo">
      <Image src={src} alt={alt} fill sizes={sizes} />
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const hashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pieceScroll = useRef<ScrollTrigger | null>(null);
  const smoothScroll = useRef<Lenis | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const detailContent = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [detail, setDetail] = useState(0);
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const panel = curtain.current;
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const reload = navigation?.type === "reload";
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!panel) return;
    panel.dataset.navigation = reload ? "reload" : "entry";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduce) { gsap.set(panel, { display: "none" }); return; }
      const timeline = gsap.timeline({ onComplete: () => { panel.style.display = "none"; } });
      timeline.fromTo(panel.querySelector("img"),
        reload ? { scale: 0.88, opacity: 0.3 } : { y: 35, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.48, ease: "power3.out" })
        .to(panel, { clipPath: reload ? "inset(0 0 0 100%)" : "inset(0 0 100% 0)", duration: 0.65, ease: "expo.inOut" }, 0.4);
    }, panel);
    return () => {
      context.revert();
      history.scrollRestoration = previousRestoration;
      if (hashTimer.current) clearTimeout(hashTimer.current);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    let sceneMedia: gsap.MatchMedia | null = null;
    const lenis = reduced
      ? null
      : new Lenis({ smoothWheel: true, anchors: true, duration: 0.85 });
    smoothScroll.current = lenis;
    const tick = (time: number) => lenis?.raf(time * 1000);
    lenis?.on("scroll", ScrollTrigger.update);
    if (lenis) gsap.ticker.add(tick);
    const context = gsap.context(() => {
      if (reduced) return;
      gsap.from(".hero-image", {
        clipPath: "inset(12% 12% 12% 12%)",
        scale: 1.07,
        duration: 1,
        delay: 0.78,
        ease: "expo.out",
      });
      gsap.from(".hero-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.9,
      });
      gsap.to(".hero-image img", {
        yPercent: 12,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.fromTo(
        ".idea-statement span",
        { opacity: 0.3 },
        {
          opacity: 1,
          stagger: 0.14,
          ease: "none",
          scrollTrigger: {
            trigger: ".idea",
            start: "top 70%",
            end: "center 40%",
            scrub: true,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          duration: 0.95,
          ease: "expo.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((element) => {
        gsap.fromTo(
          element.querySelector("img"),
          { scale: 1.12, yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("main > section .photo").forEach((photo) => {
        gsap.fromTo(photo, { clipPath: "inset(8% 0 8% 0)" }, {
          clipPath: "inset(0% 0 0% 0)", ease: "none",
          scrollTrigger: { trigger: photo.closest("section"), start: "top 95%", end: "top 20%", scrub: 0.4 },
        });
      });
      const media = gsap.matchMedia();
      sceneMedia = media;
      media.add("(min-width: 1001px) and (min-height: 650px)", () => {
        pieceScroll.current = ScrollTrigger.create({
          trigger: ".piece", start: "top top", end: () => `+=${window.innerHeight * 2.4}`,
          pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => setDetail(Math.min(2, Math.floor(self.progress * 3))),
        });
        const stitch = gsap.timeline({ scrollTrigger: {
          trigger: ".thread", start: "top top", end: () => `+=${window.innerHeight * 1.5}`,
          pin: true, pinSpacing: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true,
        } });
        stitch.fromTo(".thread-path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1, ease: "none" })
          .fromTo(".thread h2", { xPercent: -4 }, { xPercent: 4, duration: 1, ease: "none" }, 0);
        return () => { pieceScroll.current = null; };
      });
      media.add("(max-width: 1000px), (max-height: 649px)", () => {
        gsap.fromTo(".thread-path", { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, autoRound: false, ease: "none", scrollTrigger: {
            trigger: ".thread", start: "top 70%", end: "bottom 40%", scrub: 0.4,
          },
        });
      });
      gsap.fromTo(".atelier-thread path", { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, autoRound: false, ease: "none", scrollTrigger: {
          trigger: ".atelier", start: "top 90%", end: "top 10%", scrub: 0.4,
        },
      });
      gsap.fromTo(
        ".street-title",
        { xPercent: 9 },
        {
          xPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: ".street",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        ".footer-emblem",
        { rotation: -22 },
        {
          rotation: 22,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
      gsap.from(".footer-signature", {
        yPercent: 26,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);
    const hero = root.current?.querySelector<HTMLElement>(".hero");
    const photo = root.current?.querySelector<HTMLElement>(".hero-image");
    const xTo =
      !reduced && photo
        ? gsap.quickTo(photo, "x", { duration: 0.6, ease: "power3.out" })
        : null;
    const yTo =
      !reduced && photo
        ? gsap.quickTo(photo, "y", { duration: 0.6, ease: "power3.out" })
        : null;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hero) return;
      const bounds = hero.getBoundingClientRect();
      xTo?.((event.clientX / bounds.width - 0.5) * 16);
      yTo?.(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
    };
    const reset = () => {
      xTo?.(0);
      yTo?.(0);
    };
    hero?.addEventListener("pointermove", move);
    hero?.addEventListener("pointerleave", reset);
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      disposed = true;
      hero?.removeEventListener("pointermove", move);
      hero?.removeEventListener("pointerleave", reset);
      xTo?.tween.kill();
      yTo?.tween.kill();
      if (photo) gsap.set(photo, { clearProps: "x,y" });
      sceneMedia?.revert();
      context.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      smoothScroll.current = null;
      pieceScroll.current = null;
      window.removeEventListener("load", refresh);
    };
  }, [reduced]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const midpoint = header.current ? header.current.getBoundingClientRect().top + header.current.offsetHeight / 2 : 50;
      const scene = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]")).find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= midpoint && bounds.bottom > midpoint;
      });
      if (header.current) header.current.dataset.surface = scene?.dataset.tone || "paper";
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1001px)");
    const reset = () => { if (media.matches) setMenu(false); };
    const outside = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".header")) setMenu(false);
    };
    media.addEventListener("change", reset);
    document.addEventListener("pointerdown", outside);
    return () => { media.removeEventListener("change", reset); document.removeEventListener("pointerdown", outside); };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  useEffect(() => {
    if (reduced || !detailContent.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".detail-image",
        { opacity: 0.2, scale: 1.025 },
        { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        ".detail-description > *",
        { opacity: 0.2, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.015,
          ease: "power2.out",
        },
      );
    }, detailContent);
    return () => context.revert();
  }, [detail, reduced]);

  return (
    <div ref={root} onClickCapture={(event) => {
      const control = (event.target as Element).closest<HTMLElement>("a, button");
      if (!control) return;
      if (control instanceof HTMLAnchorElement && control.getAttribute("href")?.startsWith("#")) {
        if (hashTimer.current) clearTimeout(hashTimer.current);
        hashTimer.current = setTimeout(() => {
          history.replaceState(history.state, "", location.pathname + location.search);
          hashTimer.current = null;
        }, 1000);
      }
      if (reduced) return;
      control.animate([{ scale: "1" }, { scale: "0.96" }, { scale: "1" }], { duration: 240, easing: "cubic-bezier(.16,1,.3,1)" });
    }}>
      <div className="brand-curtain" ref={curtain} aria-hidden="true">
        <Image src="/brand/assinatura.svg" alt="" width={790} height={131} priority />
      </div>
      <a className="skip" href="#manifesto">
        Pular para o conteúdo
      </a>
      <header className="header" ref={header} data-menu={menu}>
        <a className="brand" href="#inicio" aria-label="SaiDaReta, início">
          <Image
            src="/brand/assinatura.svg"
            alt="SaiDaReta"
            width={158}
            height={26}
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
        <a className="contact-button" href="tel:+5511979879591" aria-label="Ligar para Caio Xavier: (11) 97987-9591">
          <span>Contato</span><span className="contact-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 3 3 5-2.3 2.4a15 15 0 0 0 5.9 5.9L16 14l5 3c-.4 3-2.1 4.2-4.3 3.8C10.4 19.7 4.3 13.6 3.2 7.3 2.8 5.1 4 3.4 7 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
        </a>
        <a className="instagram-link" href="https://www.instagram.com/originalvier/" aria-label="Instagram de Caio Xavier, @originalvier" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
        </div>
        <button
          className="menu-button"
          ref={menuButton}
          onClick={() => setMenu(!menu)}
          aria-controls="menu-principal"
          aria-expanded={menu}
        >
          {menu ? "Fechar" : "Menu"}
          <span aria-hidden="true" className="menu-lines">
            <i />
            <i />
          </span>
        </button>
        <AnimatePresence initial={false}>
        {menu && <motion.nav
          key="mobile-navigation"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 12px)", y: reduced ? 0 : -8 }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 12px)", y: 0 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 12px)", y: reduced ? 0 : -6 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="menu-panel"
          data-lenis-prevent
          id="menu-principal"
          aria-label="Menu"
        >
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
              <Arrow />
            </a>
          ))}
        </motion.nav>}
        </AnimatePresence>
      </header>
      <main>
        <section className="hero" id="inicio" data-tone="paper">
          <div className="hero-topline">
            <span>Caio Xavier</span>
            <span>Peças, processos e outras direções.</span>
          </div>
          <div className="hero-image">
            <Image
              src="/campanha.jpg"
              alt="Bolsa jeans SaiDaReta atravessada nas costas na rua à noite"
              fill
              sizes="(max-width: 760px) 100vw, 65vw"
              preload
            />
          </div>
          <div className="hero-copy">
            <h1>
              Costura em
              <br />
              <span>movimento.</span>
            </h1>
            <p>
              Da bancada para a rua.
              <br />O resto é caminho.
            </p>
            <a className="pill-link" href="#peca">
              Explore a peça <Arrow />
            </a>
          </div>
          <div className="hero-bottom">
            <Image src="/brand/emblema.svg" alt="" width={52} height={52} />
            <a href="#manifesto">
              Siga o fio{" "}
              <span className="down-arrow">
                <Arrow />
              </span>
            </a>
            <span>Uma ideia de SaiDaReta.</span>
          </div>
        </section>
        <section className="idea section-pad" id="manifesto" data-tone="paper">
          <div className="section-label">A ideia</div>
          <div className="idea-body">
            <h2 className="idea-statement">
              <span>Uma linha pode seguir</span>{" "}
              <span>mais de um caminho.</span>{" "}
              <span className="accent">O ponto é não seguir a reta.</span>
            </h2>
            <p>
              Recortar. Aproximar. Costurar de novo. Aqui, tecido vira encontro
              entre o que a gente veste e os lugares por onde passa.
            </p>
            <a className="text-link" href="#caio">
              Entre no ateliê <Arrow />
            </a>
          </div>
        </section>
        <section className="piece section-pad" id="peca" data-tone="wine">
          <div className="section-heading" data-reveal>
            <h2>
              Fora do
              <br />
              <em>molde.</em>
            </h2>
            <p>
              O volume, o recorte, a trama.
              <br />O jeito de juntar tudo isso.
            </p>
          </div>
          <div className="detail-layout" ref={detailContent}>
            <div className="detail-image">
              {details.map((item, index) => (
                <div
                  className="detail-frame"
                  key={item.src}
                  data-active={detail === index}
                  aria-hidden={detail !== index}
                >
                  <Photo src={item.src} alt={item.alt} />
                </div>
              ))}
            </div>
            <div className="detail-side">
              <div
                className="detail-tabs"
                role="group"
                aria-label="Explore a peça"
              >
                {details.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={detail === index}
                    onClick={() => {
                      setDetail(index);
                      const timeline = pieceScroll.current;
                      if (timeline) {
                        const target = timeline.start + (timeline.end - timeline.start) * ((index + 0.4) / 3);
                        if (smoothScroll.current) smoothScroll.current.scrollTo(target, { duration: 0.65 });
                        else window.scrollTo({ top: target, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.name}
                    <Arrow />
                  </button>
                ))}
              </div>
              <div className="detail-description" aria-live="polite">
                <h3>{details[detail].title}</h3>
                <p>{details[detail].text}</p>
              </div>
              <span className="detail-note">Um olhar mais perto.</span>
            </div>
          </div>
        </section>
        <section className="thread" data-tone="orange">
          <svg
            viewBox="0 0 1440 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="thread-path"
              pathLength="1"
              strokeDasharray="1 1"
              strokeDashoffset="1"
              d="M-30 300C170 30 340 530 560 240S930 -40 1040 240S1270 470 1470 130"
            />
          </svg>
          <h2 data-reveal>Puxa o fio.</h2>
          <p>Entre a ideia e a rua, tem o fazer.</p>
        </section>
        <section className="atelier section-pad" id="caio" data-tone="paper">
          <svg className="atelier-thread" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" d="M1470 0C1190 40 1350 230 1080 170S850 350 680 400" />
          </svg>
          <div className="section-label">O ateliê</div>
          <div className="atelier-intro" data-reveal>
            <h2>
              Antes
              <br />
              de sair.
            </h2>
            <p>
              Uma mesa, a máquina, tecido por perto. É aqui que a ideia começa a
              ganhar corpo.
            </p>
          </div>
          <div className="atelier-gallery">
            <figure className="work-photo" data-photo>
              <Photo
                src="/processo.jpg"
                alt="Bolsas sobre a bancada ao lado da máquina de costura"
              />
              <figcaption>Da mesa, os primeiros caminhos.</figcaption>
            </figure>
            <figure className="portrait" data-reveal>
              <Photo src="/caio.png" alt="Retrato de Caio Xavier" />
              <figcaption>Caio Xavier.</figcaption>
            </figure>
          </div>
        </section>
        <section className="street" id="rua" data-tone="blue">
          <div className="street-title" aria-hidden="true">
            A rua veste.
          </div>
          <div className="street-layout">
            <div className="street-copy" data-reveal>
              <h2>A rua veste.</h2>
              <p>
                Fora da bancada,
                <br />a peça muda de cenário.
              </p>
              <a className="pill-link" href="#encontro">
                Encontre outros caminhos <Arrow />
              </a>
            </div>
            <div className="street-image" data-photo>
              <Photo
                src="/rua.jpg"
                alt="Mulher usando bolsa de tecido na rua à noite"
              />
            </div>
          </div>
        </section>
        <section className="material section-pad" data-tone="paper">
          <div className="material-photo" data-photo>
            <Photo src="/trama.jpg" alt="Trama e estampa do tecido do acervo" />
          </div>
          <div data-reveal>
            <h2>
              Nenhum caminho
              <br />
              <em>é igual.</em>
            </h2>
            <p>
              Textura, cor e recorte.
              <br />A matéria também escolhe a direção.
            </p>
            <Image src="/brand/emblema.svg" alt="" width={80} height={80} />
          </div>
        </section>
        <section className="people" id="encontro" data-tone="paper">
          <div className="people-caption" data-reveal>
            <h2>Feito pra ir junto.</h2>
            <p>Uma peça. Mais de uma história.</p>
          </div>
          <div className="people-image" data-photo>
            <Photo
              src="/encontro.jpg"
              alt="Pessoas reunidas na rua com uma peça do acervo"
              sizes="100vw"
            />
          </div>
        </section>
      </main>
      <footer className="footer section-pad" data-tone="wine">
        <div className="footer-top">
          <p>O caminho não acaba aqui.</p>
          <a className="text-link" href="#inicio">
            Voltar ao começo <Arrow up />
          </a>
        </div>
        <div className="footer-scene">
          <h2>
            Continua
            <br />
            <em>na rua.</em>
          </h2>
          <Image
            className="footer-emblem"
            src="/brand/emblema.svg"
            alt=""
            width={260}
            height={260}
          />
        </div>
        <div className="footer-wordmark">
          <Image
            className="footer-signature"
            src="/brand/assinatura.svg"
            alt="SaiDaReta"
            width={790}
            height={131}
          />
        </div>
        <div className="footer-bottom">
          <span>Caio Xavier</span>
          <nav aria-label="Navegação do rodapé">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <span>Costura em movimento.</span>
        </div>
      </footer>
    </div>
  );
}
