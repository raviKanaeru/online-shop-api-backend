import bcrypt from 'bcrypt'

export const hashing = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const checkPassword = (password: string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword)
}
