# 📦 Transportadora API

API desenvolvida em NODE.JS para a administração e coleta de dados de uma transportadora

---

## 📁 Estrutura do Projeto

```bash
Transportadora-API/
├── src/                    # Código fonte da aplicação
│   ├── controllers/        # Controladores da API
│   └── models/             # Modelos do Sequelize
│
├── .env                    # Chaves de APIs e informações do banco de dados local
├── banco.sql               # Backup do banco de dados
├── index.js                # Index contendo rotas da API
├── package.json            # Bibliotecas utilizadas
└── server.js               # Conexão com o banco de dados
```


## 📥 Configurando Banco

1. Abra o **PgAdmin4** no seu pc

2. Crie um novo banco de dados

3. Faça o backup do banco:

```bash
/.banco.sql
```


## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Jogasiba/Transportadora-API
```

```bash
cd Transportadora-API
```

```bash
code .
```

2. Configure o .env com suas informações:

Crie um arquivo na pasta raiz do projeto com o nome **.env** com as seguinte informações:

```env
API_PORT=5000                   # Insira a porta aqui, por padrão, é usada a 5000
DB_HOST=localhost               # Insira o Host
DB_PORT=5432                    # Insira a porta do banco (para Postgres: 5432)
DB_NAME=nomedobancocriado       # Insira o nome do banco criado
DB_USER=postgres                # Insira o seu user do banco
DB_PASSWORD=suasenha            # Insira a sua senha do banco
DB_DIALECT=postgres             # Insira o seu dialect do banco
```

**OBS:** CERTIFIQUE-SE QUE AS INFORMAÇÕES ACIMA CONFEREM COM SUAS CONFIGURAÇÕES!

3. Instale as dependências

```bash
npm install
```

4. Inicialize a API

```bash
npm start
```

5. Utilize a API

```bash
http://localhost:{suaporta}/{rotadesejada}
```


## 💻 Métodos de uso

- **caminhoes** --> Informações sobre os caminhões
- **motorista** --> Informações sobre os motoristas
- **carga**     --> Informações sobre as cargas
- **cliente**   --> Informações sobre os clientes
- **endereco**  --> Endereços cadastrados
- **despacho**  --> Informações sobre os despachos
- **frete**     --> Calcular o frete com base no CEP

### 🚚 Caminhões
- *GET*    `/caminhao`     --> Lista todos os caminhões
- *GET*    `/caminhao/:id` --> Busca caminhão por ID
- *POST*   `/caminhao`     --> Cria novo caminhão
- *PUT*    `/caminhao/:id` --> Atualiza caminhão
- *DELETE* `/caminhao/:id` --> Remove caminhão

### 🧑‍✈️ Motoristas
- *GET*    `/motorista`     --> Lista todos os motoristas
- *GET*    `/motorista/:id` --> Busca motorista por ID
- *POST*   `/motorista`     --> Cria novo motorista
- *PUT*    `/motorista/:id` --> Atualiza motorista
- *DELETE* `/motorista/:id` --> Remove motorista

### 📦 Cargas
- *GET*    `/carga`     --> Lista todos as cargas
- *GET*    `/carga/:id` --> Busca carga por ID
- *POST*   `/carga`     --> Cria nova carga
- *PUT*    `/carga/:id` --> Atualiza carga
- *DELETE* `/carga/:id` --> Remove carga

### 🧑‍💻 Clientes
- *GET*    `/cliente`     --> Lista todos os clientes
- *GET*    `/cliente/:id` --> Busca cliente por ID
- *POST*   `/cliente`     --> Cria novo cliente
- *PUT*    `/cliente/:id` --> Atualiza cliente
- *DELETE* `/cliente/:id` --> Remove cliente

### 📌 Endereços
- *GET*    `/endereco`     --> Lista todos os enderecos
- *GET*    `/endereco/:id` --> Busca endereco por ID
- *POST*   `/endereco`     --> Cria novo endereco
- *PUT*    `/endereco/:id` --> Atualiza endereco
- *DELETE* `/endereco/:id` --> Remove endereco

### ✅ Despacho
- *GET*    `/despacho`     --> Lista todos os despachos
- *GET*    `/despacho/:id` --> Busca despacho por ID
- *POST*   `/despacho`     --> Cria novo despacho
- *PUT*    `/despacho/:id` --> Atualiza despacho
- *DELETE* `/despacho/:id` --> Remove despacho

### 💰 Frete
- *GET*    `/frete/:cep1/:cep2` --> Calcula o frete com base na distância entre dois CEPs