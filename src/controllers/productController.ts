import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { CreateProductSchema,
     GetAllProductsQuerySchema,
     GetProductByIdParamsSchema,
     UpdateProductSchema,
     DeleteProductParamsSchema,
     GetProductByIdParams,
     UpdateProductDto,
     DeleteProductParams
    } from '../dtos/ProductDTO';
import {Category} from "../models/Category";


export const getAllProducts = async (req: Request, res: Response):Promise<any> => {
    const parseResult = GetAllProductsQuerySchema.safeParse(req.query);

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const filters = parseResult.data;

    try {
        const whereClause: any = {};
        if (filters.category) whereClause.category = filters.category;
        if (typeof filters.available === 'boolean') whereClause.available = filters.available;

        const products = await Product.findAll({ where: whereClause });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetProductByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const params = parseResult.data as GetProductByIdParams;

    try {
        const product = await Product.findByPk(Number(params.id));
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto' });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreateProductSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const productData = parseResult.data;

    try {
        await Product.create(productData);
        return res.status(201).json({message: 'Product created successful' });
    } catch (error) {
        res.status(400).json({ message: 'Error to created a product' });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {

    const parseResult = UpdateProductSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const updateData = parseResult.data as UpdateProductDto;
    const idParseResult = GetProductByIdParamsSchema.safeParse(req.params);
    if (!idParseResult.success) {
        return res.status(400).json({ errors: idParseResult.error.errors });
    }
    const params = idParseResult.data as GetProductByIdParams;
    if (!params.id || isNaN(Number(params.id))) {
        return res.status(400).json({ message: 'ID de producto inválido' });
    }

    try {
        const product = await Product.findByPk(Number(params.id));
        if (!product) return res.status(404).json({ message: 'Product dont find' });
        const validateCategory = await Category.findByPk(updateData.categoryId)
        if(!validateCategory)return res.status(404).json({message:'Category id dont find'})
        await product.update(updateData);
        return res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar producto' });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const parseResult = DeleteProductParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const params = parseResult.data as DeleteProductParams;
    if (!params.id || isNaN(Number(params.id))) {
        return res.status(400).json({ message: 'ID de producto inválido' });
    }
    
    try {
        const product = await Product.findByPk(Number(params.id));
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        await product.destroy();
        return res.status(201).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar producto' });
    }
};