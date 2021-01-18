import express from 'express';

const AuthenticateRouter = express.Router();

import Jwt from 'jsonwebtoken';

import { doLogin } from '../../Models/Login/Login';

//Arquivo com um Hash q sera utilizado para gerar o Token
const secrectHash = require('../../Config/jwt');

//Autenticacao JWT
AuthenticateRouter.post('/Authenticate', async (req, res) =>{
    
    try
    {
        const user = { username: req.body.username, password: req.body.password};

        const responseModels = await doLogin(user);

        const token = Jwt.sign({ idUsuario: responseModels.IDUsuario},secrectHash.secret, {
            expiresIn: 86400,
        })

        if(responseModels.status === 200)
            res.status(200).send({IDUsuario: responseModels.IDUsuario,token})
        if(responseModels.status === 400)
            res.status(400).send({message: responseModels.message})
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
})

module.exports = AuthenticateRouter;