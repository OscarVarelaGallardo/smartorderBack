import {Router} from "express";

import {
    createShop, getAllShop
} from '../controllers/shopController'

const router = Router();

router.post('/', createShop)

router.get('/', getAllShop)

export default router