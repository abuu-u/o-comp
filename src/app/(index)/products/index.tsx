import { api } from '@/shared/api'
import { FC } from 'react'
import ProductsInfinite from './products-infinite'

interface Properties {}

const Products: FC<Properties> = async () => {
  const { products } = await api.getProducts()

  return <ProductsInfinite initialProducts={products} />
}

export default Products
