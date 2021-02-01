const app = require('./server');

app.listen(9001, () => {
    console.log('API Documentation - http://localhost:9001/api-docs/');
});