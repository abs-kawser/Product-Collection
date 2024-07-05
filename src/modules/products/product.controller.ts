/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { TProduct } from "./product.interface";
import ZProductValidationSchema from "./product.validation";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;
    const zodParsedData = ZProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);
    //   if(error){
    //     res.status(500).json({
    //       success: false,
    //       message: 'Something went wrong',
    //       error: error.details,
    //   })

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

//get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = (req.query.searchTerm as string) || "";
    const products = await ProductServices.getAllProductIntoDB(searchTerm);
    searchTerm
      ? res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: products,
        })
      : res.status(200).json({
          success: true,
          message: "All products fetched successfully",
          data: products,
        });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// get single product

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await ProductServices.getSingleProductIntoDB(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// update product controller

const productUpdate = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData: Partial<TProduct> = req.body; // Allow partial updates
    const updatedProduct = await ProductServices.updateProductIntoDB(
      productId,
      productData
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// delete product controller

const productDelete = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await ProductServices.deleteProductIntoDB(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  productUpdate,
  productDelete,
};
