import {Request, Response} from 'express';
import {Shop} from "../models/Shop";
import {CreateShopSchema} from "../dtos/Shop";
import {User} from "../models/User";


export const createShop = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreateShopSchema.safeParse(req.body)

    if (!parseResult.success) {
        return res.status(400).json({errors: parseResult.error.errors})
    }
    const shopData = parseResult.data
    const userValid = User.findByPk(shopData.userId)
    if (userValid) {
        return res.status(400).json({message: "User have a shop "})
    }
    try {
        await Shop.create(shopData)
        return res.status(201).json({message: 'Shop created successful'})
    } catch (error) {
        res.status(400).json({message: 'Error to created a shop', error})
    }
}

export const getAllShop = async (req: Request, res: Response): Promise<any> => {
    try {
        const findShop = await Shop.findAll()
        if (findShop.length == 0) return res.status(200).json(findShop)
        return res.status(200).json(findShop)
    } catch (error) {
        res.status(400).json({message: 'Error to created a shop', error})
    }

}

