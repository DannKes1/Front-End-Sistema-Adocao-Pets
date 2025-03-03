# Front-End do Sistema de Adoção de Animais 🐾
Este é o front-end de um projeto acadêmico que visa gerenciar adoções de animais. Ele consome a API do back-end (Node.js, Express, SQLite) e permite que usuários criem conta, façam login (JWT), e realizem CRUD de pets. A funcionalidade de recuperação de senha e alguns filtros de busca podem não estar totalmente funcionais.

---

## Sumário
1. [Sobre o Projeto](#sobre-o-projeto)  
2. [Pré-Requisitos](#pré-requisitos)  
3. [Instalação](#instalação)  
4. [Estrutura de Pastas](#estrutura-de-pastas)  
5. [Scripts Disponíveis](#scripts-disponíveis)  
6. [Configurações Importantes](#configurações-importantes)  
7. [Fluxo de Navegação](#fluxo-de-navegação)  
8. [Observações](#observações)  
9. [Licença](#licença)  

---

## 1. Sobre o Projeto
### Stack utilizada:
- **React**  
- **React Router DOM**  
- **Axios**  
- **Bootstrap 5** e **Bootstrap Icons**  
- **jwt-decode**  

### Funcionalidades:
- Listagem de Pets em cards (e opcionalmente em tabela).
- Criação, edição e remoção de Pets (para usuários logados).
- Registro e login de usuários (armazenando token no LocalStorage).
- Filtro básico (nome, categoria, localização) – pode não estar 100% funcional.
- Edição do perfil do pet com upload de imagens via `multipart/form-data`.

> **Observação**: A parte de recuperação de senha (link “Esqueceu a senha?”) faz chamada à rota do back-end, mas não está garantido que funcione plenamente, pois o back-end também possui limitações nessa funcionalidade.

---

## 2. Pré-Requisitos
- **Node.js** (versão 14 ou superior).
- **NPM** ou **Yarn** para gerenciamento de dependências.
- Back-end rodando em **http://localhost:3000** (por padrão) para que as requisições funcionem corretamente.

---

## 3. Instalação
1. Clone ou baixe este repositório (pasta do front-end).
2. Abra o terminal na raiz do projeto e execute:
   ```bash
   npm install
