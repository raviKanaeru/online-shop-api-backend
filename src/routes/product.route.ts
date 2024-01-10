import { Router } from 'express'
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById
} from '../controllers/product.controller'
import { requireUser } from '../middlewares/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/:id', getProductById)
ProductRouter.post('/', requireUser, createProduct)
ProductRouter.put('/:id', updateProductById)
ProductRouter.delete('/:id', deleteProductById)
