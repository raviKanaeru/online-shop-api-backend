import { type Request, type Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import {
  addProductToDB,
  deleteProductByIdFromDB,
  getProductByIdFromDB,
  getProductsFromDB,
  updateProductByIdFromDB
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import type ProductType from '../types/product.type'
import CustomValidationError from '../errors/validation.error'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productId = uuidv4()
    const { error, value } = createProductValidation({ ...req.body, product_id: productId })

    if (error) {
      throw new CustomValidationError(422, error.details)
    }

    await addProductToDB(value)

    return res.status(201).json({ status: true, statusCode: 201, message: 'Add product success' })
  } catch (error: any) {
    if (error instanceof CustomValidationError) {
      return res
        .status(error.statusCode)
        .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors })
    }

    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const products: ProductType[] = await getProductsFromDB()
    return res.status(200).json({ status: true, statusCode: 200, data: products })
  } catch (error: any) {
    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req

    const product: ProductType = await getProductByIdFromDB(id)
    if (!product) {
      return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} })
    }
    return res.status(200).json({ status: true, statusCode: 200, data: product })
  } catch (error: any) {
    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req

    const { error, value } = updateProductValidation(req.body)
    if (error) {
      throw new CustomValidationError(422, error.details)
    }
    const product = await updateProductByIdFromDB(id, value)
    if (!product) {
      return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} })
    }

    return res.status(200).json({ status: true, statusCode: 200, message: 'Update product success' })
  } catch (error: any) {
    if (error instanceof CustomValidationError) {
      return res
        .status(error.statusCode)
        .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors })
    }

    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const product = await deleteProductByIdFromDB(id)

    if (!product) {
      return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} })
    }

    return res.status(200).json({ status: true, statusCode: 200, message: 'Delete product to success' })
  } catch (error: any) {
    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}
