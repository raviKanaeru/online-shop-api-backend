import 'dotenv/config'

const CONFIG = {
  db: process.env.DB,
  jwt_public: `${process.env.JWT_PUBLIC_KEY}`,
  jwt_private: `${process.env.JWT_PRIVATE_KEY}`
}
export default CONFIG
