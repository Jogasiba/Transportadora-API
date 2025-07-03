import Despacho from "../model/DespachoModel.js";

// Função para listar todos os despachos (usado para alimentar as tabelas no site)
async function list(req, res) {
    const response = await Despacho.findAll();
    res.json(response);
}

// Função para listar um despacho em específico com o ID (usado para exibir dados atuais na hora de editar um registro)
async function select(req, res) {
    const id = req.params.id;
    const response = await Despacho.findByPk(id);
    res.json(response);
}

// Função para inserir um novo despacho (recebe um body com as informações do formulário para a inserção)
async function create(req, res) {
    const response = await Despacho.create(req.body);
    res.json(response);
}

// Função para atualizar os dados de um despacho (recebe um id do registro que queira alterar 
// e um body com as informações do formulário para realizar a alteração do mesmo)
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

// Função para deletar um despacho (recebe um id do item da tabela que a pessoa apertar para deletar)
async function del(req, res) {
    const despacho_id = req.params.id;
    
    const response = await Despacho.destroy({where: {despacho_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};