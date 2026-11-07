# Fluidez da rolagem e composição

Correção autorizada em 6 de novembro de 2026, base develop e0c0b1a823efaa0b210b37c718e1e97d6f5e6a83. Preservados header transparente, contatos confirmados, marca, fontes e fotografias, entrada/reload, limpeza de hash, fio reversível e leituras da peça.

## Diagnóstico e mudança

Fato reproduzido em 1100 × 936: hero com foto absolute começava em x473, título terminava em x543,59. Havia sobreposição horizontal de 70,59px na mesma altura. Grid real de duas colunas substitui posicionamento absoluto. Após correção, título termina em x480,69 e foto começa em x524,69, intervalo de 44px.

Os pins anteriores alternavam posição gerenciada pelo ScrollTrigger e dependiam de spacers inseridos em runtime. A transição da peça também disparava setDetail por terços, CSS crossfade e efeito React de entrada de texto/imagem. Esses mecanismos podiam competir. Agora wrappers estáveis de 340svh e 250svh fornecem distância; position:sticky mantém a cena visível em 100svh sem alternar para fixed. GSAP controla apenas scrub e desenho interno.

Peça usa três fotos e três descrições montadas, timeline contínua com intervalos de leitura e faixas de crossfade de 12% do progresso. Removido efeito React concorrente. Estado React acompanha apenas acessibilidade/seleção dos botões. Botões levam ao trecho correspondente; id #peca pertence ao wrapper para destino estável. Viewports estreitas/curtas e movimento reduzido continuam em fluxo sem sticky prolongado.

Lenis passa de 0,85s para 1,2s, easing quartic de desaceleração, sem suavização de toque. Segue integração local documentada: lenis.on(scroll, ScrollTrigger.update), raf no ticker GSAP e lagSmoothing(0). Refresh após fontes/load recalcula Lenis antes de ScrollTrigger. Não há captura permanente da roda ou bloqueio para alcançar o fim.

## Evidência Chromium real

- Matriz 1100/1200/1440/1664 × 768/900/1005: 12 viewports sem overflow horizontal nem interseção entre texto/foto da hero, peça, rua e matéria.
- Viewport 1100 ×936: cena mede 936px. Na entrada, top da peça8→4→0→0; saída0→0→0→-3,61→-7,61 para incrementos de 4px. Fio segue o mesmo comportamento. Position computada continua sticky nas fronteiras; não há salto para fixed.
- Crossfade em progressos0,15/0,33/0,5/0,67/0,85: opacidades1/0/0;0,5007/0,4993/0;0/1/0;0/0,4993/0,5007;0/0/1. Reverso repetiu os mesmos valores em0,67 e0,33. Descrições e fotos coincidem.
- Roda 180px: scrollY16/48/108/169/180 aos16/76/226/576/1276ms, chegada progressiva ao destino sem salto instantâneo.
- Anchor peça: scrollY1772, wrappertop100, hash vazio e query ?fluid=1 preservada.
- Resize para 390 ×844: position static, wrapper e cena 1289px, overflow 0. Conteúdo continua acessível em fluxo.
- Zero erros de página no percurso instrumentado. Controlador aprovou composição 1100 ×936 e entrada/saída/reverso das duas cenas.

Capturas atuais em docs/evidence-fluidity: hero nas quatro larguras, viewport 1100 ×936 e crossfade intermediário. Não foram incorporadas imagens externas.

## Verificação e limites

Lint, tipos e build passaram. Diff sem erros. CI do SHA publicado e merges registrados nos corpos das PRs/release e entrega final. Produção Vercel é conferida separadamente após main. Sem verificação em aparelho físico, leitor de tela, Safari/Firefox ou hardware modesto; estas medições não são um benchmark completo de desempenho.
