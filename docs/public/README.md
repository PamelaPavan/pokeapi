<h1 align="center"> INTERFACE PARA CONSULTA DA API PÚBLICA POKÉAPI</h1>


<h2 align="center"> <i>Saiba mais sobre os Pokemóns utilizando esta interface</i></h2>


![Pokedex|Pokemon](img/PokedexDuelo.png)




## Introdução

<p align="justify">

Este projeto é uma aplicação web interativa que oferece uma interface para consulta da API pública POKÉAPI. O sistema possui dois modos principais: **Pokedex** e **Duelo**. No modo Pokedex, o usuário pode visualizar informações detalhadas sobre os Pokémon. No modo Duelo, o usuário pode selecionar dois Pokémon para batalhar entre si. O sistema é containerizado com Docker e hospedado na AWS.
</p>


## URL para acesso à página

Link: (http://3.228.151.74/)


## Entendimento dos Requisitos

### Funcionais
<p align="justify">
- O sistema deve oferecer uma interface para consulta à API pública POKÉAPI.
</p>
<p align="justify">
- Deve possuir dois modos: Pokedex e Duelo.
</p>
<p align="justify">
- Modo Pokedex: O usuário pode visualizar informações sobre os Pokémon.
</p>
<p align="justify">
- Modo Duelo: O usuário pode selecionar dois Pokémon para duelarem entre si.
</p>
<p align="justify">
- O sistema deve estar containerizado com Docker e hospedado na AWS
</p>

### Não funcionais
<p align="justify">
- Performance: O sistema deve responder às consultas de forma eficiente.
</p>




## Arquitetura do Projeto:


<p align="center">
    Optamos por uma arquitetura simples e monolítica, considerando que não há banco de dados e o sistema é relativamente pequeno.
</p>


<p align="center">
  <img src="Arquitetura.png" alt="ArquiteturaDRAWio">
</p>


**Frontend**
<p align="justify">

- Uma única página HTML que alterna entre os modos Pokedex e Duelo.
- CSS para estilização.
- JavaScript para lógica e manipulação do DOM.
</p>

**Backend**
<p align="justify">

- Node.js server que serve a página HTML e interage com a POKÉAPI.
</p>

**Infraestrutura**
<p align="justify">

- Container Docker que contém o servidor Node.js.
- Implementação na AWS utilizando EC2 para hospedar o container Docker.
</p>


## Estrutura de pastas

 ```sh
sprints-2-3-pb-aws-abril/
│
├── docs/
│   ├── README.md
│   └── Pokedex.png
│
├── src/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   ├── public/
│   │   └── index.html
│   ├── server/
│   │   └── server.js
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── .gitignore
│
└── node_modules/ 
```


## Como executar o projeto
<p align="justify">


### Pré-requisitos
- Docker instalado
- Node.js instalado


### Passos
1) Clone o repositório:
    ```sh
    git clone -b grupo-7 https://github.com/Compass-pb-aws-2024-ABRIL/sprints-2-3-pb-aws-abril.git
    cd sprints-2-3-pb-aws-abril
    ```
2) Instale as dependências:
    ```sh
    npm install express
    ```
     ```sh
    npm install axios
    ```
     ```sh
    npm install helmet
    ```
    ```sh
    npm install node-cache
    ```
    
3) Rode a aplicação:
    ```sh
    npm start
    ```
4) Para rodar com Docker:


    <i>Construa a imagem Docker:</i>
    ```sh
    docker build -t sprints-2-3-pb-aws-abril .
    ```
    <i>Rode o contêiner:</i>
    ```sh
    docker run -p 3000:3000 sprints-2-3-pb-aws-abril
    ```
5) Acesse no navegador:
    [http://localhost:3000](http://localhost:3000)
</p>




## Como Utilizar
<p align="justify">


### Para a utilização do modo Pokedex


1) Clique no botão "Pokedex";
2) Clique no campo de busca no canto inferior esquerdo da pokedex;
3) Insira o nome ou o id de um pokemón;
4) Selecione o tipo de informação que deseja saber sobre o pokemón escolhido ('Habilidade', 'Efetividade', 'Defesa', 'Estatura', 'Movimentos', 'Característica' ou 'Tipo').


### Para a utilização do modo Duelo


