import { Product } from '@/shared/api'
import { FC } from 'react'
import ProductItem from './product-item'

interface Properties {
  products: Product[]
}

const ProductsList: FC<Properties> = ({ products }) => {
  return (
    <ul className="grid w-full min-w-0 max-w-[983px] auto-rows-fr grid-cols-[repeat(auto-fill,301px)] justify-center gap-x-10 gap-y-[35px] max-md:grid-cols-1 max-md:gap-y-[18px] ">
      {products.map((product, index) => (
        <ProductItem product={product} key={index} />
      ))}
    </ul>
  )
}

export default ProductsList
