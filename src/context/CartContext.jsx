import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const CART_STORAGE_KEY = 'clothstore-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const addItem = (item) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.type === item.type && i.size === item.size
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += item.quantity || 1
        return updated
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
    showNotification(`${item.name} added to cart!`)
  }

  const removeItem = (itemId, type, size) => {
    setItems((prev) => prev.filter(
      (i) => !(i.id === itemId && i.type === type && i.size === size)
    ))
  }

  const updateQuantity = (itemId, type, size, quantity) => {
    if (quantity < 1) {
      removeItem(itemId, type, size)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId && i.type === type && i.size === size
          ? { ...i, quantity }
          : i
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
