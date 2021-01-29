import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const swaggerDocument = require('./Docs/SwaggerConfig.json');

//Documentação
const SwaggerUI = require('swagger-ui-express');


const app = express();


const RegisterRouter = require('./Controllers/Usercontrollers/Register');
const Authentication = require('./Controllers/Usercontrollers/Authentication');


//Rotas com Auth do sistemas
const Maquinas = require('./Controllers/MaquinasControllers/MaquinasController');
const Produtos = require('./Controllers/ProdutosController/ProdutosController');


//middleware do Bodyparser para tratar as Requisicoes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());





app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));


app.use('/User', RegisterRouter);

app.use('/User', Authentication);
app.use('/Maquinas', Maquinas);
app.use('/Produtos', Produtos);

app.listen(9001);

//Iniciar o Tsconfig 
//tsc --init