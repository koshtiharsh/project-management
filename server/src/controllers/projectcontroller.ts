import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const project = await prisma.project.findMany();

        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: "error while retriving projects" })

    }
}

export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, desc, startDate, endDate } = req.body;

        const project = await prisma.project.create({
            data: {
                name, description: desc, startDate, endDate
            }
        })



        res.status(201).json({ success: true, project: project })

    } catch (error: any) {
        res.status(500).json({ message: `error while creating projects ${error.message}` })

    }
}

