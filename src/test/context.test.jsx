import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

  it('provides initial empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].name).toBe('Test Product')
    expect(result.current.itemCount).toBe(1)
    expect(result.current.subtotal).toBe(50)
  })

  it('increments quantity for existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.itemCount).toBe(2)
    expect(result.current.subtotal).toBe(100)
  })

  it('adds different sizes as separate items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'L',
      })
    })

    expect(result.current.items).toHaveLength(2)
    expect(result.current.itemCount).toBe(2)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    act(() => {
      result.current.removeItem(1, 'ready-made', 'M')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
  })

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    act(() => {
      result.current.updateQuantity(1, 'ready-made', 'M', 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
    expect(result.current.itemCount).toBe(5)
    expect(result.current.subtotal).toBe(250)
  })

  it('removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    act(() => {
      result.current.updateQuantity(1, 'ready-made', 'M', 0)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Product 1',
        price: 50,
        size: 'M',
      })
      result.current.addItem({
        id: 2,
        type: 'ready-made',
        name: 'Product 2',
        price: 75,
        size: 'L',
      })
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('persists cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    const stored = JSON.parse(localStorage.getItem('clothstore-cart'))
    expect(stored).toHaveLength(1)
    expect(stored[0].name).toBe('Test Product')
  })

  it('loads cart from localStorage on init', () => {
    const existingCart = [
      { id: 1, type: 'ready-made', name: 'Stored Product', price: 100, size: 'S', quantity: 2 },
    ]
    localStorage.setItem('clothstore-cart', JSON.stringify(existingCart))

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].name).toBe('Stored Product')
    expect(result.current.itemCount).toBe(2)
  })

  it('shows notification when adding item', async () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem({
        id: 1,
        type: 'ready-made',
        name: 'Test Product',
        price: 50,
        size: 'M',
      })
    })

    expect(result.current.notification).toBe('Test Product added to cart!')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.notification).toBeNull()
    vi.useRealTimers()
  })

  it('throws error when useCart is used outside provider', () => {
    const consoleError = console.error
    console.error = vi.fn()

    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')

    console.error = consoleError
  })
})
