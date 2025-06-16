import {Router} from "express";

import {
    createShop, getAllShop, getShopById, deleteShop
} from '../controllers/shopController'

const router = Router();

router.post('/', createShop)

router.get('/', getAllShop)

router.get('/:id', getShopById)

router.delete('/:id', deleteShop)

export default router