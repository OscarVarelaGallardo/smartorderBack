import {Router} from 'express'
import {
    createCategory, deleteCategory,
    getAllCategory,
    updateCategory,
    findCategoryById
} from "../controllers/categoryController";


const router = Router()

router.get('/', getAllCategory)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.get('/:id',findCategoryById)


export default router;