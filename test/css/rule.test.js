import { describe, it, expect } from 'vitest'
import { rule, compact } from '../../src/css'

describe('rule', () => {
  it('creates a basic CSS rule with a single property', () => {
    const result = rule('body')({
      color: 'black'
    })

    const expected = `body {
    color: black;
}`

    expect(compact(result)).toBe(compact(expected))
  })

  it('creates a rule with multiple properties', () => {
    const result = rule('body')({
      color: 'black',
      backgroundColor: 'white',
      fontSize: '16px'
    })

    const expected = `body {
    color: black;
    background-color: white;
    font-size: 16px;
}`

    expect(compact(result)).toBe(compact(expected))
  })
})
