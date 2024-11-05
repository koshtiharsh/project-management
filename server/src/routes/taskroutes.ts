import { Router } from "express";
import { createTasks, getTasks, getTasksUserSpecific, updateTaskStatus } from "../controllers/taskController";



const router = Router()


router.get('/',getTasks)
router.post('/',createTasks)
router.patch('/:taskId/status',updateTaskStatus)

router.get('/user/:userId',getTasksUserSpecific)


export default router;