import express from 'express';
import { getAllCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from '../controllers/customerController.js';

const router = express.Router();
router.route('/').get(getAllCustomers).post(createCustomer);
router.route('/:id').get(getCustomerById).put(updateCustomer).delete(deleteCustomer);
export default router;