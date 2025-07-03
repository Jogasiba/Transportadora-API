import Endereco from "../model/EnderecoModel.js";

// Função para listar todos os endereços (usado para alimentar as tabelas no site)
async function list(req, res) {
    const response = await Endereco.findAll();
    res.json(response);
}

// Função para listar um endereço em específico com o ID (usado para exibir dados atuais na hora de editar um registro)
async function select(req, res) {
    const id = req.params.id;
    const response = await Endereco.findByPk(id);
    res.json(response);
}

// Função para inserir um novo endereço (recebe um body com as informações do formulário para a inserção)
async function create(req, res) {
    const response = await Endereco.create(req.body);
    res.json(response);
}

// Função para atualizar os dados de um endereço (recebe um id do registro que queira alterar 
// e um body com as informações do formulário para realizar a alteração do mesmo)
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

// Função para deletar um endereço (recebe um id do item da tabela que a pessoa apertar para deletar)
async function del(req, res) {
    const endereco_id = req.params.id;
    
    const response = await Endereco.destroy({where: {endereco_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};