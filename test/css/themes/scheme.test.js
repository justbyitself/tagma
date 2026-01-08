import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'
import { isEquivalent } from '../../../css.js'
import { scheme, dark } from '../../../cssThemes.js'

describe('scheme', () => {
  const theme = {
    light: { bg: 'white', text: 'black' },
    dark: { bg: 'black', text: 'white' }
  }

  it('generates light as default when no second argument is provided', () => {
    const result = scheme(theme)
    const expected = `
      :root {
        --bg: white;
        --text: black;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: black;
          --text: white;
        }
      }
    `

    expect(isEquivalent(result)(expected)).toBe(true)
  })

  it('generates dark as default and uses light for the media query', () => {
    const result = scheme(theme, dark)
    const expected = `
      :root {
        --bg: black;
        --text: white;
      }
      @media (prefers-color-scheme: light) {
        :root {
          --bg: white;
          --text: black;
        }
      }
    `

    expect(isEquivalent(result)(expected)).toBe(true)
  })
})