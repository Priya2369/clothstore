import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Button from './Button'

describe('Button', () => {
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

  it('renders as a button by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as a link when "to" prop is provided', () => {
    renderWithRouter(<Button to="/test">Go to test</Button>)
    expect(screen.getByRole('link', { name: 'Go to test' })).toBeInTheDocument()
  })

  it('renders as an anchor when "href" prop is provided', () => {
    render(<Button href="https://example.com">External link</Button>)
    expect(screen.getByRole('link', { name: 'External link' })).toHaveAttribute('href', 'https://example.com')
  })

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary-600')
  })

  it('applies outline variant styles when specified', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('border-primary-600')
  })

  it('applies different size classes', () => {
    render(<Button size="lg">Large button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('px-8')
  })
})
