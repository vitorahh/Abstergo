import {Request,Response} from 'express';

import Jwt from 'jsonwebtoken';

const hash = require('../Config/jwt');

export function validation(req:Request, res:Response, next:any){
    const authHeader = req.headers.authorization;

    //verifica se existe authorization
    if(!authHeader)
        return res.status(401).send({error : "No Token Provided"})

    //separa o token da palavra Bearer
    const parts = authHeader.split(' ');
   
    //validação se existe o Token
    if(parts.length != 2)
        return res.status(401).send({error : "Token Error"})

    const [scheme, token] = parts;
    
    //validação se o token esta bem formatado
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error : "Token malformatted"})

    //validação se o token e valido
    Jwt.verify(token, hash.secret, (err:any, decoded:any) =>{
        if(err)
        {
            return res.status(401).send({error : "Token invalid"})
        }

        req.body.userID = decoded.UserID;

        return next();
    })
}
