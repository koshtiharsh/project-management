import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'





// router import

import projectRoutes from "./routes/projectroutes";
import taskRoutes from "./routes/taskroutes"
import search from './routes/serachRoutes'
import usersRoutes from "./routes/userRoutes";
import teamsRoutes from "./routes/teamRoutes";
// configs

dotenv.config();


const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('this si home page')
})



app.use('/projects', projectRoutes)

app.use("/tasks", taskRoutes)
app.use('/search', search)
app.use('/users', usersRoutes)
app.use('/teams', teamsRoutes)

const PORT = Number(process.env.PORT) || 5000

app.listen(PORT, '0.0.0.0')