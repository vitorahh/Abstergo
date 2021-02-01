const AppExpress = require('../server.ts');
const request = require('supertest');
let TokenAcccess = '';


//Authenticacao
describe('Test para Rotas de Authenticacao', () => {
    it('Authenticacao de Login JWT', async ()=>{
      
        const ResponseAPI = await request(AppExpress)
        .post('/User/Authenticate')
        .send({username:"vitorahh", password:"7652"})
        
        TokenAcccess = ResponseAPI.body.AccessToken;
        
        expect(ResponseAPI.statusCode).toEqual(200)
        expect(ResponseAPI.body).toHaveProperty('AccessToken');
        expect(ResponseAPI.body).toHaveProperty('UserID');
        
    })
    
    it('Usuario ou Senha Errados', async () => {

        const ResponseAPI = await request(AppExpress)
         .post('/User/Authenticate')
         .send({username:"JohnJohn", password:"123456"})
         
        expect(ResponseAPI.statusCode).toEqual(400)
        expect(ResponseAPI.body).toHaveProperty('message');

     })
});

//Produtos
describe('Test para Rotas de Produtos', () => {
    let ProdutoTest = 0;
    it('Listar Produtos', async ()=>{

        const ResponseAPI = await request(AppExpress)
            .get('/Produtos/listProdutos')
            .set("Authorization", "Bearer " + TokenAcccess)

        expect(ResponseAPI.statusCode).toEqual(200)
    })

    it('Cadastrar Produto', async ()=>{
        const ResponseAPI = await request(AppExpress)
            .post('/Produtos/Cadastro')
            .set("Authorization", "Bearer " + TokenAcccess)
            .send({
                     DS_PRODUTO: "Teste Produto Cadastro"
                    ,ID_TIPO_PRODUTO: 1
                  })
            ProdutoTest = ResponseAPI.body.produtoID;
        expect(ResponseAPI.statusCode).toEqual(201)
    })

    it('Deletar Produto', async ()=>{

        const ResponseAPI = await request(AppExpress)
            .delete(`/Produtos/Deletar/${ProdutoTest}`)
            .set("Authorization", "Bearer " + TokenAcccess)
            
        expect(ResponseAPI.statusCode).toEqual(200)
    })
});