import StoreProvider from '../store-provider'
import Order from './order'
import Products from './products'
import Reviews from './reviews'

export default function Home() {
  return (
    <main className="grid justify-items-center pb-[388px] pt-[55px] max-md:pb-[227] max-md:pt-[13px] ">
      <h1 className="mb-[105px] w-full rounded-[15px] bg-[#777777] pb-4 text-center text-[96px] text-[#F0F0F0] max-md:mb-[97px] max-md:py-[6px] max-md:text-[40px] ">
        тестовое задание
      </h1>

      <Reviews />

      <StoreProvider>
        <Order />

        <Products />
      </StoreProvider>
    </main>
  )
}
