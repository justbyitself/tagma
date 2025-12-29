import { describe, it } from "std/testing/bdd";
import { expect } from "std/expect";

import normalize from "../../src/css/normalize.js";

describe("normalize CSS", () => {
  it("removes unnecessary spaces in CSS string", () => {
    const input = `
      .class  {
        color : red ;
        margin  :  10px ;
      }
    `;
    const expected = ".class{color:red;margin:10px;}";

    const result = normalize(input);

    expect(result).toBe(expected);
  });

  it("handles empty strings", () => {
    const input = "";
    const expected = "";

    const result = normalize(input);

    expect(result).toBe(expected);
  });

  it("handles strings without unnecessary spaces", () => {
    const input = ".class{color:red;margin:10px;}";
    const expected = ".class{color:red;margin:10px;}";

    const result = normalize(input);

    expect(result).toBe(expected);
  });
});
