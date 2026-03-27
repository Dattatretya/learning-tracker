import express from "express"
import { getTodosController, setTodoController, deleteTodosController } from "../controllers/todos.controller.js"

export const todo = express.Router()

todo.post("/addtodo", setTodoController)
todo.get("/gettodo", getTodosController)
todo.delete("/deletetodo", deleteTodosController)