import { Request, Response } from 'express';

import { Plan } from "../models/Plan";
import { GetPlanByIdParamsSchema, CreatePlanSchema } from "../dto/PlanDTO";
import { User } from "../models/User";
 


export const createPlan = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreatePlanSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const planData = parseResult.data;

    try {
        await Plan.create(planData);
        return res.status(201).json({ message: 'Plan created successfully' });
    } catch (error) {
        console.error('Error creating plan:', error);
        return res.status(500).json({ message: 'Error creating plan', error });
    }
}

export const getAllPlans = async (req: Request, res: Response): Promise<any> => {
    try {
        const plans = await Plan.findAll();
        return res.status(200).json(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        return res.status(500).json({ message: 'Error fetching plans', error });
    }
}

export const getPlanById = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetPlanByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const { id } = parseResult.data;

    try {
        const plan = await Plan.findByPk(id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        return res.status(200).json(plan);
    } catch (error) {
        console.error('Error fetching plan by ID:', error);
        return res.status(500).json({ message: 'Error fetching plan', error });
    }
}

export const deletePlan = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetPlanByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const { id } = parseResult.data;

    try {
        const plan = await Plan.findByPk(id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        await plan.destroy();
        return res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        return res.status(500).json({ message: 'Error deleting plan', error });
    }
}

export const updatePlan = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetPlanByIdParamsSchema.safeParse(req.params);
    const parseResultData = CreatePlanSchema.safeParse(req.body);
    
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const { id } = parseResult.data;

    if (!parseResultData.success) {
        return res.status(400).json({ errors: parseResultData.error.errors });
    }

    const planData = parseResultData.data;

    try {
        const plan = await Plan.findByPk(id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        await plan.update(planData);
        return res.status(200).json({ message: 'Plan updated successfully', plan });
    } catch (error) {
        console.error('Error updating plan:', error);
        return res.status(500).json({ message: 'Error updating plan', error });
    }
}