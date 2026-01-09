import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { variables } from '../../../cssThemes.js'

describe('variables', () => {
  it('maps theme keys to CSS variable references', () => {
    const theme = {
      light: { primary: 'blue', surface: 'white' },
      dark: { primary: 'lightblue', surface: 'black' }
    }

    const v = variables(theme)

    expect(v).toEqual({
      primary: 'var(--primary)',
      surface: 'var(--surface)'
    })
  })

  it('includes keys that might only exist in one of the schemes', () => {
    const theme = {
      light: { onlyLight: 'red' },
      dark: { onlyDark: 'blue' }
    }

    const v = variables(theme)

    expect(v).toEqual({
      onlyLight: 'var(--only-light)',
      onlyDark: 'var(--only-dark)'
    })
  })
})