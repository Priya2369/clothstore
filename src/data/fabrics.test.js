import { describe, it, expect } from 'vitest'
import { fabrics, fabricTypes, fabricColors } from './fabrics'

describe('Fabrics Data', () => {
  it('contains fabrics array with items', () => {
    expect(Array.isArray(fabrics)).toBe(true)
    expect(fabrics.length).toBeGreaterThan(0)
  })

  it('each fabric has required properties', () => {
    fabrics.forEach((fabric) => {
      expect(fabric).toHaveProperty('id')
      expect(fabric).toHaveProperty('name')
      expect(fabric).toHaveProperty('type')
      expect(fabric).toHaveProperty('color')
      expect(fabric).toHaveProperty('image')
      expect(fabric).toHaveProperty('description')
      expect(fabric).toHaveProperty('pricePerMeter')
    })
  })

  it('fabric types array includes All option', () => {
    expect(fabricTypes).toContain('All')
  })

  it('fabric colors array includes All option', () => {
    expect(fabricColors).toContain('All')
  })
})
