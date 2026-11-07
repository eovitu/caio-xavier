> Histórico: direção substituída pelo rebranding autorizado em 6 de novembro de 2026. O estudo 3D foi rejeitado e removido. Estado atual em DESIGN.md e docs/superpowers/rebrand-augen-report.md.

# SaiDaReta — plano de implementação

> Use superpowers:subagent-driven-development para executar e revisar cada tarefa.

**Objetivo:** Construir a direção B aprovada, editorial fotográfica com palco 3D e movimento interativo.
**Arquitetura:** Next.js App Router; página e estilos editoriais, comportamento GSAP/Lenis isolado quando necessário, componente Three.js independente recebendo progresso via ref.
**Stack:** React, TypeScript, GSAP, Lenis, Three.js, Motion.
**Spec:** ../specs/2026-11-05-saidareta-redesign.md

## Restrições globais
Usar logos reais public/brand e fotos locais. Direção B: bordô/laranja, creme e marrom/dourado, com capítulo azul/amarelo. Nada de grade repetitiva de cartões ou bordas decorativas. Preservar arquivos não relacionados. Sem inventar contatos, depoimentos ou disponibilidade comercial. Conteúdo demonstrativo permitido. Sem commits em main/develop. Sem deploy ou merge.

## Tarefa 1 — experiência editorial
Arquivos: app/page.tsx, app/style.css, novos componentes de movimento em app se úteis; public apenas assets necessários; docs de design.
- [ ] Ler as skills design-taste-frontend, frontend-design, motion-design, impeccable, ui-ux-pro-max e motion; aplicar orientações compatíveis com pedido explícito.
- [ ] Substituir composição atual por hero fotográfica imersiva com logo oficial, tipografia expressiva, entrada coreografada e interação de ponteiro.
- [ ] Construir pelo menos oito cenas substanciais: hero, manifesto, peça, detalhe/processo, editorial de rua, ateliê, pessoas, fechamento/footer.
- [ ] Header transparente com contraste adaptativo: some para baixo, reaparece para cima. Menu acessível e links internos funcionais.
- [ ] Coreografar GSAP/Lenis: revelações, transições de cor/escala, imagens em parallax, hover/foco/clique e retorno ao início. Sem bloquear leitura ou sequestrar scroll.
- [ ] Manter contrato do Bag com progress ref, reservar palco visual desktop/mobile.
- [ ] Conferir teclado, movimento reduzido, 390px e 1440px, ausência de overflow, lint e typecheck.

## Tarefa 2 — peça tridimensional
Arquivos: app/bag.tsx, componentes/modelo dedicados e assets do objeto; ajustes mínimos de integração.
- [ ] Seguir img2threejs desde forge/next.py e registrar avaliação/referências.
- [ ] Referência: bolsa denim vertical de cordão nas fotos locais, public/peca.jpg e campanha.jpg. Não usar a bolsa horizontal genérica atual.
- [ ] Modelar corpo com volume orgânico, pregas, costuras, alça plana, cordão e material coerente; controlar giro e aproximação com progresso e ponteiro.
- [ ] Comparar vistas e registrar partes inferidas; fallback fotográfico, pausa fora da tela, resize e disposal.
- [ ] Validar imagens do canvas, rolagem e seleção de vistas.

## Tarefa 3 — integração e verificação
- [ ] Revisão independente após cada tarefa e revisão final.
- [ ] Build, lint, typecheck; navegador desktop/mobile, menu, links, scroll, reload, reduced-motion e WebGL indisponível.
- [ ] Capturas da hero, peça e página inteira; corrigir defeitos visuais encontrados.
- [ ] Registrar limites reais e atualizar documentação; commits separados autorizados e PR existente para develop, sem merge.

## Foco da revisão
Resize durante trecho fixo; navegação por hash e teclado; retorno de aba suspensa; movimento reduzido; canvas indisponível. Todo conteúdo deve permanecer acessível nessas condições.
