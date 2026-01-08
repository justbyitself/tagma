import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { cssDocument } from '../../css.js'

describe('cssDocument', () => {
  it('joins multiple string rules with newlines', () => {
    const rule1 = 'h1 { color: red; }'
    const rule2 = 'p { margin: 0; }'
    
    const result = cssDocument(rule1, rule2)
    
    expect(result).toBe(`${rule1}\n${rule2}`)
  })

  it('returns an empty string when no arguments are passed', () => {
    expect(cssDocument()).toBe('')
  })
})