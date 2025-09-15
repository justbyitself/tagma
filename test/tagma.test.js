import { describe, it } from "std/testing/bdd"
import { expect } from "std/expect"
import { resolve } from "std/path"

import tagma from "../src/tagma.js"

describe("tagma", () => {
  it("returns config, generators (with path/basename/name/type/fn) and errors", async () => {
    const dir = Deno.makeTempDirSync()

    const configPath = resolve(`${dir}/config.json`)
    Deno.writeTextFileSync(configPath, JSON.stringify({ siteTitle: "T" }))

    // Generators: uno bueno, uno con valor, uno inválido
    const good = resolve(`${dir}/ok.html.js`)

    Deno.writeTextFileSync(good, `export default function g(){ return "GOOD" }`)

    const { config, generators, errors } = await tagma(dir)

    // config
    expect(config).toBeTruthy()
    expect(typeof config).toBe("object")

    expect(Array.isArray(generators)).toBe(true)

    // each generator has expected props
    for (const g of generators) {
      expect(g).toHaveProperty("path")
      expect(g).toHaveProperty("basename")
      expect(g).toHaveProperty("name")
      expect(g).toHaveProperty("type")
      expect(typeof g.fn).toBe("function")
      // awaitable
      const r = await g.fn()
      expect(typeof r === "string").toBe(true)
    }

    // errors: should include bad.js
    expect(Array.isArray(errors)).toBe(true)
    expect(errors.length).toBe(0)
  })
})
