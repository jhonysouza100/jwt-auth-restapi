import Product from '../models/products.model.js';

export const createProducts = async (req, res) => {
  console.log(req.body);
  const {name, category, price, imgUrl} = req.body;
  const newProduct = new Product({name, category, price, imgUrl});
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductsById = async (req, res) => {
  const productById = await Product.findById(req.params.productId);
  res.status(200).json(productById);
};

export const updateProducts = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true});
  res.status(204).json(updatedProduct);
};

export const deleteProducts = async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
  res.status(204).json(deletedProduct);
};