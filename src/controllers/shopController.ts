import { Request, Response } from 'express';
import {Shop} from "../models/Shop";
import {CreateShopSchema} from "../dtos/Shop";


export const createShop=(req:Request, res:Response)=>{
    const parseResult =CreateShopSchema.safeParse(req.body)
}