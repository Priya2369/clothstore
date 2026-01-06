import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Fabrics from '../pages/Fabrics'
import ReadyMade from '../pages/ReadyMade'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import CustomStitching from '../pages/CustomStitching'

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <CartProvider>{children}</CartProvider>
  </BrowserRouter>
)

describe('Home Page', () => {
  it('renders hero section', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    expect(screen.getByText(/Crafting Elegance/)).toBeInTheDocument()
    expect(screen.getByText('Start Custom Order')).toBeInTheDocument()
    expect(screen.getByText('Shop Collection')).toBeInTheDocument()
  })

  it('renders features section', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    expect(screen.getByText('Why Choose ClothStore?')).toBeInTheDocument()
    expect(screen.getByText('Expert Tailoring')).toBeInTheDocument()
    expect(screen.getByText('Quality Fabrics')).toBeInTheDocument()
    expect(screen.getByText('Custom Designs')).toBeInTheDocument()
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument()
  })

  it('renders service categories', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    )
    expect(screen.getByText('Explore Our Services')).toBeInTheDocument()
    expect(screen.getByText('Browse Fabrics')).toBeInTheDocument()
    expect(screen.getByText('Custom Stitching')).toBeInTheDocument()
    expect(screen.getByText('Ready-Made')).toBeInTheDocument()
  })
})

describe('About Page', () => {
  it('renders about content', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    )
    expect(screen.getByText('Our Story')).toBeInTheDocument()
    expect(screen.getByText('A Legacy of Excellence')).toBeInTheDocument()
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument()
    expect(screen.getByText('Our Values')).toBeInTheDocument()
  })

  it('renders team members', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    )
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument()
    expect(screen.getByText('Raj Patel')).toBeInTheDocument()
    expect(screen.getByText('Anita Kumar')).toBeInTheDocument()
  })

  it('renders statistics', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    )
    expect(screen.getByText('15+')).toBeInTheDocument()
    expect(screen.getByText('10,000+')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
  })
})

describe('Contact Page', () => {
  it('renders contact form', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    )
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('Send Us a Message')).toBeInTheDocument()
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    )
    const submitButton = screen.getByText('Send Message')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
    })
  })

  it('renders contact information', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    )
    expect(screen.getByText('Contact Information')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
  })
})

describe('Fabrics Page', () => {
  it('renders fabric catalog', () => {
    render(
      <TestWrapper>
        <Fabrics />
      </TestWrapper>
    )
    expect(screen.getByText('Browse Fabrics')).toBeInTheDocument()
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Fabric Type')).toBeInTheDocument()
    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('displays fabric cards', () => {
    render(
      <TestWrapper>
        <Fabrics />
      </TestWrapper>
    )
    expect(screen.getByText('Pure Silk')).toBeInTheDocument()
    expect(screen.getByText('Cotton Lawn')).toBeInTheDocument()
    // Georgette appears both as a filter option and fabric card
    expect(screen.getAllByText('Georgette').length).toBeGreaterThan(0)
  })

  it('filters by type', async () => {
    render(
      <TestWrapper>
        <Fabrics />
      </TestWrapper>
    )
    const silkRadio = screen.getByLabelText('Silk')
    fireEvent.click(silkRadio)

    await waitFor(() => {
      expect(screen.getByText('Showing 1 fabric')).toBeInTheDocument()
    })
  })
})

describe('ReadyMade Page', () => {
  it('renders product catalog', () => {
    render(
      <TestWrapper>
        <ReadyMade />
      </TestWrapper>
    )
    expect(screen.getByText('Ready-Made Collection')).toBeInTheDocument()
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('displays product cards', () => {
    render(
      <TestWrapper>
        <ReadyMade />
      </TestWrapper>
    )
    expect(screen.getByText('Designer Kurti Set')).toBeInTheDocument()
    expect(screen.getByText('Silk Saree Blouse')).toBeInTheDocument()
  })
})

describe('ProductDetail Page', () => {
  it('renders product details', () => {
    render(
      <MemoryRouter initialEntries={['/ready-made/1']}>
        <CartProvider>
          <Routes>
            <Route path="/ready-made/:productId" element={<ProductDetail />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Designer Kurti Set')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
    expect(screen.getByText('Select Size')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('shows not found for invalid product', () => {
    render(
      <MemoryRouter initialEntries={['/ready-made/999']}>
        <CartProvider>
          <Routes>
            <Route path="/ready-made/:productId" element={<ProductDetail />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Product Not Found')).toBeInTheDocument()
  })
})

describe('Cart Page', () => {
  it('shows empty cart message', () => {
    render(
      <TestWrapper>
        <Cart />
      </TestWrapper>
    )
    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument()
    expect(screen.getByText('Shop Ready-Made')).toBeInTheDocument()
    expect(screen.getByText('Custom Stitching')).toBeInTheDocument()
  })
})

describe('CustomStitching Page', () => {
  it('renders step wizard', () => {
    render(
      <TestWrapper>
        <CustomStitching />
      </TestWrapper>
    )
    expect(screen.getByText('Custom Dress Stitching')).toBeInTheDocument()
    expect(screen.getByText('Select Dress Type')).toBeInTheDocument()
  })

  it('displays dress type options', () => {
    render(
      <TestWrapper>
        <CustomStitching />
      </TestWrapper>
    )
    expect(screen.getByText('Saree Blouse')).toBeInTheDocument()
    expect(screen.getByText('Kurti')).toBeInTheDocument()
    expect(screen.getByText('Gown')).toBeInTheDocument()
    expect(screen.getByText('Suit')).toBeInTheDocument()
    expect(screen.getByText('Lehenga')).toBeInTheDocument()
  })
})
