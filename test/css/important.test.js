import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { important } from '../../css.js'

describe('important', () => {
  it('add " !important"', () => {
    expect(important('red')).toBe('red !important')
  })
})
