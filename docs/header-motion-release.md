# Header, tipografia e publicação

Em 6 de novembro de 2026, refinamento autorizado da direção editorial SaiDaReta inspirada em Augen. Sem alteração de identidade ou incorporação de fotografias externas.

## Implementação

Header permanentemente fixo. Em desktop acima de 1000px, grid 1fr/auto/1fr mantém assinatura esquerda, navegação central e contato direita. Menu aparece somente até 1000px, com entrada e saída animadas por recorte e opacidade, rolagem própria, Escape, fechamento por clique externo e troca para desktop. O telefone informado pelo usuário abre tel:+5511979879591; não há WhatsApp nem endereço de email inventado.

Manrope variável auto-hospedada substitui Arial. Fonte e licença SIL OFL 1.1 vieram de https://github.com/google/fonts/tree/main/ofl/manrope. Anton existente foi preservada na passagem editorial. Arquivos são servidos pelo próprio site, sem pedido do navegador ao Google.

Cliques em links e botões recebem pulso de escala de 240ms, inclusive ativação pelo teclado. Movimento reduzido remove o pulso e a duração do menu. Seções e rodapé têm largura 100% e min-height 100svh, preservando crescimento pelo conteúdo. Ícone provisório reutiliza o emblema oficial, sem criar outra marca.

## Verificação local

- npm run lint: exit0.
- npm run typecheck: exit0.
- npm run build: exit0, Next16.4.5, rota / estática, 5/5 páginas.
- git diff --check: sem erros.
- Detector mecânico Impeccable em app/page.tsx e app/style.css: lista vazia.
- Revisão Chromium pelo controlador em 1440×900,390 × 844 e640 × 320: zero overflow horizontal; header fixo; desktop sem menu; tablet/celular sem navegação desktop; telefone correto. Menu permanece montado aos 80ms da saída e desmonta aos 530ms. Após correção de especificidade da passagem do fio, nenhuma seção ou rodapé ficou abaixo da altura da viewport. Capturas em docs/evidence-header.

Em movimento reduzido, 390 × 844: Enter abriu o menu, Escape fechou, foco retornou ao botão e o painel foi removido (count 0). Capturas adicionais da peça, ateliê e rodapé em docs/evidence-header.

## Publicação

PR 1 https://github.com/eovitu/caio-xavier/pull/1 teve descrição corrigida para refletir remoção do 3D e implementação fotográfica. CI passou; MERGEABLE. Merge autorizado para develop em 15d959d8cc42f136d76e6ecfc2f867ed06d9fb4b. Branch feature/site-base removida local/remota depois do merge.

Nova branch feature/header-motion criada da develop atualizada. Commits 4527c75 (tipografia/cenas), ba703be (header/menu) e f45e8cc (especificidade da altura). PR 2: https://github.com/eovitu/caio-xavier/pull/2. Release develop→main será registrada após aprovação do CI. Não houve deploy por CLI. Vercel está sendo configurada pelo usuário/controlador, confirmação de produção é separada de merge e CI.

Limites: não há validação em aparelho físico, leitor de tela ou Safari/Firefox nesta unidade. A abertura real do discador depende de aplicativo de chamadas disponível no dispositivo.
