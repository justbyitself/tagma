import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { url } from '../../css.js'

describe('url', () => {
  it('creates an url function', () => {
    expect(url('image.png')).toBe('url("image.png")')
  })
})