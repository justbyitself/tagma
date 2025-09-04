import { describe, it, expect } from 'vitest'
import { attributes } from '../../src/html'

describe('attributes function', () => {
  it('should convert a single object to HTML attributes', () => {
    const input = { id: 'myId', class: 'myClass' }
    const expected = 'id="myId" class="myClass"'
    const result = attributes(input)
    expect(result).toEqual(expected)
  })

  it('should combine multiple objects into HTML attributes', () => {
    const input1 = { id: 'myId' }
    const input2 = { class: 'myClass', disabled: true }
    const expected = 'id="myId" class="myClass" disabled'
    const result = attributes(input1, input2)
    expect(result).toEqual(expected)
  })

  it('should handle boolean attributes correctly', () => {
    const input = { checked: true, disabled: false }
    const expected = 'checked'
    const result = attributes(input)
    expect(result).toEqual(expected)
  })
})

