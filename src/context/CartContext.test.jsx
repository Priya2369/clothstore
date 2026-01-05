import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

// Test component to interact with cart
function TestComponent() {
  const { items, total, itemCount, addItem, removeItem, updateQuantity, clearCart } = useCart()

  return (
    <div>
      <span data-testid="item-count">{itemCount}</span>
      <span data-testid="total">{total}</span>
      <span data-testid="items-length">{items.length}</span>
      <button onClick={() => addItem({ id: '1', name: 'Test Product', price: 100, type: 'ready-made' })}>
        Add Item
      </button>
      <button onClick={() => items[0] && removeItem(items[0].cartId)}>
        Remove First
      </button>
      <button onClick={() => items[0] && updateQuantity(items[0].cartId, 3)}>
        Update to 3
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides initial empty state', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('item-count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
    expect(screen.getByTestId('items-length').textContent).toBe('0')
  })

  it('adds items to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await act(async () => {
      screen.getByText('Add Item').click()
    })

    expect(screen.getByTestId('item-count').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('100')
  })

  it('removes items from cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await act(async () => {
      screen.getByText('Add Item').click()
    })

    expect(screen.getByTestId('item-count').textContent).toBe('1')

    await act(async () => {
      screen.getByText('Remove First').click()
    })

    expect(screen.getByTestId('item-count').textContent).toBe('0')
  })

  it('updates item quantity', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await act(async () => {
      screen.getByText('Add Item').click()
    })

    await act(async () => {
      screen.getByText('Update to 3').click()
    })

    expect(screen.getByTestId('item-count').textContent).toBe('3')
    expect(screen.getByTestId('total').textContent).toBe('300')
  })

  it('clears cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await act(async () => {
      screen.getByText('Add Item').click()
    })

    await act(async () => {
      screen.getByText('Clear Cart').click()
    })

    expect(screen.getByTestId('item-count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('throws error when useCart is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useCart must be used within a CartProvider')

    consoleSpy.mockRestore()
  })
})
