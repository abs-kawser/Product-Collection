

//order Management-create order

import { Product } from "../product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// create order

const createOrderDB = async (orderData: TOrder) => {
  // Retrieve the product by its ID
  const product = await Product.findById(orderData.productId);

  // Check if the product exists
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if there is enough stock
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // Update the inventory
  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  // Create the order
  const result = await Order.create(orderData);
  return result;
};

  


  // get all orders 
const getAllOrdersDB = async () => {
  const orders = await Order.find(); 
  return orders;
};

// Retrieve orders by user email 
const getOrdersByEmailDB = async (email: string) => {
  const orders = await Order.find({ email });
  return orders;
};



export const OrderServices={
  createOrderDB,
  getAllOrdersDB,
  getOrdersByEmailDB
}
