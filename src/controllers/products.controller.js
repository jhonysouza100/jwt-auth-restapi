import Product from '../models/products.model.js';

export const createProducts = async (req, res) => {
  console.log(req.body);
  const {name, category, price, imgUrl} = req.body;
  const newProduct = new Product({name, category, price, imgUrl});
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = (req, res) => {
  res.json({ "message": "Get Products" })
};

export const getProductsById = (req, res) => {};

export const updateProducts = (req, res) => {};

export const deleteProducts = (req, res) => {};