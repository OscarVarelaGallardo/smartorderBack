import { Router, Request, Response } from 'express';
import productRoutes from './route/productRouter';
import orderRoutes from './route/orderRouter';


const router = Router();

// Importar las rutas de productos
router.use('/products', productRoutes);

// Importar las rutas de órdenes
router.use('/order', orderRoutes);

// Ruta de prueba
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is running' });
});


export default router;