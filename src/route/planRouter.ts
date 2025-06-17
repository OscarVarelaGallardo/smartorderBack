import { Router } from "express";
import { getAllPlans, createPlan, getPlanById, deletePlan, updatePlan } from "../controllers/planController";

const router = Router();

router.get('/', getAllPlans);

router.post('/', createPlan);

router.get('/:id', getPlanById);

router.delete('/:id', deletePlan);

router.patch('/:id', updatePlan); 

export default router;