// test/importGenerators.test.js
import { describe, it } from "std/testing/bdd"
import { expect } from "std/expect"
import { resolve } from "https://deno.land/std@0.203.0/path/mod.ts"

import importGenerators from "../src/importGenerators.js"

describe("importGenerators", () => {
  it("returns items with path, basename, name, type, fn or error; fn always callable when present", async () => {
    const dir = Deno.makeTempDirSync()
    const good = resolve(`${dir}/good.html.js`)
    const value = resolve(`${dir}/value.rss.js`)
    const bad = resolve(`${dir}/bad.js`)
    const missing = resolve(`${dir}/missing.js`) // no crear

    // good: default function
    Deno.writeTextFileSync(good, `export default function g(){ return "OK" }`)

    // value: default is value (non-function) — should be wrapped
    Deno.writeTextFileSync(value, `export default "CONST"`)

    // bad: no default export
    Deno.writeTextFileSync(bad, `export const notDefault = 1`)

    const paths = [good, value, bad, missing]
    const items = await importGenerators(paths)

    // Expect one item per path in same order
    expect(items).toHaveLength(4)
    const byPath = Object.fromEntries(items.map(i => [i.path, i]))

    // good
    expect(byPath[good]).toBeDefined()
    expect(byPath[good].basename).toBe("good.html.js")
    expect(byPath[good].name).toBe("good")
    expect(byPath[good].type).toBe("html")
    expect(typeof byPath[good].fn).toBe("function")
    expect(byPath[good].error).toBeNull()

    // value (wrapped)
    expect(byPath[value]).toBeDefined()
    expect(byPath[value].basename).toBe("value.rss.js")
    expect(byPath[value].name).toBe("value")
    expect(byPath[value].type).toBe("rss")
    expect(typeof byPath[value].fn).toBe("function")
    expect(await byPath[value].fn()).toBe("CONST")
    expect(byPath[value].error).toBeNull()

    // bad (no default)
    expect(byPath[bad]).toBeDefined()
    expect(byPath[bad].fn).toBeNull()
    expect(byPath[bad].error).toBeTruthy()
    expect(byPath[bad].error.message).toMatch(/no exporta default|no default/i)

    // missing (import error)
    expect(byPath[missing]).toBeDefined()
    expect(byPath[missing].fn).toBeNull()
    expect(byPath[missing].error).toBeTruthy()
    expect(byPath[missing].error.message.length).toBeGreaterThan(0)
  })
})
