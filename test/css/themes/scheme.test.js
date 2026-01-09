import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'
import { isEquivalent } from '../../../css.js'
import { scheme, dark } from '../../../cssThemes.js'

describe('scheme', () => {
  const theme = {
    light: { bg: 'white', text: 'black', prefixColor: 'red' },
    dark: { bg: 'black', text: 'white', prefixColor: 'yellow' }
  }

  it('generates light as default when no second argument is provided', () => {
    const result = scheme(theme)
    const expected = `
      :root {
        --bg: white;
        --text: black;
        --prefix-color: red;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: black;
          --text: white;
          --prefix-color: yellow;
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
        --prefix-color: yellow;
      }
      @media (prefers-color-scheme: light) {
        :root {
          --bg: white;
          --text: black;
          --prefix-color: red;
        }
      }
    `

    expect(isEquivalent(result)(expected)).toBe(true)
  })
})