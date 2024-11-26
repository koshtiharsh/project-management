import { Router } from "express";
import {  deleteTask, getTodosByUser, updateTodoStatus } from "../controllers/todoListController";


const router = Router()

router.get('/:userId',getTodosByUser)
// router.post('/addnewtask',addNewTask)
router.post('/delete',deleteTask)
router.get('/updatetodo/:id',updateTodoStatus)

export default router