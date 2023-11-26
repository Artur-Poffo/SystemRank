# SystemRank - Client Package 👔

## Páginas:

- [x] / -> public -> Homepage, introdução a plataforma
- [x] /auth/signin -> public -> Página de login, formulário para login
- [x] /auth/signup -> public -> Página de cadastro, formulário para cadastro
- [x] /explore -> private -> Página para explorar sistemas cadastrados, Lista de sistemas cadastrados com campo de pesquisa
- [x] /me/:userId -> private -> Página perfil, Página de perfil de um usuário
  - [x] Deve exibir todas as informações do usuário de uma forma agradável
  - [x] Para empresas deve exibir a lista sistemas cadastrados
  - [x] Para membros comuns deve exibir as últimas avaliações
  - [x] Se o perfil for do mesmo usuário logado deve ter opção de ir para a página para editar perfil
- [] /systems/:systemId -> private -> Página de um sistema, Página de um sistema com avaliações do mesmo
  - [] Se o sistema for do usuário logado deve ser possível editar informações do sistema
  - [] Deve ter no final da página uma lista de avaliações do sistema
  - [] Deve ser possível adicionar uma avaliação ao sistema
  - [] Deve ser possível editar sua avaliação ao sistema
  - [] Deve ser possível excluir sua avaliação ao sistema

- [x] Arrumar page header
- [x] Separar label form em components
- [x] Terminar configurar mdx editor
- [x] Fazer a parte funcional do form