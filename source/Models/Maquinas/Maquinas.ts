import { knex } from '../../Database/configDataBase';


export async function lstMaquinas(){
    try{
       
      const Maquinas = 
          await knex('TB_ST_MAQUINA_FACAS').select('*')
       
       if(!Maquinas[0])
          return { status: 201, message: 'Não Existe Maquinas cadastradas!'}
 
       return { status:200, lstMaquinas:Maquinas }
    }
    catch(err)
    {
       throw new Error(`Ocorreu um erro ao tentar logar`);
    }
 }