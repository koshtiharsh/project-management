
import { Router } from "express";
import { search } from "../controllers/searchController";
import { getUser, getUsers } from "../controllers/userControllers";



const router = Router()


router.get('/', getUsers)
router.get('/:cognitoId', getUser)


export default router;