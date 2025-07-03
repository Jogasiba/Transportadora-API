import Endereco from "../model/EnderecoModel.js";

// Função para listar todos os endereços
async function list(req, res) {
    const response = await Endereco.findAll();
    res.json(response);
}

// Função para listar um endereço em específico com o ID
async function select(req, res) {
    const id = req.params.id;
    const response = await Endereco.findByPk(id);
    res.json(response);
}

// Função para inserir um novo endereço
async function create(req, res) {
    const response = await Endereco.create(req.body);
    res.json(response);
}

// Função para atualizar os dados de um endereço
async function update(req, res) {
    const cep = req.body.cep;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const cidade = req.body.cidade;
    const complemento = req.body.complemento;

    const endereco_id = req.params.id;

    const response = await Endereco.update(
        {cep, rua, numero, cidade, complemento},
        {where: {endereco_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

// Função para deletar um endereço
async function del(req, res) {
    const endereco_id = req.params.id;
    
    const response = await Endereco.destroy({where: {endereco_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};