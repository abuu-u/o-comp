'use client'

import Button from '@/components/button'
import PhoneInput from '@/components/phone-input'
import { initCart, resetCart, selectItems } from '@/lib/features/cart-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { api } from '@/shared/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Properties {}

const schema = z.object({
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/),
})

const Order: FC<Properties> = () => {
  const items = useAppSelector(selectItems)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    register,
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      phone:
        (typeof window !== 'undefined' && localStorage.getItem('phone')) ||
        undefined,
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const subscription = watch(({ phone }) => {
      if (phone) {
        localStorage.setItem('phone', phone)
      } else {
        localStorage.removeItem('phone')
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true)

    const resp = await api.createOrder({
      phone: data.phone.replaceAll(/\D/g, ''),
      cart: items.map(({ id, quantity }) => ({
        id,
        quantity,
      })),
    })

    if (resp.success === 1) {
      setSuccess(true)
      dispatch(resetCart())
    }

    setLoading(false)
  })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    dispatch(
      initCart({
        items,
      }),
    )
  }, [dispatch])

  return (
    <>
      {success && (
        <div
          className="fixed inset-0 z-50 grid h-full w-full place-items-center bg-[rgba(0,0,0,0.5)]"
          onClick={(event_) => {
            if (event_.target === event_.currentTarget) setSuccess(false)
          }}
        >
          <span className="popup rounded-[15px] bg-[#222] p-10 text-[#F0F0F0] ">
            Заказ успешно оформлен
          </span>
        </div>
      )}

      <form
        className="mb-[47px] grid w-full max-w-[708px] justify-items-start gap-5 rounded-[15px] bg-[#D9D9D9] p-2.5 max-md:mb-[45px] "
        onSubmit={handleFormSubmit}
      >
        <h2>Добавленные товары</h2>

        {items.length === 0 ? (
          'нету товаров'
        ) : (
          <ul>
            {items.map(({ title, quantity, price }, index) => (
              <li key={index}>
                {title} x{quantity} {price}₽
              </li>
            ))}
          </ul>
        )}

        <div className="flex w-full gap-[17px] max-md:flex-col max-md:gap-[9px] ">
          <PhoneInput
            className={`grow-[2]${errors.phone ? ' bg-red-950' : ''}`}
            mask="+7 (___) ___ __-__"
            replacement="_"
            {...register('phone')}
          />

          <Button
            className="grow disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={items.length === 0 || !isValid || loading}
          >
            заказать
          </Button>
        </div>
      </form>
    </>
  )
}

export default Order
