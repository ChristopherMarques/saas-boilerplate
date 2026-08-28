# Como Contribuir para o SaaS Boilerplate

Obrigado por investir seu tempo em contribuir para o nosso projeto! Qualquer ajuda é bem-vinda, seja corrigindo bugs, melhorando a documentação, ou adicionando novas funcionalidades.

## Código de Conduta

Ao participar deste projeto, você concorda em manter um ambiente acolhedor, respeitoso e livre de assédio para todos. 

## Como começar

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** para a sua funcionalidade (`git checkout -b feature/minha-funcionalidade`).
3. Instale as dependências executando `pnpm install`.
4. Faça suas alterações no código.
5. Verifique se o código está seguindo os padrões usando `pnpm run lint:fix` e `pnpm run type-check`.
6. Faça o commit das suas alterações (`git commit -m "feat: adiciona minha funcionalidade"`).
7. Faça o **push** para a branch (`git push origin feature/minha-funcionalidade`).
8. Abra um **Pull Request (PR)**.

## Padrões do Projeto

- **Commits**: Utilizamos Conventional Commits (ex: `feat:`, `fix:`, `docs:`, `refactor:`).
- **Tipagem**: TypeScript rigoroso. O projeto usa `tsc --noEmit` nos hooks de pre-commit.
- **Estilo de Código**: Utilizamos Prettier e ESLint. Eles rodam automaticamente antes de cada commit.
- **Arquitetura**: Siga o padrão Feature-Sliced Design. Funcionalidades isoladas devem ir para `/features/`, e lógica compartilhada deve ir para `/shared/`.

## Reportando Bugs

Se você encontrou um bug, por favor abra uma **Issue** no GitHub detalhando:
- Como reproduzir o problema.
- O comportamento esperado vs. o comportamento atual.
- Versão do Node.js, Navegador e Sistema Operacional.

Agradecemos imensamente por tornar o SaaS Boilerplate melhor!
