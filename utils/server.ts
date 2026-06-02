import express from "express" // Importa o express
import routes from "../functions/users"; // Importa a const routes, feita no arquivo users.ts

const app = express(); // Cria uma const app, que recebe a função express
const port = 3000; // Cria uma const, onde diz qual a porta do servidor

app.listen(port, () => { // Verifica e cria um servidor na porta inserida
    console.log("Servidor Rodando!") // Se estiver rodando, exibe no console "Servidor Rodando"
});

app.use(express.json()) // Faz com que o express consiga ler JSON, ja que o body é uma req em JSON
app.use(routes) // Faz o servidor usar o routes do arquivo users.ts
