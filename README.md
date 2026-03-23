## Sobre o projeto

O Mini Twitter foi desenvolvido como desafio técnico para um processo seletivo para vaga de Frontend. A proposta da aplicação é simular uma rede social simples, permitindo cadastro e autenticação de usuários, criação de posts com título, conteúdo e imagem opcional via URL, além da visualização da timeline com os posts gerais da plataforma.

O foco do desenvolvimento foi construir uma interface funcional, organizada e integrada a uma API REST, aplicando boas práticas de componentização, validação de formulários, controle de sessão do usuário e consumo de dados no frontend.

## Tecnologias utilizadas

- React 19: construção da interface com componentes reutilizáveis
- TypeScript: tipagem estática e maior segurança no desenvolvimento
- Vite: ambiente de desenvolvimento e build da aplicação
- Tailwind CSS 4: estilização da interface com classes utilitárias
- React Router 7: gerenciamento de rotas públicas e privadas
- Axios: comunicação com a API REST
- Zod: validação de formulários e regras de entrada
- Lucide React: biblioteca de ícones
- clsx + tailwind-merge: composição e organização de classes CSS
- Context API: gerenciamento de autenticação e sessão do usuário

## Funcionalidades implementadas

- Cadastro de usuário
- Login e controle de autenticação
- Rotas protegidas para usuários autenticados
- Criação de posts com título, conteúdo e imagem opcional
- Envio de token no header `Authorization`
- Listagem da timeline com posts gerais
- Validação de dados no frontend
- Tratamento de erros retornados pela API
