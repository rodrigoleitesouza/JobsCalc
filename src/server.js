const express = require('express');
const server = express();

server.get('/', (request, response) => {
  return response.send('OIE22222!!');
});

server.listen(3000, () => console.log('rodando9999999'));
