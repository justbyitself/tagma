import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { media, isEquivalent } from '../../css.js'

describe('media', () => {
  it('creates an @media rule wrapping internal rules', () => {
    const result = media('(min-width: 768px)')(
      `body {
        grid-template-columns: 250px 1fr;
      }
      nav {
        display: block;
      }`
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
})