import { describe, it } from "std/testing/bdd"
import { expect } from "std/expect"

import loadConfig from "../src/loadConfig.js"

describe('loadConfig', () => {
  it('loads config from JSON file', () => {
    const testDir = Deno.makeTempDirSync()
    
    const configData = { rows: 4, columns: 4 }
    Deno.writeTextFileSync(`${testDir}/config.json`, JSON.stringify(configData))

    const config = loadConfig(testDir)
    expect(config).toEqual(configData)
  })

  it('returns empty object if no config', () => {
    const testDir = Deno.makeTempDirSync()
    
    const config = loadConfig(testDir)
    expect(config).toEqual({})
  })
})
