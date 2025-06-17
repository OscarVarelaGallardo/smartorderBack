import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {
    GetAllOrderQuerySchema,
    CreateOrderSchema
} from '../dto/OrderDTO';
import { OrderItem } from '../models/OrderItem';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';


export const getAllOrders = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetAllOrderQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const filters = parseResult.data;

    try {
        const whereClause: any = {};
        if (filters.category) whereClause.category = filters.category;
        if (typeof filters.available === 'boolean') whereClause.available = filters.available;
        const orders = await Order.findAll({ where: whereClause });
        return res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};
interface ProductOrder {
    id: number;
    quantity: number;
    productId: number;
}


export const createOrder = async (req: Request, res: Response): Promise<any> => {
    // Validar el cuerpo de la solicitud
    const parseResult = CreateOrderSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.errors });
    }
    const orderData = parseResult.data;
    const { numberTable, status, product } = orderData;

    try {

        const findProducts = await Product.findAll({
            where: {
                id: {
                    [Op.in]: product.map((item) => item.productId)
                }
            },
            attributes: ['id', 'name', 'price', 'available']
        });
     
        if (findProducts.length !== product.length) {
            return res.status(404).json({ message: 'Some products not found' });
        }
        
        if (findProducts.length === 0) {
            return res.status(404).json({ message: 'No products found for the given IDs' });
        }
        // Crear la orden
        const newOrder = await Order.create({
            numberTable,
            status,
            total: getTotal(findProducts, product)

        });
        if (!newOrder) {
            return res.status(500).json({ message: 'Order creation failed' });
        }
        const { id: orderId } = newOrder.dataValues;
        
        if (!orderId) {
            return res.status(500).json({ message: 'Order creation failed' });
        }
        const orderItems = product.map((item: ProductOrder) => ({
            orderId: orderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: findProducts.find((p: any) => p.id === item.productId)?.get('price') || 0
        }));

        await OrderItem.bulkCreate(orderItems);

        return res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Error creating order' });
    }
};

const getTotal = (findProducts: any[], product: any[]): number => {
    return product.reduce((total, item) => {
        const productFound = findProducts.find((p: any) => p.id === item.productId);
        return total + (productFound ? parseInt(productFound.get('price')) * item.quantity : 0);
    }, 0);
};


export const updateOrder = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { status, numberTable } = req.body;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        order.set('numberTable', numberTable);
        order.set('status', status);
        await order.save();

        return res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Error updating order' });
    }
}

export const deleteOrder = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Error deleting order' });
    }
};
export const getOrderById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, {
            include: [{
                model: OrderItem,
                include: [Product]
            }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({ message: 'Error fetching order' });
    }
}
export const getOrdersByTable = async (req: Request, res: Response): Promise<any> => {
    const { numberTable } = req.params;
    console.log(numberTable)

    try {
        const orders = await Order.findAll({
            where: { numberTable: numberTable },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                        }
                    ]
                }
            ]
        });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this table' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders by table:', error);
        return res.status(500).json({ message: 'Error fetching orders by table' });
    }
}
export const getOrdersByStatus = async (req: Request, res: Response): Promise<any> => {
    const { status } = req.params;
    const parseStatus = status.toUpperCase()
    try {
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(parseStatus)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const orders = await Order.findAll({
            where: { status: parseStatus },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                        }
                    ]
                }
            ]
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found with this status' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders by status:', error);
        return res.status(500).json({ message: 'Error fetching orders by status' });
    }
}

dayjs.extend(customParseFormat);
export const getOrdersByDate = async (req: Request, res: Response): Promise<any> => {
    const { date } = req.body;

    try {
        const parsed = dayjs(date, "DD-MM-YYYY");
        if (!parsed.isValid()) {
            return res.status(400).json({ message: "Fecha inválida. Usa el formato DD-MM-YYYY." });
        }

        const startOfDay = parsed.startOf('day').toDate();
        const endOfDay = parsed.endOf('day').toDate();
        console.log("Start:", startOfDay.toISOString());
        console.log("End:", endOfDay.toISOString());
        const orders = await Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price']
                        }
                    ]
                }
            ]
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        return res.status(500).json({ message: "Error al obtener órdenes" });
    }
};

