import Despacho from "../model/DespachoModel.js";

async function list(req, res) {
    const response = await Despacho.findAll();
    res.json(response);
}

async function select(req, res) {
    const id = req.params.id;
    const response = await Despacho.findByPk(id);
    res.json(response);
}

async function create(req, res) {
    const response = await Despacho.create(req.body);
    res.json(response);
}

async function update(req, res) {
    const dt_inic = req.body.dt_inic;
    const dt_fim = req.body.dt_fim;
    const status = req.body.status;
    const cidade_despacho = req.body.cidade_despacho;
    const carga_id = req.body.carga_id;
    const motorista_id = req.body.motorista_id;

    const despacho_id = req.params.id;

    const response = await Despacho.update(
        {dt_inic, dt_fim, status, cidade_despacho, carga_id, motorista_id},
        {where: {despacho_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

async function del(req, res) {
    const despacho_id = req.params.id;
    
    const response = await Despacho.destroy({where: {despacho_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};