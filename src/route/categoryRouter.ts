import {Router} from 'express'
import {
    createCategory, deleteCategory,
    getAllCategory,
    updateCategory
} from "../controllers/categoryController";


const router = Router()

router.get('/', getAllCategory)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)


export default router;