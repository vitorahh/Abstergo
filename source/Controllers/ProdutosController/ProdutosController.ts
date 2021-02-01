import express from 'express';

const ProdutosRouter = express.Router();

import { validation } from '../../Middleware/Authen';

import { Deleteproducts, insertproducts, Listproduct, Oneproduct, Updateproducts } from '../../Models/Produtos/Produtos';


//Autenticacao JWT
ProdutosRouter.use(validation);

ProdutosRouter.post('/Cadastro', async (req, res) => {
    try
    {
       const response =  await insertproducts(req.body)
       if(response.Status == 201)
        res.status(201).send({
                                 produtoID: response.ProdutoID[0]
                                ,message: 'Produto Cadastrado com sucesso'
                            }) 
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

ProdutosRouter.put('/Atualizar', async (req, res) => {
    try
    {
        const response =  await Updateproducts(req.body)
        console.log(response)
        if(response.Status == 200)
            res.status(200).send({message: 'Produto Atualizado com sucesso'})
        else 
            res.status(400).send({message: 'Erro ao tentar atualizar produto'})
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

ProdutosRouter.delete('/Deletar/:ProdutoID', async (req, res) => {
    try
    {   
        const response =  await Deleteproducts(parseInt(req.params.ProdutoID))
        if(response.Status == 200)
            res.status(200).send({message: 'Produto Deletado com sucesso'})
        else 
            res.status(400).send({message: 'Erro ao tentar atualizar produto'})
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

ProdutosRouter.get('/GetProduto/:ProdutoID', async (req, res) => {
    try
    {   
        console.log(req);
        const response =  await Oneproduct(parseInt(req.params.ProdutoID))
        if(response.Status == 200)
            res.status(200).send(response.produto)
        else 
            res.status(400).send({message: 'Erro ao tentar atualizar produto'})
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

ProdutosRouter.get('/listProdutos/', async (req, res) => {
    try
    {   
        const response =  await Listproduct()
        if(response.Status == 200)
            res.status(200).send({Produtos: response.produtos})
        else 
            res.status(400).send({message: 'Erro ao tentar atualizar produto'})
    }
    catch(err)
    {
        res.status(500).send({error: err.message})
    }
})

module.exports = ProdutosRouter;