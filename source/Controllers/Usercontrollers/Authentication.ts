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

        const AccessToken = Jwt.sign(
                {UserID: responseModels.UserID}
                ,secrectHash.secret
                ,{expiresIn: 86400}
            )

        if(responseModels.Status === 200)
            res.status(200).send(
                {
                    UserID: responseModels.UserID
                    ,AccessToken
                })
        if(responseModels.Status === 400)
            res.status(400).send({message: responseModels.message})
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
})

module.exports = AuthenticateRouter;