'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';

const Bag = dynamic(() => import('./bag').then((module) => module.Bag), { ssr: false });
const chapters = [
  { name: 'Peça inteira', title: 'Da rua\npro ponto.', copy: 'Uma bolsa transversal em jeans. Role para ver como a peça muda de lado.' },
  { name: 'Perfil e alça', title: 'De outro\nângulo.', copy: 'A volta revela o volume, a alça e o bolso que muda a silhueta.' },
  { name: 'Detalhe', title: 'Olha\no ponto.', copy: 'A câmera chega perto da trama. A linha segue pela borda da peça.' },
];

export default function Home() {
  const stage = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const reduced = useReducedMotion() === true;
  const current = chapters[chapter];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = stage.current;
    if (!element || reduced) return;
    const lenis = new Lenis({ smoothWheel: true, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const position = { value: 0 };
    let active = 0;
    const context = gsap.context(() => {
      gsap.to(position, {
        value: 1, ease: 'none',
        onUpdate() {
          progress.current = position.value;
          element.style.setProperty('--progress', String(position.value));
          const next = Math.min(2, Math.floor(position.value * 3));
          if (next !== active) { active = next; setChapter(next); }
        },
        scrollTrigger: { trigger: element, start: 'top top', end: 'bottom bottom', scrub: .25 },
      });
      gsap.fromTo('.thread-path', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '#fio', start: 'top 85%', end: 'bottom 55%', scrub: true },
      });
    });
    return () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);

  function choose(index: number) {
    if (reduced) {
      progress.current = index / 2;
      setChapter(index);
      return;
    }
    const element = stage.current;
    if (!element) return;
    const top = window.scrollY + element.getBoundingClientRect().top;
    window.scrollTo({ top: top + (element.offsetHeight - window.innerHeight) * [0, .51, .96][index], behavior: 'instant' });
  }

  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#caio">Pular para a história</a>
    <header className="header">
      <a className="brand" href="#peca"><Image src="/desvio.svg" alt="" width={35} height={35} /> SaiDaReta</a>
      <nav aria-label="Navegação principal"><a href="#peca">A peça</a><a href="#caio">Caio</a><a href="#rua">A rua</a></nav>
    </header>
    <main>
      <section className="stage" id="peca" ref={stage}>
        <div className="sticky">
          <div className="intro">
            <span className="eyebrow">Estudo 01 <span>/</span> Bolsa transversal</span>
            <motion.div key={chapter} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .27 }}>
              {chapter === 0 ? <h1>{current.title}</h1> : <p className="headline">{current.title}</p>}
              <p className="lede">{current.copy}</p>
            </motion.div>
            <div className="views" aria-label="Vistas da peça">{chapters.map((item, index) =>
              <button type="button" key={item.name} aria-pressed={chapter === index} onClick={() => choose(index)}>{item.name}</button>
            )}</div>
          </div>
          <div className="showcase">
            <span className="index">0{chapter + 1} / 03</span>
            <div className="model-fallback"><Image src="/bolsa.svg" alt="Ilustração da bolsa transversal" fill sizes="(max-width: 720px) 90vw, 50vw" priority /></div>
            <Bag progress={progress} reduced={reduced} />
            <div className="meter" aria-hidden="true"><span /></div>
            <p className="caption">Estudo 3D inspirado no acervo</p>
          </div>
        </div>
      </section>
      <section id="fio" className="thread">
        <svg viewBox="0 0 1200 360" aria-hidden="true" preserveAspectRatio="none">
          <path className="thread-path" pathLength="1" d="M-30 60 C380 60 405 68 480 163 S650 293 1230 293" />
        </svg>
        <p>A linha sai da máquina.<br />A rua continua.</p>
      </section>
      <section className="story" id="caio">
        <div className="story-image"><Image src="/bancada.jpg" alt="Recortes de tecido junto à máquina de costura" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
        <div className="story-copy"><span className="eyebrow">Quem costura</span><h2>Caio<br />Xavier.</h2><p>Costura, skate e rua atravessam o trabalho de Caio. Na bancada, tecido, linha e recortes mostram como as peças começam.</p></div>
      </section>
      <section className="street" id="rua">
        <div><span className="eyebrow">Fora da bancada</span><h2>Peça<br />na rua.</h2><p>Um espaço para olhar as peças de perto e acompanhar o que sai da máquina.</p></div>
        <div className="street-image"><Image src="/trama.jpg" alt="Detalhe de um tecido vermelho e claro do acervo" fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
      </section>
    </main>
    <footer><strong>SaiDaReta</strong><a href="#peca">Voltar ao começo ↑</a></footer>
  </MotionConfig>;
}

