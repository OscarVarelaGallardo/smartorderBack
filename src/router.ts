import { Router, Request, Response } from 'express';
import productRoutes from './route/productRouter';
import orderRoutes from './route/orderRouter';
import categoryRouter from "./route/categoryRouter";
import feedbackRouter from "./route/feedbackRouter";


const router = Router();

// Importar las rutas de productos
router.use('/products', productRoutes);

// Importar las rutas de órdenes
router.use('/order', orderRoutes);

// Importar las rutas de las categorias
router.use('/category' ,categoryRouter);

// Importar las rutas de feedback
router.use('/feedback', feedbackRouter)

// Ruta de prueba
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is running' });
});




export default router;