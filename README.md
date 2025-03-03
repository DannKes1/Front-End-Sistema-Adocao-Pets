Front-End do Sistema de Adoção de Animais 🐾
Este é o front-end de um projeto acadêmico que visa gerenciar adoções de animais. Ele consome a API do back-end (Node.js, Express, SQLite) e permite que usuários criem conta, façam login (JWT), e realizem CRUD de pets. A funcionalidade de recuperação de senha e alguns filtros de busca podem não estar totalmente funcionais.

Sumário
Sobre o Projeto
Pré-Requisitos
Instalação
Estrutura de Pastas
Scripts Disponíveis
Configurações Importantes
Fluxo de Navegação
Observações
Licença

1. Sobre o Projeto
   Stack utilizada:

React
React Router DOM
Axios
Bootstrap 5 e Bootstrap Icons
jwt-decode
Funcionalidades:

Listagem de Pets em cards (e opcionalmente em tabela).
Criação, edição e remoção de Pets (para usuários logados).
Registro e login de usuários (armazenando token no LocalStorage).
Filtro básico (nome, categoria, localização) – pode não estar 100% funcional.
Edição do perfil do pet com upload de imagens via multipart/form-data.
Observação: A parte de recuperação de senha (link “Esqueceu a senha?”) faz chamada à rota do back-end, mas não está garantido que funcione plenamente, pois o back-end também possui limitações nessa funcionalidade.

2. Pré-Requisitos
   Node.js (versão 14 ou superior).
   NPM ou Yarn para gerenciamento de dependências.
   Back-end rodando em http://localhost:3000 (por padrão) para que as requisições funcionem corretamente.

3. Instalação
   Clone ou baixe este repositório (pasta do front-end).
   Abra o terminal na raiz do projeto e execute:
   npm install
   para instalar as dependências listadas no package.json.

4. Estrutura de Pastas
   .
   ├── public
   ├── src
   │ ├── assets
   │ │ └── images # Imagens utilizadas (banners, depoimentos, etc.)
   │ ├── components
   │ │ └── NavbarMenu.js # Menu de navegação superior
   │ ├── pages
   │ │ ├── Home.js # Página inicial
   │ │ ├── Login.js # Formulário de login
   │ │ ├── Register.js # Formulário de cadastro
   │ │ ├── PetsCards.js # Listagem dos pets em cards
   │ │ ├── PetCreate.js # Criação de um novo pet
   │ │ ├── PetEdit.js # Edição de um pet
   │ │ ├── PetDetail.js # Detalhes de um pet específico
   │ │ └── ...
   │ ├── services
   │ │ └── api.js # Configuração base do Axios
   │ └── App.js # Lógica principal do React + Rotas
   ├── package.json
   └── ...

5. Scripts Disponíveis
   No projeto, você pode executar:

npm start
Roda a aplicação em modo de desenvolvimento.
Abra http://localhost:3000 (ou outra porta livre) para visualizar no navegador.

npm run build
Cria a versão otimizada de produção na pasta build.

npm test
Executa os testes configurados (caso existam).

6. Configurações Importantes
   URL da API:
   Dentro de src/services/api.js, a base URL do Axios está definida como:
   baseURL: "http://localhost:3000"
   Se o back-end estiver em outro local (ex: outra porta, outro domínio), ajuste conforme necessário.

Token de Autenticação:

Após login, o token JWT é salvo em localStorage (localStorage.setItem("token", token)).
Esse token é incluído automaticamente em todas as requisições via o api.interceptors.request no arquivo api.js.
Proteção de Rotas:

Algumas rotas (como criação/edição de pet) são acessíveis apenas se o token estiver presente.
Caso o token expire ou seja inválido, o usuário é redirecionado para o login.

7. Fluxo de Navegação
   Home (/): exibe banners, depoimentos e links para visualizar pets ou se registrar.
   Login (/login): formulário de login. Ao logar, o token é salvo e o usuário é redirecionado para /pets.
   Cadastro (/register): formulário de cadastro de usuário (nome, email, senha, CEP, etc.).
   Pets (/pets): lista de animais disponíveis em formato de cards. Possui busca básica e filtros de categoria/localização (não 100% funcionais).
   Criar Pet (/pets/create): exige usuário logado. Formulário com upload de imagem.
   Editar Pet (/pets/edit/:id): exige usuário logado. Somente dono do pet ou admin podem editar.
   Detalhes do Pet (/pets/:id): exibe detalhes de um pet, com possibilidade de abrir modal de imagem.

8. Observações
   Busca e Filtros: há lógica no componente PetsCards para filtrar por nome (search), categoria e localização. Isso é feito client-side, mas não está 100% validado.
   Recuperação de Senha: o link “Esqueceu a senha?” em Login.js direciona para /password/forgot no back-end. Entretanto, a implementação de envio de email no back-end pode não funcionar completamente.
   Validações: há validações simples de formulário (ex: required) e formatação (CEP, telefone). No entanto, nem todos os cenários de erro podem estar cobertos.

9. Licença
   Este projeto foi desenvolvido para fins de estudo/atividade acadêmica. Utilize como referência ou projeto base. Se necessário, aplique uma licença (MIT, GPL, etc.) conforme suas necessidades.

Obrigado por conferir este front-end!
Em caso de dúvidas ou melhorias, sinta-se à vontade para adaptar o código e adequar ao seu contexto.
