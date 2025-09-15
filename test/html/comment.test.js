import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { comment } from '../../src/html/index.js'

describe('comment', () => {
  it('creates a valid HTML comment', () => {
    const input = "This is a comment"
    const expected = "<!-- This is a comment -->"
    const result = comment(input)
    expect(result).toBe(expected)
  })

  it('handles empty comments', () => {
    const input = ""
    const expected = "<!--  -->"
    const result = comment(input)
    expect(result).toBe(expected)
  })

  it('handles comments with special characters', () => {
    const input = "Comment with <special> characters & symbols"
    const expected = "<!-- Comment with <special> characters & symbols -->"
    const result = comment(input)
    expect(result).toBe(expected)
  })
})
