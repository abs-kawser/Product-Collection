import { Router } from 'express';
import { OrderControllers } from './order.controllers';


const router = Router();

// Order routes
router.post('/', OrderControllers.createOrder);
router.get('/', (req, res) => {
    if (req.query.email) {
      OrderControllers.getOrdersByEmail(req, res); // Route to fetch orders by email
    } else {
      OrderControllers.getAllOrders(req, res); // Default route to fetch all orders
    }
  });

  
  

export const OrderRoutes = router;