import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'clothstore_cart'

const initialState = {
  items: [],
  total: 0,
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function cartReducer(state, action) {
  let newItems

  switch (action.type) {
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
      }

    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.type === action.payload.type
      )

      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    }

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.cartId !== action.payload)
      return {
        items: newItems,
        total: calculateTotal(newItems),
      }

    case 'UPDATE_QUANTITY':
      newItems = state.items.map(item =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return {
        items: newItems,
        total: calculateTotal(newItems),
      }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: items })
      } catch (e) {
        console.error('Failed to load cart from storage:', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item) => {
    const cartId = `${item.type}-${item.id}-${Date.now()}`
    dispatch({ type: 'ADD_ITEM', payload: { ...item, cartId } })
  }

  const removeItem = (cartId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeItem(cartId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
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

export default CartContext
