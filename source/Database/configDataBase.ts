require('dotenv').config();

export const knex = require('knex')({
    client: 'mssql',
    connection: {
      host : process.env.HOST,
      user :  process.env.USER,
      password :  process.env.PASSWORD,
      database : process.env.DATABASE,"options": {
        "encrypt": true,
        "enableArithAbort": true
        }
    }
  });