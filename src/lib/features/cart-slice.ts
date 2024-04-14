import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { startAppListening } from '../listener-middleware'
import { RootState } from '../store'

interface Item {
  id: number
  quantity: number
  title: string
  price: number
}

interface CartState {
  items: Item[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (_, action: PayloadAction<CartState>) => {
      return action.payload
    },
    resetCart: () => initialState,
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    increaseQuantityById: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) item.quantity++
    },
    decreaseQuantityById: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        state.items = state.items.filter((item) => item.id !== id)
      }
    },
    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
  },
})

export const {
  addItem,
  decreaseQuantityById,
  increaseQuantityById,
  setQuantity,
  initCart,
  resetCart,
} = cartSlice.actions

startAppListening({
  matcher: (action): action is any => action.type.startsWith('cart/'),

  effect: (_, { getState }) => {
    localStorage.setItem('cart', JSON.stringify(getState().cart.items))
  },
})

export const selectItems = (state: RootState) => state.cart.items
export const selectQuantity = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id)?.quantity

const cartReducer = cartSlice.reducer

export default cartReducer
