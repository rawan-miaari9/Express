import express from 'express';
import { getAllMenuItems, createMenuItem, getMenuItemById, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';

const router = express.Router();
router.route('/').get(getAllMenuItems).post(createMenuItem);
router.route('/:id').get(getMenuItemById).put(updateMenuItem).delete(deleteMenuItem);
export default router;