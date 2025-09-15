#!/usr/bin/env -S deno run --allow-read --allow-write

import { parse } from "https://deno.land/std@0.203.0/flags/mod.ts"
import { resolve, basename, join, relative } from "https://deno.land/std@0.203.0/path/mod.ts"
import tagma from "../src/tagma.js"

function usage() {
  return `Usage: tagma [options]
  -i, --input    Input directory
  -o, --output   Output directory (default: dist or dist/<input-dir-name> when input is a dir)
  -h, --help     Show help
`
}

function defaultOutputForInput(inputPath) {
  const stat = Deno.statSync(inputPath)
  if (stat.isDirectory) return join("dist", basename(inputPath))
  return "dist"
}

function stripJsExtension(name) {
  // remove a single trailing ".js" only
  return name.replace(/\.js$/, "")
}

function filenameForGenerator(g) {
  if (g && typeof g.basename === "string" && g.basename.length > 0) return stripJsExtension(g.basename)
  if (g && typeof g.name === "string" && typeof g.type === "string") return `${g.name}.${g.type}`
  if (g && typeof g.path === "string") return stripJsExtension(basename(g.path))
  return "unknown"
}

async function writeFile(outDir, filename, data) {
  const outPath = join(outDir, filename)
  await Deno.mkdir(resolve(outDir), { recursive: true })
  if (data instanceof Uint8Array) {
    await Deno.writeFile(outPath, data)
  } else {
    await Deno.writeTextFile(outPath, String(data))
  }
  return outPath
}

function printErrors(errors) {
  if (!Array.isArray(errors) || errors.length === 0) return
  console.error("Generators errors:")
  for (const e of errors) {
    if (e && e.path) {
      console.error(`- ${e.path}:`, e.message ?? JSON.stringify(e))
    } else {
      console.error("-", e)
    }
  }
}

async function main() {
  const parsed = parse(Deno.args, {
    string: ["i", "input", "o", "output"],
    boolean: ["h", "help"],
    alias: { i: "input", o: "output", h: "help" },
  })

  if (parsed.help) {
    console.log(usage())
    return
  }

  const input = parsed.input
  if (!input) {
    console.error("Error: --input is required\n")
    console.log(usage())
    Deno.exit(2)
  }

  if (typeof tagma !== "function") {
    console.error("Error: src/tagma.js does not export a default function")
    Deno.exit(3)
  }

  const absInput = resolve(input)
  let outDir
  try {
    outDir = parsed.output ?? defaultOutputForInput(absInput)
  } catch (err) {
    console.error("Error resolving output directory:", err)
    Deno.exit(1)
  }

  console.log(
    `input: ${relative(Deno.cwd(), absInput)}\noutput: ${relative(
      Deno.cwd(),
      resolve(outDir)
    )}`
  )

  try {
    const result = await tagma(absInput)
    const { config, generators, errors } = result ?? {}

    

    if (Array.isArray(errors) && errors.length > 0) {
      printErrors(errors)
    }

    if (!Array.isArray(generators) || generators.length === 0) {
      console.error("No generators found")
      Deno.exit(1)
    }

    let written = 0
    const writeFailures = []

    for (const g of generators) {
      if (!g || typeof g.fn !== "function") {
        writeFailures.push({ path: g && g.path, reason: "invalid generator (no fn)" })
        continue
      }

      const targetName = filenameForGenerator(g)

      try {
        const res = await g.fn(config)

        // accept { filename, content }
        let filename = targetName
        //let content = res

        if (res && typeof res === "object" && !(res instanceof Uint8Array) && !(typeof res === "string")) {
          if (typeof res.filename === "string" && res.filename.length > 0) filename = stripJsExtension(res.filename)
          content = res.content
        }

        await writeFile(outDir, filename, res)
        console.log(`Wrote ${filename}`)
        written++
      } catch (err) {
        console.error(`Error running generator ${g.path ?? targetName}:`, err)
        writeFailures.push({ path: g && g.path, reason: err && err.message ? err.message : String(err) })
      }
    }

    if (writeFailures.length > 0 || (Array.isArray(errors) && errors.length > 0)) {
      Deno.exit(1)
    }

    if (written === 0) {
      console.error("No files written")
      Deno.exit(1)
    }

    Deno.exit(0)
  } catch (err) {
    console.error("tagma threw an error:")
    console.error(err)
    Deno.exit(1)
  }
}

if (import.meta.main) main()
