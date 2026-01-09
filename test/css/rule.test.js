import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { rule, isEquivalent } from '../../css.js'

describe('rule', () => {
  it('creates a basic CSS rule with a single property', () => {
    const result = rule('body')({
      color: 'black'
    })

    const expected = `body {
      color: black;
    }`

    expect(isEquivalent(result)(expected)).toBe(true)
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

    expect(isEquivalent(result)(expected)).toBe(true)
  })

  it('creates a rule from multiple objects', () => {
    const obj1 = { color: 'black' }
    const obj2 = {
        backgroundColor: 'white',
        fontSize: '16px'
      }

    const result = rule('body')(obj1, obj2)

    const expected = `body {
      color: black;
      background-color: white;
      font-size: 16px;
    }`

    expect(isEquivalent(result)(expected)).toBe(true)
  })
})
