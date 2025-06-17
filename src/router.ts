import { Router, Request, Response, } from 'express';
import productRoutes from './route/productRouter';
import orderRoutes from './route/orderRouter';
import categoryRouter from "./route/categoryRouter";
import feedbackRouter from "./route/feedbackRouter";

import planRouter from "./route/planRouter";
import shopRouter from './route/shopRouter'
import userRouter from "./route/userRouter";
import loginRouter from "./route/loginRouter";
import authToken from "./middleware/authMiddleware";


const router = Router();

router.use('/login', loginRouter)

// Importar las rutas de productos

router.use('/products',
    authToken,
    productRoutes);

// Importar las rutas de órdenes
router.use('/order',
    authToken,
    orderRoutes);

// Importar las rutas de las categorias
router.use('/category',
    authToken,
    categoryRouter);

router.use('/shop',
    authToken,
    shopRouter)

router.use('/user',
    authToken,
    userRouter)

// Importar las rutas de feedback
router.use('/feedback',
    authToken,
     feedbackRouter)

router.use('/plan',
    authToken,
    planRouter);

// Importar las rutas de login
router.use('/login', loginRouter);

// Ruta de prueba
router.get('/', (req: Request, res: Response) => {
    res.json({message: 'API is running'});
});




export default router;