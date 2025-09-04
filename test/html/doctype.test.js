import { describe, it, expect } from 'vitest'
import { docType } from '../../src/html'

describe('docType function', () => {
  it('should return the correct DOCTYPE declaration', () => {
    const expected = '<!DOCTYPE html>'
    const result = docType()
    expect(result).toEqual(expected)
  })
})
