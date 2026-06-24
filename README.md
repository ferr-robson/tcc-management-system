# Gestão de TCCs

Sistema web para gerenciamento de Trabalhos de Conclusão de Curso (TCCs), desenvolvido como atividade da disciplina de Desenvolvimento Web.

O objetivo do projeto é aplicar conceitos de desenvolvimento front-end utilizando Vue.js, consumindo uma API REST desenvolvida previamente pelo professor utilizando Django.

## Objetivos

Este trabalho tem como finalidade desenvolver habilidades relacionadas à integração entre aplicações front-end e back-end, incluindo:

* Consumo de APIs REST;
* Manipulação de dados assíncronos;
* Componentização de interfaces;
* Reutilização de código;
* Exibição e relacionamento de dados provenientes de diferentes endpoints.

## Tecnologias Utilizadas

### Front-end

* Vue.js 3
* Vue Router
* TypeScript
* Vite
* CSS

### Back-end

* Django
* Django REST Framework

> O back-end foi disponibilizado pelo professor da disciplina. O foco deste projeto está no desenvolvimento da aplicação front-end e na integração com a API fornecida.

## Funcionalidades

### Entidades

O sistema permite a visualização das seguintes entidades:

* Alunos
* Professores
* Cursos
* Departamentos
* Unidades Acadêmicas
* TCCs

### TCCs

Atualmente o sistema permite:

* Listagem de TCCs;
* Busca e filtragem de registros;
* Visualização de detalhes em modal;
* Cadastro de novos TCCs;
* Edição de TCCs;
* Associação de informações acadêmicas e administrativas ao trabalho.

### Componentes Reutilizáveis

O projeto foi estruturado utilizando componentes reutilizáveis, tais como:

* Header
* Table
* Modal
* Form

A utilização desses componentes reduz duplicação de código e facilita a manutenção da aplicação.

## Estrutura do Projeto

```text
src/
├── assets/
│   ├── base.css
│   └── main.css
│
├── components/
│   ├── Header.vue
│   ├── Modal.vue
│   └── Table.vue
│
├── router/
│   └── index.ts
│
├── views/
│   ├── tccs/
│   │   ├── Create.vue
│   │   ├── Edit.vue
│   │   ├── Form.vue
│   │   └── Dashboard.vue
│   ├── Alunos.vue
│   ├── Cursos.vue
│   ├── Dashboard.vue
│   ├── Departamentos.vue
│   ├── Professores.vue
│   ├── TCCs.vue
│   └── UnidadesAcademicas.vue
├── App.vue
└── main.ts
```

## Rotas

| Rota                   | Descrição                       |
| ---------------------- | ------------------------------- |
| `/`                    | Dashboard                       |
| `/alunos`              | Listagem de alunos              |
| `/professores`         | Listagem de professores         |
| `/cursos`              | Listagem de cursos              |
| `/departamentos`       | Listagem de departamentos       |
| `/unidades-academicas` | Listagem de unidades acadêmicas |
| `/tccs`                | Listagem de TCCs                |
| `/tcc/create`          | Cadastro de TCC                 |
| `/tcc/edit/:id`        | Edição de TCC                   |

## Instalação

### Clonar o projeto

```bash
git clone https://github.com/ferr-robson/tcc-management-system
```

### Instalar dependências

```bash
npm install
```

### Executar em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## Integração com a API

A aplicação consome os endpoints disponibilizados pelo back-end Django, tais como:

```text
/api/alunos/
/api/cursos/
/api/departamentos/
/api/professores/
/api/tccs/
/api/tccs/estatisticas/
/api/unidades-academicas/
```

Os dados são obtidos por meio de requisições HTTP utilizando a API Fetch do navegador.

## Autores

Projeto desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Web.
- Robson Santos
- Kalill Páscoa 
