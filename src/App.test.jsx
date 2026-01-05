import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // App should render the layout which includes the header with site name
    expect(document.body).toBeInTheDocument()
  })

  it('renders the home page by default', () => {
    render(<App />)
    // Home page should show the hero section or main content
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('contains navigation links', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
