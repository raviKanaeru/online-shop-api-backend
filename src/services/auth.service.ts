import userModel from '../models/user.model'
import type UserType from '../types/user.type'

export const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel
    .findOne({ email })
    .then((data) => {
      return data as UserType
    })
    .catch((error) => {
      throw error
    })
}
