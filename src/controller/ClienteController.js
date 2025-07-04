import Cliente from "../model/ClienteModel.js";

// Função para listar todos os clientes (usado para alimentar as tabelas no site)
async function list(req, res) {
    const response = await Cliente.findAll();
    res.json(response);
}

// Função para listar um cliente em específico com o ID (usado para exibir dados atuais na hora de editar um registro)
async function select(req, res) {
    const id = req.params.id;
    const response = await Cliente.findByPk(id);
    res.json(response);
}

// Função para inserir um novo cliente (recebe um body com as informações do formulário para a inserção)
async function create(req, res) {
    const response = await Cliente.create(req.body);
    res.json(response);
}

// Função para atualizar os dados de um cliente (recebe um id do registro que queira alterar 
// e um body com as informações do formulário para realizar a alteração do mesmo)
async function update(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const endereco_id = req.body.endereco_id;

    const cliente_id = req.params.id;

    const response = await Carga.update(
        {nome, email, senha, endereco_id},
        {where: {cliente_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

// Função para deletar um cliente (recebe um id do item da tabela que a pessoa apertar para deletar)
async function del(req, res) {
    const cliente_id = req.params.id;
    
    const response = await Cliente.destroy({where: {cliente_id}});
    res.json(`Linhas alteradas: ${response}`);
}

async function login(req, res) {
    const email = req.params.email;
    const senha = req.params.senha;
    const response = await Cliente.findOne({where: {email, senha}});
    res.json(response);
}

export default {list, select, create, update, del, login};