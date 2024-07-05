
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product DB
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// get all products from db

const getAllProductIntoDB = async (searchTerm: string) => {
  const searchFields = ['name', 'description', 'category', 'tags'];
  //Searching - Partially Match - In..
  const searchableField = searchFields.map(field => ({
    [field]: { $regex: searchTerm, $options: 'i' }
  }));

  const result = await Product.find({ $or: searchableField });
  return result;
};





// get single product from db
const getSingleProductIntoDB = async (id: string) => {

  const result = await Product.findOne({ productId: id });
  // const result = await Product.aggregate([{ $match: {productId: id } }]); // using aggregate
  return result;

};

// Update product service
const updateProductIntoDB = async (id: string, updatedProductData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
  return result;
};

// Delete product service
const deleteProductIntoDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};




export const ProductServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,

};
