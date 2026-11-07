# Cenas, entrada e navegação

Correção autorizada em 6 de novembro de 2026, sobre develop cbf4336fc7dba87ccda8ecda038b591ff280e8ee (PR 4, header transparente). Mantidos telefone, Instagram confirmado, marca, fontes locais e fotografias fornecidas.

## Comportamento

Entrada com assinatura oficial: cortina vertical. Reload identificado por PerformanceNavigationTiming.type: cortina horizontal e assinatura por escala. Duração da cortina 1,05s; entrada da hero coordenada a partir de 0,78/0,9s. Não há listener beforeunload, trava de navegação nem bloqueio permanente da rolagem. Movimento reduzido remove a cortina e o movimento de entrada.

Hash inicial é removido e a página começa no topo. Cliques internos agendam limpeza após 1000ms, com history.replaceState preservando pathname, query e history.state. Novo clique cancela timer anterior; desmontagem limpa timer. Reload sem hash não restaura posição antiga: scrollRestoration manual durante a montagem, restaurado no cleanup.

Desktop a partir de 1001 × 650: cada cena tem 100svh, com imagens e grids minmax(0,1fr). Zoom que reduz viewport e paisagem curta conservam fluxo natural, sem esconder conteúdo. Na peça, ScrollTrigger mantém uma viewport fixa por 2,4 alturas adicionais de scroll e muda foto/texto por terços. Botões também levam ao trecho correspondente. Fio tem pin por 1,5 alturas adicionais e desenho contínuo por scrub, reversível, seguido pela linha no ateliê. Distância dos pins é intencional e não aumenta a altura visível das cenas.

Tablet/celular e viewports curtas mantêm fluxo natural, sem pin; seleção da peça por botões e fio desenhado por scroll. Movimento reduzido não cria pin nem sequência longa, mantém botões e fio completo. MatchMedia, contexto, triggers, ticker, Lenis e timers são revertidos/removidos no cleanup.

## Evidências

Chromium real, 1440 × 900, 1664 × 1005 e 1366 × 768: as 9 cenas mediram respectivamente 900, 1005 e 768px. Em todas, scrollHeight igual a clientHeight e overflow horizontal 0. Essa medição usou movimento reduzido para isolar o layout da distância adicional dos pins. URL inicial ?probe=1#rua virou ?probe=1, scrollY 0; fundo do header rgba(0,0,0,0).

Chromium normal, 1440 × 900: passagem do fio inicia em scrollY 4860, pinSpacing 1350px, cena 900px. Progresso 0,1/0,5/0,9/0,5/0,1 produziu strokeDashoffset 0,9/0,5/0,1/0,5/0,9px, cena top 0. Corrigido autoRound padrão do GSAP, que arredondava a faixa normalizada 1→0 e causava desenho binário. autoRound:false conserva valores intermediários e reversão determinística.

Entrada e reload aos 250ms: data-navigation entry/reload, display grid; reload scrollY 0. Controlador confirmou fotos/textos nos três terços, hash limpo após 1300ms preservando ?teste=1 e reload no topo. Captura do fio no meio da reversão aprovada visualmente. Capturas por cena, entrada e reload em docs/evidence-scenes.

Lint, typecheck e build: exit 0. Next 16.4.5, rota / estática, 5/5 páginas. Diff sem erros. CI/deploy do SHA publicado serão registrados no corpo da release e na entrega final.

## Limites

Não verificados: aparelho físico, leitor de tela, Safari/Firefox e desempenho em hardware modesto. Exceção de fluxo em zoom/paisagem curta é deliberada para não cortar texto. Produção Vercel será conferida pelo controlador após o merge main.
