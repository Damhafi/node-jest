import { Request, Response } from "express";
import { database } from "../database";

export class UsersController {
    criarUsuario (req: Request, res: Response): Response {
        const { id, name } = req.body;
    
        if (name.length < 3) {
            return res.status(403).json({ 'mensagem': 'Name must have at least 3 characters' });
        }

        if (database.find(user => user.name === name)) {
            return res.status(403).json({ 'mensagem': 'Name already exists' });
        }
    
        database.push({ id, name });
    
        return res.status(201).json({ 'mensagem': `User ${name} created` });
    }

    listarUsuario (req: Request, res: Response): Response {
        return res.status(200).json(database);
    }
}