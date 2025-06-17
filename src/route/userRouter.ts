import {Router} from "express";

import {
    createUser,getUserById,
    deleteUser, updateUser
} from '../controllers/userController'

const router = Router();

router.post('/', createUser)
router.get('/:id',  getUserById)
router.delete('/:id', deleteUser)

router.patch('/:id',updateUser)


export default router