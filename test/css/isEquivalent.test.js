import { describe, it } from "std/testing/bdd"
import { expect } from "std/expect"

import isEquivalent from "../../src/css/isEquivalent.js"

describe("normalize CSS", () => {
  it("removes unnecessary spaces in CSS string", () => {
    const input = `
      .class  {
        color : red ;
        margin  :  10px ;
      }
    `

    const expected = ".class{color:red;margin:10px;}"

    expect(isEquivalent(input)(expected)).toBe(true)
  });

  it("handles empty strings", () => {
    const input = ""
    const expected = ""

    expect(isEquivalent(input)(expected)).toBe(true)
  });

  it("handles strings without unnecessary spaces", () => {
    const input = ".class{color:red;margin:10px;}"
    const expected = ".class{color:red;margin:10px;}"

    expect(isEquivalent(input)(expected)).toBe(true)
  })
})
