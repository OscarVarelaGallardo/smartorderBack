import { Router } from "express";
import { getAllPlans, createPlan, getPlanById, deletePlan } from "../controllers/planController";

const router = Router();

router.get('/', getAllPlans);

router.post('/', createPlan);

router.get('/:id', getPlanById);

router.delete('/:id', deletePlan);

export default router;