import express from 'express';
import bodyParser from 'body-parser';
const app = express();

//Controllers/Routers
const RegisterRouter = require('./Controllers/Usercontrollers/Register');
const Authentication = require('./Controllers/Usercontrollers/Authentication');
const Maquinas = require('./Controllers/MaquinasControllers/Maquinas');

//middleware do Bodyparser para tratar as Requisicoes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/User', RegisterRouter);
app.use('/User', Authentication);
app.use('/Maquinas', Maquinas);

app.listen(9001);

//Iniciar o Tsconfig 