import cors from "cors";
import express from "express";
import banco from "./server.js";
import caminhao from "./src/controller/CaminhaoController.js";
import carga from "./src/controller/CargaController.js";
import cliente from "./src/controller/ClienteController.js";
import despacho from "./src/controller/DespachoController.js";
import endereco from "./src/controller/EnderecoController.js";
import frete from "./src/controller/FreteController.js";
import motorista from "./src/controller/MotoristaController.js";
import 'dotenv/config'

try {
    await banco.authenticate();
    console.log('Conexão realizada com sucesso!');
} catch (error) {
    console.error('Erro ao conectar banco de dados:', error);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/caminhao', caminhao.list);
app.post('/caminhao', caminhao.create);
app.get('/caminhao/:id', caminhao.select);
app.put('/caminhao/:id', caminhao.update);
app.delete('/caminhao/:id', caminhao.del);

app.get('/carga', carga.list);
app.post('/carga', carga.create);
app.get('/carga/:id', carga.select);
app.put('/carga/:id', carga.update);
app.delete('/carga/:id', carga.del);

app.get('/cliente', cliente.list);
app.post('/cliente', cliente.create);
app.get('/cliente/:id', cliente.select);
app.put('/cliente/:id', cliente.update);
app.delete('/cliente/:id', cliente.del);

app.get('/despacho', despacho.list);
app.post('/despacho', despacho.create);
app.get('/despacho/:id', despacho.select);
app.put('/despacho/:id', despacho.update);
app.delete('/despacho/:id', despacho.del);

app.get('/endereco', endereco.list);
app.post('/endereco', endereco.create);
app.get('/endereco/:id', endereco.select);
app.put('/endereco/:id', endereco.update);
app.delete('/endereco/:id', endereco.del);

app.get('/frete', frete.list);
app.post('/frete', frete.create);
app.get('/frete/:id', frete.select);
app.put('/frete/:id', frete.update);
app.delete('/frete/:id', frete.del);
app.get('/frete/:cep1/:cep2', frete.calcularFrete);

app.get('/motorista', motorista.list);
app.post('/motorista', motorista.create);
app.get('/motorista/:id', motorista.select);
app.put('/motorista/:id', motorista.update);
app.delete('/motorista/:id', motorista.del);

app.listen(process.env.API_PORT, () => {console.log('Servidor Aberto!')});
