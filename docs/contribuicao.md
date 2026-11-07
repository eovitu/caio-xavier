# Branches e revisão

- `main` recebe versões aprovadas para produção.
- `develop` recebe integração e validação antes da promoção.
- Crie `feature/<tema>` ou `fix/<tema>` a partir de `develop` atualizado.
- Envie mudanças para `develop` por PR. Promova para `main` por PR de `develop`.
- Preserve `main` e `develop`. Exija PR e verificações no GitHub, bloqueie exclusão e force push.
- Use Conventional Commits no formato `tipo(escopo): descrição`. Exemplo: `feat(experiencia): animar a peça na rolagem`.

A verificação de integração roda lint, tipos e build. Acrescente evidência visual para mudanças de interface. O PR deve distinguir o que foi verificado do que segue pendente.
