const BASE_URL = process.env.NODE_ENV
  ? 'http://localhost:3000/api'
  : 'http://o-complex.com:1337'

export interface Product {
  id: number
  image_url: string
  title: string
  description: string
  price: number
}

export const api = {
  getReviews: async (): Promise<
    {
      id: number
      text: string
    }[]
  > => {
    const response = await fetch(`${BASE_URL}/reviews`)

    return await response.json()
  },

  getProducts: async (parameters?: {
    page?: number
    page_size?: number
  }): Promise<{
    page: number
    amount: number
    total: number
    products: Product[]
  }> => {
    const { page = 1, page_size = 18 } = parameters ?? {}

    const response = await fetch(
      `${BASE_URL}/products?page=${page}&page_size=${page_size}`,
    )

    return response.json()
  },

  createOrder: async (data: {
    phone: string
    cart: {
      id: number
      quantity: number
    }[]
  }): Promise<
    | {
        success: 0
        error: string
      }
    | {
        success: 1
      }
  > => {
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  },
}
