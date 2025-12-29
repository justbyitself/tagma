import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { isEquivalent } from '../../html.js'

describe('normalize', () => {
  it('removes unnecessary spaces in HTML string', () => {
    const input = `
            <div>    
                <h1>   Welcome to my page   </h1>
                <p>   This is a test paragraph.   </p>
            </div>
        `
    const expected = `<div><h1>Welcome to my page</h1><p>This is a test paragraph.</p></div>`

    expect(isEquivalent(input)(expected)).toBe(true)
  })

  it('handles empty strings', () => {
    const input = ''
    const expected = ''

    expect(isEquivalent(input)(expected)).toBe(true)
  })

  it('handles strings without unnecessary spaces', () => {
    const input = '<div><h1>Welcome</h1><p>Text</p></div>'
    const expected = '<div><h1>Welcome</h1><p>Text</p></div>'

    expect(isEquivalent(input)(expected)).toBe(true)
  })
})
