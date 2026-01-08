import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { variable } from '../../css.js'

describe('variable', () => {
  it('adds CSS variable syntax if missing dashes', () => {
    expect(variable('foo')).toBe('var(--foo)')
  })

  it('keeps variable name if dashes present', () => {
    expect(variable('--foo')).toBe('var(--foo)')
  })

  it('adds fallback value when provided', () => {
    expect(variable('foo', 'red')).toBe('var(--foo, red)')
  })  
})
