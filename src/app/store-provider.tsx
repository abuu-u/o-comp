'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '../lib/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeReference = useRef<AppStore>()
  if (!storeReference.current) {
    // Create the store instance the first time this renders
    storeReference.current = makeStore()
  }

  return <Provider store={storeReference.current}>{children}</Provider>
}
