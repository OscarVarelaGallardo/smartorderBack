import { Response, Request } from "express";
import { Feedback } from "../models/Feedback";
import { FeedbackQuerySchema, FeedbackIdSchema, FeedbackUpdateQuerySchema } from "../dtos/FeedbackDTO";
import { Product } from "../models/Product";
import { User } from "../models/User";

export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await Feedback.findAll();
        res.json(feedback);
        return
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createFeedback = async (req: Request, res: Response):Promise<any> => {
    const parseResult = FeedbackQuerySchema.safeParse(req.body);
    const parseParams = FeedbackIdSchema.safeParse(req.params);

    if (!parseParams.success) {
        return res.status(400).json({ errors: parseParams.error.errors });
    }
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const feedbackData = parseResult.data;
    const feedbackId = parseParams.data.id;

    try {
        const existingProduct = await Product.findOne({
            where: { id: Number(feedbackData.productId) }
        });
        const existingUser = await User.findOne({
            where: { id: +feedbackId }
        });
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const newFeedback = await Feedback.create({
            productId: feedbackData.productId,
            userId: feedbackId,
            rating: feedbackData.rating,
            comment: feedbackData.comment
        });

        res.status(201).json(newFeedback);
    }
    catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }


};


export const updateFeedback = async (req: Request, res: Response):Promise<any> => {
    const parseParams = FeedbackIdSchema.safeParse(req.params);
    const parseResult = FeedbackUpdateQuerySchema.safeParse(req.body);
    if (!parseParams.success) {
        return res.status(400).json({ errors: parseParams.error.errors });
    }
    if (isNaN(parseInt(parseParams.data.id))) {
        return res.status(400).json({ error: "Invalid feedback ID" });
    }
    const feedbackID = parseParams.data.id;

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const feedbackData = parseResult.data;

    try {
        const feedback = await Feedback.findByPk(+feedbackID);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        const existingProduct = await Product.findOne({
            where: { id: Number(feedbackData.productId) }
        });
       
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
    
        feedback.set("rating", feedbackData.rating);
        feedback.set("comment", feedbackData.comment);

        await feedback.save();

        res.status(200).json({message: "Feedback updated successfully", feedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteFeedback = async (req: Request, res: Response):Promise<any> => {
    const parseParams = FeedbackIdSchema.safeParse(req.params);

    if (!parseParams.success) {
        return res.status(400).json({ errors: parseParams.error.errors });
    }

    if (isNaN(parseInt(parseParams.data.id))) {
        return res.status(400).json({ error: "Invalid feedback ID" });
    }
    const feedbackId = parseParams.data.id;

    try {
        const deletedFeedback = await Feedback.destroy({
            where: { id: +feedbackId }
        });

        if (!deletedFeedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(204).json( { message: "Feedback deleted successfully" });
        return;
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const findFeedbackById = async (req: Request, res: Response):Promise<any> => {
    const parseParams = FeedbackIdSchema.safeParse(req.params);

    if (!parseParams.success) {
        return res.status(400).json({ errors: parseParams.error.errors });
    }

    const feedbackId = parseParams.data.id;

    try {
        const feedback = await Feedback.findByPk(+feedbackId,{
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    attributes: ['id', 'email']
                }

            ],
            attributes: ['id', 'comment', 'rating', 'createdAt', 'updatedAt']
         
        });
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }
        res.status(200).json({message: "Feedback found successfully", feedback });
    } catch (error) {
        console.error("Error finding feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
