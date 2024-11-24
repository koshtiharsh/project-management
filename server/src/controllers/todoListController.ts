import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getTodosByUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { userId } = req.params
        const todos = await prisma.todoList.findMany({
            where: {
                cognitoId : userId
            }
        });
        res.status(200).json(todos)
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving todo list", Error: error.message })

    }
}


export const addNewTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const { name, cognitoId, deadline, status } = req.body;

        const newTask = await prisma.todoList.create({
            data: {
                name, cognitoId, deadline, status
            }
        })

        if (newTask) {
            res.status(201).json(newTask)
        }

        // res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving users", Error: error.message })

    }
}

export const updateTodoStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const {id} = req.params
        console.log(req.params)
        const task = await prisma.todoList.findFirst({
            where:{
                id:Number(id)
            }
        })
        const result  = await prisma.todoList.update({
            where:{
                id:Number(id)
            },
            data:{
                status:!task?.status
            }
        })


        if (result) {
            res.status(201).json(result)
        }

        // res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving updating todo status", Error: error.message })

    }
}
export const deleteTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        const {id} = req.body
        console.log(req.params)
        const task = await prisma.todoList.delete({
            where:{
                id:Number(id)
            }
        })
       


        res.json({success:true,message:"task deleted successfully"})

        // res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ message: "error while todo detetion", Error: error.message })

    }
}

