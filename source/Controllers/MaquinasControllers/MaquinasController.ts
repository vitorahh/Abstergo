import express from 'express';

const MaquinasRouter = express.Router();

import { lstMaquinas } from '../../Models/Maquinas/Maquinas';
import { validation } from '../../Middleware/Authen';



//Autenticacao JWT
MaquinasRouter.use(validation);

MaquinasRouter.post('/listMaquinas', async (req, res) =>{
    try
    {
        const responseModels = await lstMaquinas();

        if(responseModels.status === 200)
            res.status(200).send(responseModels.lstMaquinas)
        if(responseModels.status === 400)
            res.status(400).send({message: responseModels.message})
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
})

module.exports = MaquinasRouter;