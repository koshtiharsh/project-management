import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { projectId } = req.query;

        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId)
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        })



        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving tasks", Error: error.message })

    }
}




export const createTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId } = req.body;

        const task = await prisma.task.create({
            data: {
                title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId
            }
        })



        res.status(201).json({ success: true, task: task })

    } catch (error: any) {
        res.status(500).json({ message: `error while creating task ${error.message}` })

    }
}




export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { taskId } = req.params;
        const { status } = req.body;

        const updatedTasks = await prisma.task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status: status
            }
        })

        res.status(200).json(updatedTasks)

    } catch (error: any) {
        res.status(500).json({ message: "error while updating task", Error: error.message })

    }
}



export const getTasksUserSpecific = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { userId } = req.params;

        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) }
                ]
            },
            include: {
                author: true,
                assignee: true,
            }
        })



        res.status(200).json(tasks)
    } catch (error: any) {
        res.status(500).json({ message: "error while users specific tasks", Error: error.message })

    }
}