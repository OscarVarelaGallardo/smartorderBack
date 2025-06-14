import express from "express"
import router from "./router"
import morgan from 'morgan'
import { accessLogStream } from "./utils/logger"
import { sequelize } from "./config/db"
import './models/Product'; 
import './models/Order';
import './models/OrderItem';
import './models/User'
import './models/Role'
import './models/Shop'
import './models/Payment'
import './models/Category'
import './models/Payment'
import  './models/Cart'
import  './models/Feedback'

import cors from 'cors'

const app = express()
import 'dotenv/config'

app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json())
app.use(morgan('combined', { stream: accessLogStream }));
//configuracion cors

// Middleware: morgan a consola
app.use(morgan('dev'));
//Habilitar la lectura de los datos

app.use(express.urlencoded({ extended: true }));
// Rutas
app.use('/api', router);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database is synchronized');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});




export default app