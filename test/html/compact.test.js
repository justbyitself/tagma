import { describe, it, expect } from 'vitest'
import { compact } from '../../src/html'

describe('compact function', () => {
  it('should remove unnecessary spaces in HTML string', () => {
    const input = `
            <div>    
                <h1>   Welcome to my page   </h1>
                <p>   This is a test paragraph.   </p>
            </div>
        `
    const expected = `<div><h1>Welcome to my page</h1><p>This is a test paragraph.</p></div>`

    const result = compact(input)

    expect(result).toBe(expected)
  })

  it('should handle empty strings', () => {
    const input = ''
    const expected = ''

    const result = compact(input)

    expect(result).toBe(expected)
  })

  it('should handle strings without unnecessary spaces', () => {
    const input = '<div><h1>Welcome</h1><p>Text</p></div>'
    const expected = '<div><h1>Welcome</h1><p>Text</p></div>'

    const result = compact(input)

    expect(result).toBe(expected)
  })
})
