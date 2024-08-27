# Sunset API Microservices

Bem-vindo ao projeto **Sunset API Microservices**. Este repositório contém uma coleção de microsserviços que trabalham juntos para formar uma aplicação escalável, eficiente e modular. Os serviços se comunicam através do **RabbitMQ** para garantir uma troca de mensagens suave e confiável entre os componentes.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Microsserviços](#microsserviços)
  - [API Gateway](#api-gateway)
  - [User Service](#user-service)
  - [Todo Service](#todo-service)
  - [Sunset App](#sunset-app)
- [Comunicação](#comunicação)
  - [RabbitMQ](#rabbitmq)
- [Instalação](#instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Configuração](#configuração)
  - [Executando os Serviços](#executando-os-serviços)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Sobre o Projeto

O projeto **Sunset API Microservices** foi desenvolvido para demonstrar uma arquitetura de microsserviços utilizando frameworks modernos. Cada serviço dentro do ecossistema lida com um domínio específico, garantindo que a aplicação seja modular e facilmente escalável. Os serviços se comunicam via RabbitMQ, tornando o sistema resiliente a falhas e permitindo o processamento assíncrono.

## Visão Geral da Arquitetura

A arquitetura consiste nos seguintes componentes principais:

- **API Gateway**: O ponto de entrada para todas as solicitações dos clientes, roteando-as para os microsserviços apropriados.
- **User Service**: Gerencia operações relacionadas aos usuários, como registro, autenticação e gestão de dados de usuários.
- **Todo Service**: Lida com a criação, atualização e gerenciamento de itens de tarefas.
- **Sunset App**: Uma aplicação frontend construída com React e TypeScript, fornecendo uma interface para interagir com a API.

## Microsserviços

### API Gateway

- **Framework**: NestJS
- **Descrição**: Atua como um proxy reverso, roteando as solicitações dos clientes para os microsserviços apropriados e agregando respostas quando necessário.

### User Service

- **Framework**: NestJS
- **Descrição**: Lida com a autenticação, autorização e gestão de usuários. Integra-se com RabbitMQ para lidar com tarefas assíncronas.

### Todo Service

- **Framework**: NestJS
- **Descrição**: Gerencia itens de tarefas, incluindo operações CRUD e atribuição de tarefas.

### Sunset App

- **Framework**: React + TypeScript
- **Descrição**: Uma aplicação web moderna que fornece uma interface de usuário para interagir com a API, incluindo autenticação de usuários e gerenciamento de tarefas.

## Comunicação

### RabbitMQ

O RabbitMQ é usado como o broker de mensagens entre os microsserviços, permitindo que eles se comuniquem de forma assíncrona e garantindo confiabilidade e escalabilidade.

## Instalação

### Pré-requisitos

- **Docker**: Certifique-se de que o Docker esteja instalado no seu sistema.
- **Node.js**: O Node.js deve estar instalado para executar os serviços localmente.
- **RabbitMQ**: O RabbitMQ é usado para comunicação entre os serviços e deve estar configurado no seu ambiente.

### Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/Victor-cmda/sunset-api-microservices.git
   cd sunset-api-microservices
   ```

2. Instale as dependências de cada microsserviço:
   ```bash
   cd api-gateway && npm install
   cd ../user-service && npm install
   cd ../todo-service && npm install
   cd ../sunset-app && npm install
   ```

### Executando os Serviços

Você pode executar todos os serviços usando Docker Compose:

```bash
docker-compose up --build
```

Este comando iniciará os seguintes serviços:

- Banco de Dados PostgreSQL
- RabbitMQ
- User Service
- Todo Service
- API Gateway
- Sunset App (Frontend)

Acesse a aplicação navegando até `http://localhost:5173`.

## Contribuição

Contribuições são bem-vindas! Por favor, faça um fork deste repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto é licenciado sob a Licença MIT.

## Contato

Para perguntas ou suporte, entre em contato com [Victor](mailto:victor21420@gmail.com).