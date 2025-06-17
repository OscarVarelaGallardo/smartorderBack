import { Request, Response } from "express";
import { Subscription } from "../models/Subscription";
import { CreateSuscriptionSchema, GetSuscriptionByIdParamsSchema } from "../dto/SuscriptionDTO";



export const createSubscription = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreateSuscriptionSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ errors: parseResult.error.errors });
        return;
    }
    try {
        const { userId, planId, startDate, endDate, paymentMethod, status } = parseResult.data;
        const existingSubscription = await Subscription.findOne({ where: { userId, planId } });
        if (existingSubscription) {
            res.status(409).json({ message: 'Subscription already exists for this user and plan.' });
            return;
        }

        //TODO:Validate pay 

        await Subscription.create({
            userId,
            planId,
            startDate,
            endDate,
            paymentMethod,
            status: status || 'active', 

        });
        res.status(201).json({ message: 'Subscription created successfully'});
    }
    catch (error) {
        res.status(500).json({ message: 'Error on server to create subscription.', error });
        return;
    }
} 

export const getAllSubscriptions = async (req: Request, res: Response): Promise<any> => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error on server to get all subscriptions.', error });
    }
}

export const getSubscriptionById = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetSuscriptionByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        res.status(400).json({ errors: parseResult.error.errors });
        return;
    }
    const { id } = parseResult.data;
    try {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found.' });
            return;
        }
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({ message: 'Error on server to get subscription by id.', error });
    }

}

export const updateSubscription = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetSuscriptionByIdParamsSchema.safeParse(req.params);
    const bodyParseResult = CreateSuscriptionSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ errors: parseResult.error.errors });
        return;
    }
    if (!bodyParseResult.success) {
        res.status(400).json({ errors: bodyParseResult.error.errors });
        return;
    }
    const { id } = parseResult.data;
    try {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found.' });
            return;
        }
        const updatedSubscription = await subscription.update(bodyParseResult.data);
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(500).json({ message: 'Error on server to update subscription.', error });
    }
}
export const deleteSubscription = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetSuscriptionByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        res.status(400).json({ errors: parseResult.error.errors });
        return;
    }
    const { id } = parseResult.data;
    try {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            res.status(404).json({ message: 'Subscription not found.' });
            return;
        }
        await subscription.destroy();
        res.status(204).json({ message: 'Subscription deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error on server to delete subscription.', error });
    }
}