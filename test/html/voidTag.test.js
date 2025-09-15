import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { voidTag } from '../../src/html/index.js'

describe('voidTag', () => {
  it('returns a void tag with no attributes', () => {
    expect(voidTag('img')()).toBe('<img />')
  })

  it('returns a void tag with attributes', () => {
    const attrs = { src: 'image.jpg', alt: 'An image' }
    expect(voidTag('img')(attrs)).toBe('<img src="image.jpg" alt="An image" />')
  })

  it('returns a void tag with a single attribute', () => {
    const attrs = { src: 'image.jpg' }
    expect(voidTag('img')(attrs)).toBe('<img src="image.jpg" />')
  })

  it('returns a void tag with multiple attributes', () => {
    const attrs = { src: 'image.jpg', alt: 'An image', width: '100px' }
    expect(voidTag('img')(attrs)).toBe('<img src="image.jpg" alt="An image" width="100px" />')
  })
})
