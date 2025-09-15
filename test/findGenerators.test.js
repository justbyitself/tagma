import { describe, it } from "std/testing/bdd"
import { expect } from "std/expect"

import findGenerators from "../src/findGenerators.js"

describe('findGenerators', () => {
  it('finds JS generator files', () => {
    const testDir = Deno.makeTempDirSync()
    
    Deno.writeTextFileSync(`${testDir}/grid.html.js`, '')
    Deno.writeTextFileSync(`${testDir}/styles.css.js`, '')
    Deno.writeTextFileSync(`${testDir}/index.js`, '')
    Deno.writeTextFileSync(`${testDir}/README.md`, '')

    const generators = findGenerators(testDir)

    expect(generators).toHaveLength(2)
    expect(generators).toContain(`${testDir}/grid.html.js`)
    expect(generators).toContain(`${testDir}/styles.css.js`)
  })
})
