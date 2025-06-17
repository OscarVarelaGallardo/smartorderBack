import {Response, Request} from "express";
import {Category} from "../models/Category";

export const getAllCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const findAllCategorys = await Category.findAll()

        return res.status(200).json(findAllCategorys)

    } catch (error) {
        console.log(error)
    }

}

export const createCategory = async (req: Request, res: Response): Promise<any> => {
    const {name} = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({message: "Name is required and must be a string"});
    }

    const nameSanitized = name.trim();

    if (nameSanitized.length === 0) {
        return res.status(400).json({message: "Name cannot be empty"});
    }

    try {
        const existingCategory = await Category.findOne({where: {name}});
        if (existingCategory) {
            return res.status(409).json({message: "Category name already exists"});
        }

        await Category.create({name});
        return res.status(201).json({
            message: "Category created successfully",

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error creating category"});
    }
};
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    const {name} = req.body;
    if (!id || typeof id !== 'string') return res.status(400).json({message: "Id is required and must be a string"})
    if (!name || typeof name !== 'string') return res.status(400).json({message: "Name is required and must be a string"})

    if (id.length <= 0 || name.length <= 0) {
        return res.status(400).json({message: "Value is required "})
    }
    try {
        const findCategory = await Category.findOne({where: {id}})

        if (!findCategory) {
            return res.status(404).json({message: "Category ID not found"});
        }
        findCategory.set('name', name)
        await findCategory.save()
        return res.status(201).json({
            message: "Category update successfully",
        });
    } catch (error) {
        console.log(error)
    }


}

export const deleteCategory = async (req: Request, res: Response):Promise<any> => {
    const {id} = req.params;
    if (!id || typeof id !== 'string') return res.status(400).json({message: "Id is required and must be a string"})
    try {
        const findCategory = await Category.findByPk(id)
        if (!findCategory) {
            return res.status(404).json({message: "Category ID not found"});
        }
        await findCategory.destroy()
        return res.status(201).json({
            message: "Category delete successfully",
        });
    } catch (error) {
        console.log(error)
    }

}

export const findCategoryById = async (req:Request, res:Response):Promise<any> =>{
    const { id } = req.params;
    if (!id || typeof id !== 'string') return res.status(400).json({message: "Id is required and must be a string"})
    try {
        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({message: "Category ID not found"});
        }

        return res.status(201).json({
            message: "Category find successfully",
            category
        });
    } catch (error) {
        console.log(error)
    }
}