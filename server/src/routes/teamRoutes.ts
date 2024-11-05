
import { Router } from "express";
import { search } from "../controllers/searchController";
import { getUsers } from "../controllers/userControllers";
import { getTeams } from "../controllers/teamControllers";



const router = Router()


router.get('/', getTeams)



export default router;