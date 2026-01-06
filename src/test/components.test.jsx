import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FabricCard from '../components/fabric/FabricCard'
import ProductCard from '../components/product/ProductCard'
import SizeSelector from '../components/product/SizeSelector'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <CartProvider>{children}</CartProvider>
  </BrowserRouter>
)

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    let clicked = false
    render(<Button onClick={() => (clicked = true)}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-primary-600')
  })
})

describe('Card Component', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders with Card.Body', () => {
    render(
      <Card>
        <Card.Body>Body content</Card.Body>
      </Card>
    )
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})

describe('Header Component', () => {
  it('renders navigation links', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    expect(screen.getByText('ClothStore')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Fabrics')).toBeInTheDocument()
    expect(screen.getByText('Custom Stitching')).toBeInTheDocument()
    expect(screen.getByText('Ready-Made')).toBeInTheDocument()
  })

  it('shows cart icon', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    expect(screen.getByLabelText('Shopping Cart')).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    )
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })
})

describe('Footer Component', () => {
  it('renders contact information', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    )
    expect(screen.getByText('ClothStore')).toBeInTheDocument()
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('Business Hours')).toBeInTheDocument()
  })
})

describe('FabricCard Component', () => {
  const mockFabric = {
    id: 1,
    name: 'Pure Silk',
    color: 'Red',
    colorHex: '#dc2626',
    type: 'Silk',
    price: 45.99,
    image: 'https://example.com/silk.jpg',
    inStock: true,
  }

  it('renders fabric information', () => {
    render(<FabricCard fabric={mockFabric} onSelect={() => {}} />)
    expect(screen.getByText('Pure Silk')).toBeInTheDocument()
    expect(screen.getByText('Silk')).toBeInTheDocument()
    expect(screen.getByText('$45.99')).toBeInTheDocument()
  })

  it('shows out of stock label', () => {
    const outOfStockFabric = { ...mockFabric, inStock: false }
    render(<FabricCard fabric={outOfStockFabric} onSelect={() => {}} />)
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    let selectedFabric = null
    render(
      <FabricCard fabric={mockFabric} onSelect={(f) => (selectedFabric = f)} />
    )
    fireEvent.click(screen.getByText('Pure Silk'))
    expect(selectedFabric).toEqual(mockFabric)
  })
})

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Designer Kurti',
    category: 'Kurti',
    price: 89.99,
    originalPrice: 129.99,
    sizes: ['S', 'M', 'L'],
    sizeAvailability: { S: true, M: true, L: true },
    colors: ['Red', 'Blue'],
    images: ['https://example.com/kurti.jpg'],
    inStock: true,
    featured: true,
  }

  it('renders product information', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )
    expect(screen.getByText('Designer Kurti')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
    expect(screen.getByText('$129.99')).toBeInTheDocument()
  })

  it('shows sale badge when on sale', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )
    expect(screen.getByText('Sale')).toBeInTheDocument()
  })
})

describe('SizeSelector Component', () => {
  const sizes = ['S', 'M', 'L', 'XL']
  const sizeAvailability = { S: true, M: true, L: false, XL: true }

  it('renders all sizes', () => {
    render(
      <SizeSelector
        sizes={sizes}
        sizeAvailability={sizeAvailability}
        selectedSize={null}
        onSelect={() => {}}
      />
    )
    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('XL')).toBeInTheDocument()
  })

  it('disables unavailable sizes', () => {
    render(
      <SizeSelector
        sizes={sizes}
        sizeAvailability={sizeAvailability}
        selectedSize={null}
        onSelect={() => {}}
      />
    )
    expect(screen.getByText('L').closest('button')).toBeDisabled()
  })

  it('calls onSelect when size clicked', () => {
    let selected = null
    render(
      <SizeSelector
        sizes={sizes}
        sizeAvailability={sizeAvailability}
        selectedSize={null}
        onSelect={(s) => (selected = s)}
      />
    )
    fireEvent.click(screen.getByText('M'))
    expect(selected).toBe('M')
  })
})

describe('CartSummary Component', () => {
  it('renders order summary', () => {
    render(
      <TestWrapper>
        <CartSummary />
      </TestWrapper>
    )
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Estimated Tax')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })
})
