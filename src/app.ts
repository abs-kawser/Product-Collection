/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, Response, Request} from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/products/orders/order.route';


const app: Application = express();

// parser uses

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use((req:Request, res:Response)=>{
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

export default app;