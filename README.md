# Sistema de Biblioteca

Aplicação web para gerenciamento de livros, desenvolvida com **Java
21**, **Spring Boot** e **PostgreSQL**. O sistema permite cadastrar,
listar, editar e excluir livros.

O projeto utiliza uma arquitetura em camadas e disponibiliza uma API
REST. O banco de dados PostgreSQL é executado em contêiner por meio do
Docker Compose; a aplicação Spring Boot é executada diretamente no
sistema operacional hospedeiro.

## Tecnologias utilizadas

-   Java 21
-   Spring Boot 4.1.2
-   Spring Data JPA
-   Maven 3.9.12
-   PostgreSQL 18
-   Docker Engine e Docker Compose
-   HTML, CSS e JavaScript
-   Bootstrap 5
-   Git e GitHub

## Pré-requisitos

Instale as ferramentas abaixo antes de iniciar:

1.  **Git**, para clonar o repositório.
2.  **JDK 21**, para executar a aplicação Java.
3.  **Maven 3.9.12 ou compatível**, para compilar e empacotar o projeto.
4.  **Docker com Docker Compose**, para executar o banco de dados.

O Docker Desktop já inclui o Docker Compose e está disponível para
Windows e macOS. Em distribuições GNU/Linux, instale o Docker Engine e o
plugin Docker Compose conforme a documentação oficial.

Links oficiais: - [Git](https://git-scm.com/downloads) - [Java /
JDK](https://www.oracle.com/java/technologies/downloads/) -
[Maven](https://maven.apache.org/install.html) - [Docker
Desktop](https://www.docker.com/products/docker-desktop/) - [Instalação
do Docker Engine no
GNU/Linux](https://docs.docker.com/engine/install/) - [Plugin Docker
Compose](https://docs.docker.com/compose/install/)

## 1. Clonar o repositório

O comando é o mesmo nos três sistemas operacionais.

``` bash
git clone https://github.com/rvianadev/biblioteca.git
cd biblioteca
```

## 2. Iniciar o banco de dados

Antes de iniciar a aplicação, abra o Docker Desktop (Windows/macOS) ou
confirme que o serviço Docker está ativo (GNU/Linux).

### GNU/Linux

Se sua conta precisa de privilégios administrativos para executar o
Docker:

``` bash
sudo docker compose up -d
```

Se o Docker estiver configurado para uso sem `sudo`, execute:

``` bash
docker compose up -d
```

### Windows (PowerShell) e macOS (Terminal)

Com o Docker Desktop em execução, execute:

``` bash
docker compose up -d
```

O Compose cria e inicia o contêiner `biblioteca-db`, baseado na imagem
`postgres:18`.

### Verificar o contêiner

Em qualquer sistema operacional, use:

``` bash
docker compose ps
```

No GNU/Linux, acrescente `sudo` caso seja necessário para executar
comandos Docker. Aguarde até que o estado do serviço indique que o
contêiner está em execução e saudável (`healthy`).

### Configuração do banco de dados

O ambiente de desenvolvimento utiliza os seguintes parâmetros, definidos
no `compose.yaml`:

  Parâmetro                        Valor
  -------------------------------- ------------------
  Banco de dados                   `biblioteca`
  Usuário                          `biblioteca`
  Senha                            `biblioteca_dev`
  Porta no computador hospedeiro   `5433`
  Porta no contêiner               `5432`

Os dados são armazenados no volume nomeado `postgres_data`,
preservando-os quando o contêiner é parado ou recriado. As credenciais
acima destinam-se exclusivamente ao ambiente local de desenvolvimento;
não as utilize como credenciais de produção.

## 3. Compilar a aplicação

Com o terminal aberto na pasta do projeto, execute:

``` bash
mvn clean package -DskipTests
```

O Maven gera o arquivo JAR em `target/biblioteca-0.0.1-SNAPSHOT.jar`.

## 4. Executar a aplicação

Com o banco de dados em execução, inicie a aplicação:

``` bash
java -jar target/biblioteca-0.0.1-SNAPSHOT.jar
```

O comando é igual no GNU/Linux, Windows (PowerShell) e macOS (Terminal),
desde que o JDK 21 esteja instalado e disponível no `PATH`.

Abra o navegador no endereço:

<http://localhost:8080>

A aplicação apresenta o formulário de cadastro e a listagem de livros. A
API REST está disponível no caminho `/api/livros`.

> **Observação:** o frontend utiliza Bootstrap 5 por CDN; portanto, é
> necessária uma conexão com a internet para carregar os arquivos do
> framework.

## 5. Encerrar o ambiente

Para encerrar a aplicação, pressione `Ctrl+C` no terminal em que o JAR
está sendo executado.

Em outro terminal, na pasta do projeto, pare e remova o contêiner:

``` bash
docker compose down
```

No GNU/Linux, use `sudo` antes do comando caso sua configuração do
Docker exija privilégios administrativos.

O comando `docker compose down` preserva o volume `postgres_data`. Para
remover também o volume e **apagar os dados armazenados no banco**,
execute:

``` bash
docker compose down -v
```

Use a opção `-v` somente se realmente desejar excluir os dados
persistidos.

## Estrutura básica do projeto

``` text
biblioteca/
├── compose.yaml
├── pom.xml
├── README.md
└── src/
    └── main/
        ├── java/
        │   └── ... (código Java)
        └── resources/
            ├── application.yaml
            └── static/
                ├── index.html
                ├── css/
                └── js/
```

## Repositório

Código-fonte: <https://github.com/rvianadev/biblioteca>
