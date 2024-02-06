import express, { Router } from "express";
import cors from "cors"; 
import sqlite3 from "sqlite3"; 

import { Request, Response } from "express"; 

const router = Router()

const app = express() 
app.use(cors()) 
app.use(express.json()) 
app.use(router) 

const db = new sqlite3.Database("./database.db")

// criando a tabela de tarefas e inserindo dados
router.post('/tasks', (req:Request, res: Response) => {
    const { title, completed } = req.body // pegando os dados da requisição
    // criando a tabela
    db.run(`CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        completed BOOLEAN DEFAULT false
    )`)

    // inserindo dados na tabela
    const query = `INSERT INTO task (title, completed) VALUES (?, ?)`
    const values = [title, completed]
    function insertTaskTable(error: Error) {
        if(error) {
            console.log(error)
        } else {
            return res.status(200).json({ message: 'Tarefa criada com sucesso!' })
        }
    }
    // executando a query
    db.run(query, values, insertTaskTable)
})

// buscando tarefas
router.get('/tasks', (req:Request, res: Response) => {
    db.all(`SELECT * FROM task` , (error, rows) => {
        if(error) {
            console.log(error)
        } else {
            return res.status(200).json(rows)
        }
    })
})

// deletando tarefa
router.delete('/tasks/:id', (req:Request, res: Response) => {
    const { id } = req.params
    db.run(`DELETE FROM task WHERE id = ?`, [id], (error) => {
        if(error) {
            console.log(error)
        } else {
            return res.status(200).json({ message: 'Tarefa deletada com sucesso!' })
        }
    })
})

// atualizando tarefa
router.put('/tasks/:id', (req:Request, res: Response) => {
    const { id } = req.params
    const { title, completed } = req.body
    db.run(`UPDATE task SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], (error) => {
        if(error) {
            console.log(error)
        } else {
            return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
        }
    })
})

app.listen(3333, () => { 
    console.log('Servidor rodando na porta 3333') 
})