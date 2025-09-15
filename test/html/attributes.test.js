import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { attributes } from '../../src/html/index.js'

describe('attributes', () => {
  it('converts a single object to HTML attributes', () => {
    const input = { id: 'myId', class: 'myClass' }
    const expected = 'id="myId" class="myClass"'
    const result = attributes(input)
    expect(result).toBe(expected)
  })

  it('converts a single object with true boolean value', () => {
    const input = { disabled: true }
    const expected = 'disabled'
    const result = attributes(input)
    expect(result).toBe(expected)
  })

  it('converts a single map to HTML attributes', () => {
    const input = new Map([['id', 'myId'], ['class', 'myClass']])
    const expected = 'id="myId" class="myClass"'
    const result = attributes(input)
    expect(result).toBe(expected)
  })

  it('combines multiple objects into HTML attributes', () => {
    const input1 = { id: 'myId' }
    const input2 = { class: 'myClass', disabled: true }
    const expected = 'id="myId" class="myClass" disabled'
    const result = attributes(input1, input2)
    expect(result).toBe(expected)
  })

  it('handles no parameters', () => {
    const expected = ''
    const result = attributes()
    expect(result).toBe(expected)
  })

  it('handles an array that contains multiple objects into HTML attributes', () => {
    const input1 = { id: 'myId' }
    const input2 = { class: 'myClass', disabled: true }
    const expected = 'id="myId" class="myClass" disabled'
    const result = attributes(input1, input2)
    expect(result).toBe(expected)
  })

  it('handles boolean attributes correctly', () => {
    const input = { checked: true, disabled: false }
    const expected = 'checked'
    const result = attributes(input)
    expect(result).toBe(expected)
  })
})
