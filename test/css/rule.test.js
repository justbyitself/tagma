import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { rule, compact } from '../../src/css/index.js'

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
