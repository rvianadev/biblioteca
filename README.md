
# Sistema de Biblioteca

Aplicação web para gerenciamento de livros, desenvolvida como atividade acadêmica da disciplina Plataforma de Desenvolvimento em Software Livre e Servidores Web.

## Tecnologias utilizadas

- Java 21
- Spring Boot 4.1.2
- Spring Data JPA
- Spring Web MVC
- PostgreSQL 18
- Docker e Docker Compose
- Maven
- HTML5, CSS3 e JavaScript
- Bootstrap 5

## Funcionalidades

- Cadastrar livros.
- Consultar livros cadastrados.
- Atualizar informações de livros.
- Excluir livros mediante confirmação.

Cada livro possui os seguintes atributos:

- ID
- Título
- Autor
- ISBN
- Ano de publicação

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- JDK 21
- Maven
- Docker Engine
- Docker Compose

## Como executar

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd biblioteca
```

Substitua `URL_DO_REPOSITORIO` pelo endereço do repositório no GitHub.

### 2. Iniciar o banco de dados

Na raiz do projeto, execute:

```bash
sudo docker compose up -d
```

O PostgreSQL será iniciado em um contêiner Docker.

A configuração utiliza:

| Parâmetro | Valor |
|---|---|
| Banco de dados | biblioteca |
| Usuário | biblioteca |
| Senha | biblioteca_dev |
| Porta no computador | 5433 |
| Porta no contêiner | 5432 |

### 3. Compilar a aplicação

Execute:

```bash
mvn clean package -DskipTests
```

O arquivo JAR será gerado no diretório `target/`.

### 4. Executar a aplicação

Execute:

```bash
java -jar target/biblioteca-0.0.1-SNAPSHOT.jar
```

### 5. Acessar o sistema

Abra o navegador no endereço:

http://localhost:8080

## Encerramento

Para interromper os contêineres:

```bash
sudo docker compose down
```

Os dados do PostgreSQL são armazenados em um volume Docker, permitindo sua persistência entre reinicializações dos contêineres.

Para remover também os dados persistidos, utilize:

```bash
sudo docker compose down -v
```

**Atenção:** o último comando remove o volume do banco de dados e, consequentemente, os livros armazenados.

## Observação

As credenciais do banco de dados utilizadas neste projeto são destinadas ao ambiente acadêmico de desenvolvimento e não devem ser reutilizadas em ambientes de produção.
