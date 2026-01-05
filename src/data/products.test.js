import { describe, it, expect } from 'vitest'
import { products, categories, priceRanges, sizes } from './products'

describe('Products Data', () => {
  it('contains products array with items', () => {
    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
  })

  it('each product has required properties', () => {
    products.forEach((product) => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('category')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('images')
      expect(product).toHaveProperty('sizes')
      expect(product).toHaveProperty('description')
    })
  })

  it('categories array has correct structure', () => {
    categories.forEach((category) => {
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('count')
    })
  })

  it('price ranges have min and max values', () => {
    priceRanges.forEach((range) => {
      expect(range).toHaveProperty('min')
      expect(range).toHaveProperty('max')
      expect(range.min).toBeLessThanOrEqual(range.max)
    })
  })

  it('sizes array is not empty', () => {
    expect(sizes.length).toBeGreaterThan(0)
  })
})
