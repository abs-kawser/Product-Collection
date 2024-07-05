/* eslint-disable @typescript-eslint/no-explicit-any */
// order controller

import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { TOrder } from "./order.interface";
import { ZOrderSchema } from "./order.validation";
import { z } from "zod";

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const orderData: TOrder = req.body;
//     const result = await OrderServices.createOrderDB(orderData);
//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//       error: err,
//     });
//   }
// };

const createOrder = async (req: Request, res: Response) => {
  try {
   
    const orderData: TOrder = req.body;
     // Validate the request body using Zod
    const zodValidatedOrder = ZOrderSchema.parse(orderData);

    // If validation passes, proceed with creating the order
    const result = await OrderServices.createOrderDB(zodValidatedOrder);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err: any) {
    // If validation fails, send an error response
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
      });
    }
  }
};

// get all orders

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrdersDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// get orders by email

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }
    const orders = await OrderServices.getOrdersByEmailDB(email);

    res.status(200).json({
      success: true,
      message: `Orders for email ${email} fetched successfully`,
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail
};
