import express from 'express';
import { getAllRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();
router.route('/').get(getAllRestaurants).post(createRestaurant);
router.route('/:id').get(getRestaurantById).put(updateRestaurant).delete(deleteRestaurant);
export default router;