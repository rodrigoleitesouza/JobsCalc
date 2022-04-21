const express = require('express');
const server = express();

server.get('/', (request, response) => {
  return response.send('OIE!!');
});

server.listen(3000, () => console.log('rodando!'));
