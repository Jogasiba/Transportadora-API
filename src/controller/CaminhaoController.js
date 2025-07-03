import Caminhao from "../model/CaminhaoModel.js";
import axios from "axios";

// Função para listar todos os caminhões (usado para alimentar as tabelas no site)
async function list(req, res) {
    const response = await Caminhao.findAll();
    res.json(response);
}

// Função para listar um caminhão em específico com o ID (usado para exibir dados atuais na hora de editar um registro)
async function select(req, res) {
    const id = req.params.id;

    const response = await Caminhao.findByPk(id);
    if(response == null){
        res.status(404).send('Caminhão não cadastrado.')
    }

    res.json(response);
}

// Função para inserir um novo caminhão (recebe um body com as informações do formulário para a inserção)
async function create(req, res) {
    try{
        let motorista = req.body.motorista_id;
        if(motorista){
            const motoristas = await axios.get(`http://localhost:${process.env.API_PORT}/motorista/${motorista}`)

            if(!motoristas){
                res.status(404).send('Motorista não encontrado!')
            }
        }

        const response = await Caminhao.create(req.body);
        res.json(`Caminhão ${response.caminhao_id} cadastrado com sucesso!`);
    }
    catch(e){
        res.status(500).send('Erro ao cadastrar caminhão: ', e);
    }
}

// Função para atualizar os dados de um caminhão (recebe um id do registro que queira alterar 
// e um body com as informações do formulário para realizar a alteração do mesmo)
async function update(req, res) {
    const placa = req.body.placa;
    const modelo = req.body.modelo;
    const capacidade = req.body.capacidade;
    const status = req.body.status;
    const tp_carroceria = req.body.tp_carroceria;
    const motorista_id = req.body.motorista_id;

    const caminhao_id = req.params.id;

    const response = await Caminhao.update(
        {status, placa, modelo, capacidade, tp_carroceria, motorista_id},
        {where: {caminhao_id}}
    );
    res.json(`Linhas alteradas: ${response}`);
}

// Função para deletar um caminhão (recebe um id do item da tabela que a pessoa apertar para deletar)
async function del(req, res) {
    const caminhao_id = req.params.id;
    
    const response = await Caminhao.destroy({where: {caminhao_id}});
    res.json(`Linhas alteradas: ${response}`);
}

export default {list, select, create, update, del};