import {z} from 'zod';


export const FeedbackQuerySchema = z.object({
    productId: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  
});

export const FeedbackIdSchema = z.object({
    id: z.string() 
});

export const FeedbackUpdateQuerySchema = z.object({
    productId: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    feedbackId: z.string().optional()
});