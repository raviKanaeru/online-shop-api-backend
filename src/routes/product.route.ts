import { Router } from 'express'
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById
} from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/:id', getProductById)
ProductRouter.post('/', createProduct)
ProductRouter.put('/:id', updateProductById)
ProductRouter.delete('/:id', deleteProductById)