1) Clique no botão "Duelo";
2) Clique no campo de busca do jogador 1, localizado no canto inferior esquerdo;
3) Insira o nome ou id do Pokemón para ser o jogador 1;
4) Clique no campo de busca do jogador 2, localizado no canto inferior direito;
5) Insira o nome ou id do Pokemón para ser o jogador 2;
6) Clique em inserir;
7) Clique no botão "Duelar";
8) O resultado do duelo aparecerá no campo de informações na tela.
</p>




## Detalhes do Desenvolvimento
<p align="justify">


### Passos


1) Escolher uma API pública;


2) Consumir esta API utilizando NodeJS;


3) Subir esta API utilizando Docker;


4) Criar uma página html para fazer consultas à API construída em NodeJS;


5) Subir o projeto NodeJS em Docker na cloud AWS.
</p>




## Recursos


### API
<p align="justify">
- **PokeAPI**: Utilizamos a [PokeAPI](https://pokeapi.co/) para obter dados sobre Pokémon. Esta API gratuita fornece informações detalhadas sobre Pokémon, habilidades, tipos e muito mais.
</p>

### Backend
<p align="justify">
- **Node.js**: O backend da aplicação foi desenvolvido em [Node.js](https://nodejs.org/), uma plataforma JavaScript que permite construir aplicativos de rede escaláveis e de alta performance.
- **Express.js**: Utilizamos o [Express.js](https://expressjs.com/) como framework para estruturar o servidor e gerenciar as rotas.
</p>

### Containerização
<p align="justify">
- **Docker**: Utilizamos [Docker](https://www.docker.com/) para containerizar nossa aplicação, garantindo que ela rode de maneira consistente em diferentes ambientes. O projeto inclui um `Dockerfile` para criar a imagem da aplicação.
</p>

### Cloud
<p align="justify">
- **AWS EC2**: A aplicação foi implantada em uma instância EC2 (Elastic Compute Cloud) da [Amazon Web Services (AWS)](https://aws.amazon.com/ec2/). Utilizamos EC2 pela flexibilidade e escalabilidade que oferece, permitindo ajustar os recursos computacionais conforme a demanda.
</p>


### Outras Ferramentas e Tecnologias
<p align="justify">
- **npm**: Utilizamos o [npm](https://www.npmjs.com/) como gerenciador de pacotes para instalar e gerenciar as dependências do projeto.
</p>
<p align="justify">
- **Git**: Utilizamos o [Git](https://git-scm.com/) para controle de versão do código-fonte.
<p align="justify">
- **GitHub**: Hospedamos o repositório do código-fonte no [GitHub](https://github.com/), facilitando a colaboração e o controle de versão.
</p>
<p align="justify">
- **Youtube**: Utilizamos um vídeo do canal **Manual do Dev**, chamado [Como criar uma Pokedex com HTML, CSS e JavaScript | Projeto Completo #javascript #html #css](https://youtu.be/SjtdH3dWLa8?si=aLzyVfI6eOfjudDb) como base para o HTML e CSS.
</p>



## Dificuldades Encontradas
<p align="justify">
1) A primeira dificuldade envolveu a divisão do trabalho para que fossem distribuídas as tarefas. Então contamos com a proatividade de cada integrante para que verificasse as demandas faltantes e as realizasse. Mas, essa não é a melhor estratégia para uma equipe. Com isso, pudemos aprender e faremos diferente na próxima oportunidade.
</p>
<p align="justify">
2) Selecionar as rotas da API para serem consumidas. Dentre tantas possibilidades, precisamos filtrar o que parecia mais interessante.
</p>
<p align="justify">
3) Aplicar às novas tecnologias aprendidas, como Node.js, AWS e Docker.
</p>



## Licença


<p align="justify">
    Este projeto é distribuído sem uma licença explícita e é destinado ao uso educacional e de entretenimento.
</p>




## Autores

**Arienne Alves Navarro**
- GitHub: https://github.com/ArienneNavarro
- Email: ariennealves465@gmail.com


**Elizeu Santos Moreira Junior**
- GitHub: github.com/lizeuzeu
- Email:elizeumoreira737@gmail.com


**Pâmela Aliny Cleto Pavan**
- Linkedin: www.linkedin.com/in/pâmela-pavan-607693190
- GitHub: https://github.com/PamelaPavan
- Email : pamelaaliny@gmail.com


**Thales Rodrigues Resende**
- Github: https://github.com/tthaless
- Email: thaleesresende@gmail.com
