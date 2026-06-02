import { SignJWT } from "jose"; // Importa a função de criar token do jose


const createToken = async (id: string) => { // Cria um token esperando um id do tipo string 

    const newToken = new TextEncoder().encode(process.env.JWT_SECRET) // Pega o JWT_SECRET do .env
    const Token = await new SignJWT({ id }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(newToken) // Cria um token, passando o id como parametro, passando o algoritmo como "HS256", expirando em 1h e assinando como newToken
    return Token // Retorna o Token criado
};

export default createToken; // Exporta como padrão a função createToken