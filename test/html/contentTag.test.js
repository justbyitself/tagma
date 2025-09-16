import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { contentTag } from '../../html.js'

describe('contentTag', () => {
  it('creates a simple HTML element without attributes or children', () => {
    const result = contentTag('div')()()
    expect(result).toBe('<div></div>')
  })

  it('creates an HTML element with attributes', () => {
    const result = contentTag('input')({ type: 'text', value: 'Hello' })()
    expect(result).toBe('<input type="text" value="Hello"></input>')
  })

  it('creates an HTML element with children', () => {
    const result = contentTag('p')()(['This is ', '<strong>important</strong>'])
    expect(result).toBe('<p>This is <strong>important</strong></p>')
  })

  it('creates an HTML element with attributes and children', () => {
    const result = contentTag('a')({ href: 'https://example.com' })(['Click here'])
    expect(result).toBe('<a href="https://example.com">Click here</a>')
  })

  it('handles multiple children', () => {
    const result = contentTag('div')()(['<p>p1</p>', '<p>p2</p>', '<p>p3</p>'])
    expect(result).toBe('<div><p>p1</p><p>p2</p><p>p3</p></div>')
  })

  it('handles empty attributes and no content', () => {
    const result = contentTag('span')()()
    expect(result).toBe('<span></span>')
  })
})
