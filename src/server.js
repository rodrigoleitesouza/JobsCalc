const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

server.set("view engine", "ejs");

server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded({ extended: true }));

server.use(express.static("public"));

server.use(routes);

server.listen(3333);

console.log("-------------------------------")
console.log("| Server running like a truck |")
console.log("-------------------------------")
