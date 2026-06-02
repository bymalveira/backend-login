import { NextFunction, Request, Response } from "express"; // Importa funções do express, usadas para analisar req e res
import { jwtVerify } from "jose"; // Importa uma função de verificação de token da biblioteca "jose"

const verification = async (req: Request, res: Response, next: NextFunction) => { // Cria uma constante, que espera uma requisição, uma resposta e um next (prosseguir)
    const token = req.headers.authorization?.split("Bearer ")[1] // A constante token, vai pegar o token salvo em "req.headers.authorization", depois fazer um split (divisão) transformando em um Array, onde o indice [0] é a String "Bearer", e o [1] é o token

    if (!token) { // Se token for falso/vazio:
        res.json({ error: "Token não existe." }) // De uma resposta em JSON, dizendo: error: "Token não existe."
        return // Depois, retorne vazio.
    }
    
    try { // Tente:
        console.log(token)
        const auth = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)); // Verificar o token 
        next() // Depois deixe o usuario prosseguir (next)
    } catch { // Se não conseguir:
        res.json({ error: "Token invalido ou expirado." }) // Como resultado, retorne um JSON dizendo: error: "Token invalido ou expirado."
        return // Depois, retorne vazio.
    }
};

export default verification; // Exporta como padrão a função de verificação