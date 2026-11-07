# Rebranding SaiDaReta: estudo e verificação

Data: 6 de novembro de 2026. Escopo autorizado: rebranding com Augen como referência principal, remoção do estudo 3D rejeitado, movimento substancial e responsividade. Nenhum asset de Augen foi incorporado ao site.

## Estudo observado

Alvo: https://augen.pro/?ref=godly. Chromium headless instalado, viewport 1440×1000. A primeira tentativa de Playwright pediu um executável de versão diferente; a segunda usou explicitamente o Chromium 1243 já instalado. Não foi necessário instalar navegador.

Capturas reais em evidence-augen/reference-top.png e reference-scroll-1.png a reference-scroll-4.png. Hero branca com figura dominante, navegação flutuante central, texto inferior esquerdo; capítulo de introdução com margem ampla e coluna à direita; alternância de capítulos escuros/claros; linhas editoriais finas; objeto sobre título grande; controles compactos. Documento medido em 6642px e título de capítulo em 140px. Fonte observada: PP Neue Montreal, que não foi copiada.

Runtime em evidence-augen/reference-runtime.txt: roda de 700px produziu scrollY502 após 200ms e scrollY700 após estabilizar, evidência de suavização. Linhas da introdução foram observadas com translateY50/opacity0 e depois translateY0/opacity1. A navegação permaneceu visível nas posições capturadas. Não atribuí à referência o comportamento de ocultar na descida: esse é requisito específico do usuário. Captura de hover em reference-hover.png; o registro é uma observação pontual, não cobertura de todas as transições do site.

Inferência aplicada: espaço, escala leve, objeto/fotografia dominante, sequência de superfícies, introdução em coluna e navegação compacta constituem a gramática adaptável. Não é reprodução de layout pixel a pixel. Identidade SaiDaReta mantém bordô/laranja/azul, fotos e assinatura oficiais.

## Implementação

A abertura clara substitui a fotografia de tela inteira com lettering sobreposto. Título, ação e foto preservam ordem de leitura no mobile. Peça possui três leituras fotográficas por clique/teclado, com crossfade até 280ms e todas as imagens montadas. Não há scroll que sobrescreva escolha manual. Ateliê, rua, matéria e encontro usam imagens reais; rodapé usa assinatura em largura total e emblema.

Removidos app/bag.tsx e app/bag-model.ts e imports de renderização. Three.js e seus tipos foram removidos de package.json/lock. Busca em app e manifestos não encontrou referência restante a three ou ./bag. Scratch .img2threejs foi preservado localmente, ignorado no Git e no ESLint; não integra a publicação.

Motion: recorte e escala na entrada da foto, entrada escalonada do título, parallax, ênfase progressiva no manifesto, linha SVG desenhada, frase da rua deslocada por scroll, assinatura revelada e emblema girando no fechamento. Mouse desloca levemente a hero. Hover desloca setas. Header direcional usa superfície clara translúcida, sem gradiente preto. GSAP/Lenis são removidos no cleanup; fontes verificam flag de descarte antes do refresh.

## Evidência de verificação

Lint, typecheck e build concluíram com exit0. Next.js 16.4.5 gerou 5/5 páginas e classificou / como estática. git diff --check passou. Detector visual apontou um aviso de fonte Arial muito usada; sem outros achados mecânicos. A escolha mantém a leitura leve da referência sem utilizar sua fonte proprietária. Essa escolha continua sujeita à avaliação visual do usuário.

Chromium local, 1440×1000, 390×844 e 640×320:

- 390px: scrollWidth390, sem overflow horizontal. CTA e foto separadas após correção visual.
- Menu paisagem: altura220px, conteúdo298px, base302px em viewport320px. Rolagem interna dá acesso ao último link. data-lenis-prevent impede captura do scroll pelo Lenis.
- Escape retornou foco ao botão, resultado true. Enter no botão O fazer trocou descrição e fotografia.
- Crossfade medido: após80ms, foto antiga opacity0.160043 e nova0.839957; após480ms, antiga0/nova1.
- Mouse: transformação da hero medida em translate(5.3333px,1.2px). Movimento reduzido em execução retornou a translate(0,0).
- Header: data-hidden true ao descer e false ao subir.
- Movimento reduzido conservou escolha O caminho após rolagem. Não há palco sticky nem capítulo automático.
- 0 erros de página e 0 imagens completas quebradas no percurso instrumentado.

Arquivos site-runtime.txt e site-motion.txt guardam resultados. Capturas site-desktop-top.png, site-desktop-piece.png, site-desktop-piece-click.png, site-desktop-footer.png, site-mobile-top.png, site-landscape-menu.png, site-mobile-reduced.png e site-keyboard-click.png documentam a renderização real. Capturas provêm do servidor de desenvolvimento; o indicador de desenvolvimento visível não pertence à página de produção.

## Limites e procedência

Não verificados nesta entrega: aparelho físico, leitor de tela, Safari/Firefox, desempenho em hardware modesto, retomada de aba suspensa, instalação PWA/offline e produção remota. Capturas demonstram composição e os probes demonstram propriedades medidas, não um laudo completo de acessibilidade/performance. npm uninstall informou 8 vulnerabilidades moderadas remanescentes; não foi aplicado upgrade fora do escopo.

Fotos campanha.jpg, peca.jpg, processo.jpg, rua.jpg, trama.jpg, encontro.jpg e caio.png são do material fornecido pelo usuário. Assinatura/emblema são os arquivos oficiais em public/brand. Anton tem licença OFL junto ao arquivo local. Capturas de Augen são documentação do estudo e não são servidas pela aplicação.

A direção B e planos de 3D anteriores são históricos, substituídos por DESIGN.md e plans/2026-11-06-rebrand-augen.md. Nenhuma disponibilidade comercial ou informação biográfica nova foi criada.

Reteste tablet após revisão independente: layout empilhado estendido até1000px. Em761,768 e1000px, copyBottom520 e photoTop554, sem sobreposição e scrollWidth igual à viewport. Capturas site-tablet-761.png, site-tablet-768.png e site-tablet-1000.png; medições em site-tablet.txt.
