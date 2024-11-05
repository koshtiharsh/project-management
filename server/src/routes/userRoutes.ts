
import { Router } from "express";
import { search } from "../controllers/searchController";
import { getUsers } from "../controllers/userControllers";



const router = Router()


router.get('/', getUsers)



export default router;