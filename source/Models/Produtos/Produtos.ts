
import { knex } from '../../Database/configDataBase';

import { produtos } from '../../Interfaces/produtos';

export async function insertproducts(Props:produtos){
    try{
        
        knex.initialize();

        await knex('TB_ST_PRODUTOS')
        .insert({
            DS_PRODUTO:Props.DS_PRODUTO,
            ID_TIPO_PRODUTO: Props.ID_TIPO_PRODUTO
        })
       
       return { Status:201, valid:true }
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao cadastrar Produto`);
    }
    finally{
        knex.destroy();
     }
 }

export async function Updateproducts(Props:produtos){
    try{

        knex.initialize();
        
        //O update pelo KnexJS tem q ser feito por Rows
        const TableProdutos = knex('TB_ST_PRODUTOS').where({ID_PRODUTO : Props.ID_PRODUTO});

        if(Props.ID_PRODUTO)
        {
            if(Props.DS_PRODUTO)
                await TableProdutos.update({DS_PRODUTO:Props.DS_PRODUTO})

            if(Props.ID_TIPO_PRODUTO)
                await TableProdutos.update({ID_TIPO_PRODUTO: Props.ID_TIPO_PRODUTO})

            if(Props.FL_STATUS != undefined)
                await TableProdutos.update({FL_STATUS: Props.FL_STATUS})
        }
        return { Status:204, valid:true };
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao Atualizar Produto ${err.message}`);
    }
    finally{
        knex.destroy();
     }
 }


 
export async function Deleteproducts(ID_PRODUTO:number){
    try{

        knex.initialize();
       
        //O update pelo KnexJS tem q ser feito por Rows
        await knex('TB_ST_PRODUTOS')
            .where({ID_PRODUTO : ID_PRODUTO}).del();

        return { Status:200, valid:true };
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao Atualizar Produto ${err.message}`);
    }
    finally{
        knex.destroy();
     }
 }