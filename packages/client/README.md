# SystemRank - Client Package 👔

## Páginas:

- [x] / -> public -> Homepage, introdução a plataforma
- [x] /auth/signin -> public -> Página de login, formulário para login
- [x] /auth/signup -> public -> Página de cadastro, formulário para cadastro
- [x] /explore -> private -> Página para explorar sistemas cadastrados, Lista de sistemas cadastrados com campo de pesquisa
- [] /me/:userId -> private -> Página perfil, Página de perfil de um usuário
  - [] Deve exibir todas as informações do usuário de uma forma agradável
  - [] Para empresas deve exibir a lista sistemas cadastrados
  - [] Para membros comuns deve exibir as últimas avaliações
  - [] Se o perfil for do mesmo usuário logado deve ter opção de editar perfil
- [] /system/:systemId -> private -> Página de um sistema, Página de um sistema com avaliações do mesmo
  - [] Se o sistema for do usuário logado deve ser possível editar informações do sistema
  - [] Deve ter no final da página uma lista de avaliações do sistema
  - [] Deve ser possível adicionar uma avaliação ao sistema
  - [] Deve ser possível editar sua avaliação ao sistema
  - [] Deve ser possível excluir sua avaliação ao sistema

## Tasks:

- [] Padronizar tamanho das imagens e dos elementos para uma unidade de medida 
- [] Arrumar componente DefaultListItem 
- [] Continuar desenvolvendo /me/:userId