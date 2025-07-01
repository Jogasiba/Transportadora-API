import Motorista from "../model/MotoristaModel.js";

async function list(req, res) {
    const response = await Motorista.findAll();
    res.json(response);
}

async function select(req, res) {
    const id = req.params.id;
    const response = await Motorista.findByPk(id);
    res.json(response);
}

async function create(req, res) {
    console.log(req.body)
    const response = await Motorista.create(req.body);
    res.json(response);
}

async function update(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const cnh = req.body.cnh;
    const contato = req.body.contato;
    const endereco_id = req.body.endereco_id;
    const caminhao_id = req.body.caminhao_id;

    const motorista_id = req.params.id;

    const response = await Motorista.update(
        {nome, cpf, cnh, contato, endereco_id, caminhao_id},
        {where: {motorista_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

async function del(req, res) {
    const motorista_id = req.params.id;
    
    const response = await Motorista.destroy({where: {motorista_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};