import {Router} from 'express';
import {
    getAllFeedback, createFeedback,
    deleteFeedback, updateFeedback,
    findFeedbackById


} from "../controllers/feedbackController";


const router = Router();


router.get('/', getAllFeedback)
router.post('/:id', createFeedback)
router.patch('/:id', updateFeedback)
 router.delete('/:id', deleteFeedback)
router.get('/:id', findFeedbackById)



export default router;