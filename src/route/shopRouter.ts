import {Router} from "express";

import {
    createShop
} from '../controllers/shopController'
const router = Router();

router.post('/',createShop)