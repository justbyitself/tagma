import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'
import { declare } from '../../css.js'

describe('declare', () => {
  it('adds the CSS variable prefix to simple keys', () => {
    const input = {
      bg: 'white',
      text: 'black'
    }
    const result = declare(input)
    
    expect(result).toEqual({
      '--bg': 'white',
      '--text': 'black'
    })
  })

  it('does not double the prefix if it already exists', () => {
    const input = {
      '--primary': 'blue',
      secondary: 'red'
    }
    const result = declare(input)

    expect(result).toEqual({
      '--primary': 'blue',
      '--secondary': 'red'
    })
  })

  it('handles empty objects correctly', () => {
    expect(declare({})).toEqual({})
  })

  it('preserves numerical values for CSS unit variables', () => {
    const input = { spacing: '10px', gap: 2 }
    const result = declare(input)

    expect(result).toEqual({
      '--spacing': '10px',
      '--gap': 2
    })
  })
})
