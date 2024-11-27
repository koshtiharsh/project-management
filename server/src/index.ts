import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { PrismaClient } from "@prisma/client";
const webpush = require('web-push')
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone')


// router import

import projectRoutes from "./routes/projectroutes";
import taskRoutes from "./routes/taskroutes"
import search from './routes/serachRoutes'
import usersRoutes from "./routes/userRoutes";
import teamsRoutes from "./routes/teamRoutes";
import todoRouter from "./routes/todoRoutes";
import schedule from 'node-schedule'

// configs

dotenv.config();


const app = express()






app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const corsOptions = {
    origin: process.env.ORIGIN, // Allow your frontend to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow cookies and credentials to be sent
};

// Apply CORS middleware with the above options
app.use(cors(corsOptions));
app.use(cookieParser());


/* **************************************************** push api code *************************************************/
const publicKey = "BPx0jnRp630WXTuvJOKiPPRpyZxl8p2XPFkKOCg4MiBUl9_LItrEXiLbmYSs1DOWBbal3k6SWczctiemg8dW62k"

const privateKey = "Lst587Hn7eUzeIcQR4Uk3TJ9Gxf8mST4bwn-J1G92xc"

app.use(express.static('./public'))

webpush.setVapidDetails(
    'mailto:emailAddress@gmail.com',
    publicKey,
    privateKey

)




const sub: Array<Object> = []


app.post('/save-sub', async (req: Request, res: Response) => {

    sub.push(req.body)

    const id = req.cookies.Auth
    
    // const cookies = req.headers.cookie ? req.headers.cookie.split(';') 

    const user = await prisma.user.findFirst({
        where: {
            cognitoId: id
        }
    })

    const arr: any = user?.subscription;
    const newarr = [req.body]

    const updatedUser = await prisma.user.update({
        where: {
            cognitoId: id
        },
        data: {
            subscription: newarr
        }
    })

    res.json({ success: true, sub: updatedUser })



})


app.get('/send', async (req: Request, res: Response) => {

    try {
        const id = "84b81478-3031-70a6-ac19-546653b1c9ac"
        // const cookies = req.headers.cookie ? req.headers.cookie.split(';') 

        const user = await prisma.user.findFirst({
            where: {
                cognitoId: id
            }
        })

        user?.subscription.forEach((item) => {

            const data = {
                title: "Notification",
                body: "this is for the testing purpose"
            }
            webpush.sendNotification(item, JSON.stringify(data))
        })


        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }
})

/* **************************************************** push api code *************************************************/

app.post('/todolist/addnewtask', async (
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

        //for scheduling job

        const id = req.cookies.Auth;

        const user = await prisma.user.findFirst({
            where: {
                cognitoId: id
            }
        })

        if (newTask) {

            /// convertirng users timezone to UTC
            const finalDeadline = moment(`${deadline}+05:30`).utc().toDate()


            const date = new Date(deadline)

            const hours = date.getHours()
            const minutes = date.getMinutes()
            console.log(finalDeadline)
            schedule.scheduleJob(new Date(finalDeadline), () => {
                user?.subscription.forEach(async (item) => {
                    const payload = JSON.stringify({
                        title: "Task Notification",
                        body: `${name} at ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                    })

                    /*****************************check the status before sending notification */
                    const user = await prisma.todoList.findFirst({
                        where: {
                            id: newTask.id
                        }
                    })

                    /*************************************checking end *********************** */
                    if (user?.status == false) {
                        webpush.sendNotification(item, payload)
                    }
                    // .catch((error)=>{
                    //     console.log('notification error at adding task ',error)
                    // })
                })
            })
            res.status(201).json(newTask)
        }

        // res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving users", Error: error.message })

    }
})





app.get('/', (req, res) => {
    res.send('this si home page')
})



app.use('/projects', projectRoutes)

app.use("/tasks", taskRoutes)
app.use('/search', search)
app.use('/users', usersRoutes)
app.use('/teams', teamsRoutes)
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 5000

app.post('/users/create-user', async (req: Request, res: Response) => {

    try {
        const { username, cognitoId, profilePictureUrl = 'i1.jpg', teamId = 1 } = req.body

        const newUser = await prisma.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId
            }
        });

        res.status(200).json({ success: true, user: newUser })
    } catch (error: any) {
        res.status(500).json({ message: "error while retriving users", Error: error.message })

    }


})




app.use('/todolist', todoRouter)


app.listen(PORT, '0.0.0.0')