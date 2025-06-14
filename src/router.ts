import { Router, Request, Response } from 'express';
import productRoutes from './route/productRouter';
import orderRoutes from './route/orderRouter';
import categoryRouter from "./route/categoryRouter";


const router = Router();

// Importar las rutas de productos
router.use('/products', productRoutes);

// Importar las rutas de órdenes
router.use('/order', orderRoutes);

// Importar las rutas de las categorias
router.use('/category' ,categoryRouter);

// Ruta de prueba
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is running' });
});


export default router;