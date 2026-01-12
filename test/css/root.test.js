import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { root, isEquivalent } from '../../css.js'

describe('root', () => {
  it('creates an :root rule', () => {
    const result = root({
      '--main-color': 'hotpink',
      '--pane-padding': '5px 42px'
    })

    const expected = `:root {
      --main-color: hotpink;
      --pane-padding: 5px 42px;
    }`

    expect(isEquivalent(result)(expected)).toBe(true)
  })
})