import express from "express"; // Importa o express 
import { prisma } from "../utils/prisma"; // Importa o prisma
import bcrypt from "bcrypt"; // Importa o bcrypt (hash)
import createToken from "../utils/jwt"; // Importa a função criada para gerar tokens


const routes = express.Router() // Cria uma constante com a função de rotas do express

routes.get("/users", async (req, res) => { // Busca em "/users" 
    const getUsers = await prisma.user.findMany() // Todos os usuarios
    res.json(getUsers) // Retorna todos os usuarios
});

routes.post("/users", async (req, res) => { // Insere (Post) na rota "/users"
    if (!req.body.password) { // Verifica se a senha é falsa (está vazia)
        res.json({error : "Senha não pode ser vazia"}) // Se for vazia mostra um erro
        return // E retorna
    }

    const Hash = await bcrypt.hash(req.body.password, 10) // Cria uma constante Hash, que pega a senha do body e criptografa ela com o indice 10
    const createUser = await prisma.user.create({ // Insere um user no banco esperando
        data: { // Os dados inseridos serão:
            email: req.body.email, // O email no body da req,
            password: Hash, // E a senha criptografada 
        }
    })

    res.json({ mensage: "Usuario Criado" }) // Se tudo der certo, retorna uma mensagem dizendo que o usuario foi criado com sucesso
});


routes.post("/login", async (req, res) => { // Insere (post) na rota "/login"
    if (!req.body.password) { // Se a senha do body for falsa (vazia)
        res.json({ error: "Senha não incerida"}) // Mostra um erro dizendo que a senha não foi inserida
        return // E depois, retorna
    }

    const loginUser = await prisma.user.findUnique({ // loginUser espera o prisma buscar algo unico
        where: { // Onde:
            email: req.body.email // O email inserido é igual ao que está armazenado no banco
        }
    })

    if (!loginUser) { // Se loginUser for falso:
        res.json({ error: "Usario não encontrado" }) // Retorna um erro dizendo que o usuario não foi encontrado
        return // E depois, retorna 
    }

    const compareHash = await bcrypt.compare(req.body.password, loginUser?.password!) // compareHash espera o bcrypt comparar a senha inserida com o hash guardado banco 

    if (!compareHash) { // Se compareHash for falso:
        res.json({ error: "Email ou senha invalidos!" }) // Mostre um erro dizendo que a senha ou o Email está errado 
        return // E depois, retorne
    }

    const token = createToken(loginUser.id) // Cria uma constante chamada token, que chama a função createToken e passa o id do usuario como parametro

    res.json({ loginUser, token }) // Se tudo estiver certo, como resposta mostre o usuario logado
});

export default routes; // Exporte como padrão a constante routes 