import express from 'express';

const RegisterRouter = express.Router();

//import da Models
import { Register } from '../../Models/Login/Login';

//Autenticacao JWT
RegisterRouter.post('/Register', async (req, res) => {
    try{
        const user = { 
                 user: req.body.user
                ,username: req.body.username
                ,password: req.body.password
                ,idTipoUser: req.body.idTipoUser 
            };

        const responseModels = await Register(user);
        
        if(responseModels.status === 200)
            res.status(200).send({IdUser: responseModels.idUser})
        if(responseModels.status === 409)
            res.status(409).send({message: responseModels.message})
    
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})



module.exports = RegisterRouter;