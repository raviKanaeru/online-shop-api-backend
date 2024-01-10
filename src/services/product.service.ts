import type ProductType from '../types/product.type'
import productModel from '../models/product.model'

export const addProductToDB = async (payload: ProductType): Promise<ProductType> => {
  return await productModel
    .create(payload)
    .then((data) => {
      return data as ProductType
    })
    .catch((error) => {
      throw error
    })
}

export const getProductsFromDB = async (): Promise<ProductType[]> => {
  return await productModel
    .find()
    .then((data) => {
      return data as ProductType[]
    })
    .catch((error) => {
      throw error
    })
}

export const getProductByIdFromDB = async (id: string): Promise<ProductType> => {
  return await productModel
    .findOne({ product_id: id })
    .then((data) => {
      return data as ProductType
    })
    .catch((error) => {
      throw error
    })
}

export const updateProductByIdFromDB = async (id: string, payload: ProductType) => {
  return await productModel.findOneAndUpdate({ product_id: id }, { $set: payload })
}

export const deleteProductByIdFromDB = async (id: string) => {
  return await productModel.findOneAndDelete({ product_id: id })
}
