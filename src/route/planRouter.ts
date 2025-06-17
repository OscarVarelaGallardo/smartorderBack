import { Router } from "express";
import { getAllPlans, createPlan } from "../controllers/planController";

const router = Router();

router.get('/', getAllPlans);

router.post('/', createPlan);



export default router;