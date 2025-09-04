import { describe, it, expect } from 'vitest'
import { comment } from '../../src/html'


describe('comment function', () => {
  it('should create a valid HTML comment', () => {
    const input = "This is a comment"
    const expected = "<!-- This is a comment -->"
    const result = comment(input)
    expect(result).toEqual(expected)
  })

  it('should handle empty comments', () => {
    const input = ""
    const expected = "<!--  -->"
    const result = comment(input)
    expect(result).toEqual(expected)
  })

  it('should handle comments with special characters', () => {
    const input = "Comment with <special> characters & symbols"
    const expected = "<!-- Comment with <special> characters & symbols -->"
    const result = comment(input)
    expect(result).toEqual(expected)
  })
})



