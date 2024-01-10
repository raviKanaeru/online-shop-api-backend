import Joi from 'joi'
import type ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.string().required()
  })

  return schema.validate(payload, { abortEarly: false })
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload, { abortEarly: false })
}
