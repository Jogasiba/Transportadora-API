import Endereco from "../model/EnderecoModel.js";

async function list(req, res) {
    const response = await Endereco.findAll();
    res.json(response);
}

async function select(req, res) {
    const id = req.params.id;
    const response = await Endereco.findByPk(id);
    res.json(response);
}

async function create(req, res) {
    const response = await Endereco.create(req.body);
    res.json(response);
}

async function update(req, res) {
    const cep = req.body.cep;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const cidade = req.body.cidade;
    const complemento = req.body.complemento;

    const endereco_id = req.params.id;

    const response = await Carga.update(
        {cep, rua, numero, cidade, complemento},
        {where: {endereco_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

async function del(req, res) {
    const endereco_id = req.params.id;
    
    const response = await Endereco.destroy({where: {endereco_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};