import { Request, Response } from 'express';
import { Shop } from "../models/Shop";
import { CreateShopSchema, GetShopByIdParamsSchema } from "../dto/ShopDTO";
import { User } from "../models/User";


export const createShop = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreateShopSchema.safeParse(req.body)

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors })
    }
    const shopData = parseResult.data
    const userValid = User.findByPk(shopData.userId)
    if (userValid) {
        return res.status(400).json({ message: "User have a shop " })
    }
    try {
        await Shop.create(shopData)
        return res.status(201).json({ message: 'Shop created successful' })
    } catch (error) {
        res.status(400).json({ message: 'Error to created a shop', error })
    }
}
export const deleteShop = async (req: Request, res: Response<any>): Promise<any> => {
    const parseResult = GetShopByIdParamsSchema.safeParse(req.params);

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors })
    }
    const { id } = parseResult.data;
    try {
        const shop = await Shop.findByPk(id)
        shop.set('isActive', false)
        shop.save()
        return res.status(200).json({ message: 'Shop deleted successful' })

    } catch (error) {
        console.log(error)
    }


}

export const getAllShop = async (req: Request, res: Response): Promise<any> => {

    try {
        const findShop = await Shop.findAll({
            where: { isActive: true }
        })
        if (findShop.length == 0) return res.status(200).json(findShop)
        return res.status(200).json(findShop)
    } catch (error) {
        res.status(400).json({ message: 'Error to created a shop', error })
    }

}

export const getShopById = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetShopByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors })
    }
    const { id } = parseResult.data;

    try {
        const shop = await Shop.findAll({
            where: {
                isActive: true,
                id
            }
        });
        if (!shop || shop.length === 0) {
            return res.status(404).json({ message: "Shop does not exist yet", shop: [] });
        } else {
            return res.status(200).json(shop)
        }
    } catch (error) {
        console.log(error)
    }

}


