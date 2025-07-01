import { where } from "sequelize";
import Cliente from "../model/ClienteModel.js";

async function list(req, res) {
    const response = await Cliente.findAll();
    res.json(response);
}

async function select(req, res) {
    const id = req.params.id;
    const response = await Cliente.findByPk(id);
    res.json(response);
}

async function create(req, res) {
    const response = await Cliente.create(req.body);
    res.json(response);
}

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