const express = require('express');
const server = express();
const routes = require('./routes');

server.set("view engine", "ejs");

server.use(express.urlencoded({ extended: true }));

server.use(express.static("public"));

server.use(routes);

server.listen(3000);
