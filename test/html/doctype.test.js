import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { docType } from '../../html.js'

describe('docType', () => {
  it('returns the correct DOCTYPE declaration', () => {
    const expected = '<!DOCTYPE html>'
    const result = docType()
    expect(result).toBe(expected)
  })
})
