import {Router} from "express";

import {
    createUser, getUserById,
    deleteUser, updateUser,
    getAllUser
} from '../controllers/userController'
import authToken from "../middleware/authMiddleware";

const router = Router();

router.post('/', createUser)
router.get('/:id', authToken, getUserById)
router.get('/', authToken, getAllUser)
router.delete('/:id', authToken, deleteUser)
router.patch('/:id', authToken, updateUser)



export default router