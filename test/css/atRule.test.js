import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { rule, atRule, isEquivalent } from '../../css.js'

describe('atRule', () => {
  it('creates an @media rule wrapping internal rules', () => {
    const result = atRule('@media (min-width: 768px)')(
      rule('body')({
        gridTemplateColumns: '250px 1fr'
      }),
      rule('nav')({
        display: 'block'
      })
    )

    const expected = `@media (min-width: 768px) {
      body {
        grid-template-columns: 250px 1fr;
      }
      nav {
        display: block;
      }
    }`

    expect(isEquivalent(result)(expected)).toBe(true)
  })

  it('works with other at-rules like @keyframes', () => {
    const result = atRule('@keyframes fadeIn')(
      rule('from')({ opacity: 0 }),
      rule('to')({ opacity: 1 })
    )

    const expected = `@keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }`

    expect(isEquivalent(result)(expected)).toBe(true)
  })
})