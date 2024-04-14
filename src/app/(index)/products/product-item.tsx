'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import {
  addItem,
  decreaseQuantityById,
  increaseQuantityById,
  selectQuantity,
  setQuantity,
} from '@/lib/features/cart-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { Product } from '@/shared/api'
import Image from 'next/image'
import { FC } from 'react'

interface Properties {
  product: Product
}

const ProductItem: FC<Properties> = ({
  product: { id, title, image_url, description, price },
}) => {
  const quantity = useAppSelector(selectQuantity(id))
  const dispatch = useAppDispatch()

  return (
    <li className="grid w-full grid-rows-[auto_auto_1fr_auto_auto] justify-items-center gap-5 rounded-[15px] bg-[#D9D9D9] p-2.5 ">
      <div className="relative aspect-[10/13] w-full">
        <Image
          className="rounded-[15px] object-cover "
          src={image_url}
          alt={title}
          fill
        />
      </div>

      <h3 className="line-clamp-1 break-all">{title}</h3>

      <p className="line-clamp-6 w-full break-all">{description}</p>

      <p>цена: {price}₽</p>

      {quantity ? (
        <div className="flex gap-2 justify-self-stretch">
          <Button
            className="aspect-square h-full"
            onClick={() => dispatch(decreaseQuantityById(id))}
          >
            -
          </Button>

          <Input
            className="w-1 grow"
            type="number"
            value={quantity}
            onChange={(event_) =>
              dispatch(
                setQuantity({ id, quantity: Number(event_.target.value) }),
              )
            }
          />

          <Button
            className="aspect-square h-full"
            onClick={() => dispatch(increaseQuantityById(id))}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          className="justify-self-stretch"
          onClick={() =>
            dispatch(
              addItem({
                id,
                price,
                quantity: 1,
                title,
              }),
            )
          }
        >
          купить
        </Button>
      )}
    </li>
  )
}

export default ProductItem
