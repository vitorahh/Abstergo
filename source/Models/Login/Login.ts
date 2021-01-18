import { knex } from '../../Database/configDataBase';
import { hash, compare} from 'bcryptjs';

interface Register {
    user:string,
    username:string,
    password:string
}

export async function Register(user:Register){
   try{
        user.password = await hash(user.password, 10);
        
        const UserDTO =  {
              DS_NOME_USUARIO: user.user
             ,DS_LOGIN_USUARIO: user.username
             ,DS_PASSWORD_USUARIO: user.password
             ,FL_STATUS_USUARIO: true
             ,DS_IMG_USUARIO:'Não tem imagem'
            }

          const iduser = await knex('TB_SN_USUARIOS').where({DS_LOGIN_USUARIO: user.username}).select('ID_USUARIO')

          if(iduser.length > 0)
               return { status:409, message:'Usuario ja cadastrado'};
          else
          {
             const response = await knex('TB_SN_USUARIOS').insert(UserDTO).returning("ID_USUARIO")
             return {status: 200, idUser: response[0]}
          }
              
     }catch(err){
        throw new Error(`Ocorreu um erro ao efetuar o cadastro do usuario ${err.message}`);
   }
};

export async function doLogin(user:{ username:string, password:string }){
   try{
      const IDUsuario = 
         await knex('TB_SN_USUARIOS')
         .where({DS_LOGIN_USUARIO: user.username})
      
      if(!IDUsuario[0])
         return {status: 400, message: 'Usuario invalido!'}

      if(!await compare(user.password,IDUsuario[0].DS_PASSWORD_USUARIO))
         return {status: 400, message: 'Senha Invalida!'}

      return {status:200, IDUsuario:IDUsuario[0].ID_USUARIO}
   }catch(err){
      throw new Error(`Ocorreu um erro ao tentar logar`);
   }
}