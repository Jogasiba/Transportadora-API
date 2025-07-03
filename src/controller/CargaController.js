import Carga from "../model/CargaModel.js";
import axios from "axios";

// Função para listar todas as cargas (usado para alimentar as tabelas no site)
async function list(req, res) {
    const response = await Carga.findAll();
    res.json(response);
}

// Função para listar uma carga em específico com o ID (usado para exibir dados atuais na hora de editar um registro)
async function select(req, res) {
    const id = req.params.id;
    const response = await Carga.findByPk(id);
    res.json(response);
}

// Função para inserir uma novo carga (recebe um body com as informações do formulário para a inserção)
async function create(req, res) {
    let cliente = req.body.cliente_id;
    let endereco = req.body.endereco_id;
    if (cliente) {
        const clientes = await axios.get(`http://localhost:${process.env.API_PORT}/cliente/${cliente}`)
        if (!clientes) {
            res.status(404).send('Cliente não encontrado!')
        }

        const enderecos = await axios.get(`http://localhost:${process.env.API_PORT}/endereco/${endereco}`)
        if (!enderecos) {
            res.status(404).send('Endereco não encontrado!')
        }
    }

    const response = await Carga.create(req.body);
    res.json(response);
}

// Função para atualizar os dados de uma carga (recebe um id do registro que queira alterar 
// e um body com as informações do formulário para realizar a alteração do mesmo)
async function update(req, res) {
    const origem = req.body.origem;
    const destino = req.body.destino;
    const peso = req.body.peso;
    const tipo_carga = req.body.tipo_carga;
    const status = req.body.status;
    const cliente_id = req.body.cliente_id;
    const endereco_id = req.body.endereco_id;

    const carga_id = req.params.id;

    const response = await Carga.update(
        { tipo_carga, origem, destino, peso, status, cliente_id, endereco_id },
        { where: { carga_id } }
    );
    res.json(`Linhas alteradas: ${response}`);
}

// Função para deletar uma carga (recebe um id do item da tabela que a pessoa apertar para deletar)
async function del(req, res) {
    const carga_id = req.params.id;

    const response = await Carga.destroy({ where: { carga_id } });
    res.json(`Linhas alteradas: ${response}`);
}

export default { list, select, create, update, del };