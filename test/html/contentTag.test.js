import { describe, expect, it } from 'vitest'
import { contentTag } from '../../src/html'

describe('contentTag', () => {
  it('should create a simple HTML element without attributes or children', () => {
    const result = contentTag('div')()()
    expect(result).toBe('<div></div>')
  })

  it('should create an HTML element with attributes', () => {
    const result = contentTag('input')({ type: 'text', value: 'Hello' })()
    expect(result).toBe('<input type="text" value="Hello"></input>')
  })

  it('should create an HTML element with children', () => {
    const result = contentTag('p')()('This is ', '<strong>important</strong>')
    expect(result).toBe('<p>This is <strong>important</strong></p>')
  })

  it('should create an HTML element with attributes and children', () => {
    const result = contentTag('a')({ href: 'https://example.com' })('Click here')
    expect(result).toBe('<a href="https://example.com">Click here</a>')
  })

  it('should handle multiple children', () => {
    const result = contentTag('div')()('<p>p1</p>', '<p>p2</p>', '<p>p3</p>')
    expect(result).toBe('<div><p>p1</p><p>p2</p><p>p3</p></div>')
  })

  it('should handle empty attributes and no content', () => {
    const result = contentTag('span')()()
    expect(result).toBe('<span></span>')
  })
})
