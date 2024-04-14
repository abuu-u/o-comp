'use client'

import { api } from '@/shared/api'
import { FC, useEffect, useRef, useState } from 'react'
import ProductsList from './products-list'

interface Properties {
  initialProducts: Awaited<ReturnType<typeof api.getProducts>>['products']
}

const ProductsInfinite: FC<Properties> = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts)
  const bottomReference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let page = 1
    let end = false

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !end) {
        page++
        const response = await api.getProducts({ page })

        if (response.products.length === 0) {
          end = true
        } else {
          setProducts((previous) => [...previous, ...response.products])
        }
      }
    })

    if (!bottomReference.current) return

    observer.observe(bottomReference.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ProductsList products={products} />
      <div ref={bottomReference}></div>
    </>
  )
}

export default ProductsInfinite
