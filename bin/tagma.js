#!/usr/bin/env node

// bin/tagma.js
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { parseArgs } from 'node:util'

/* ---------- helpers ---------- */

const log = (...a) => console.log(...a)
const warn = (...a) => console.warn(...a)
const error = (...a) => console.error(...a)

const options = {
  input: { type: 'string', short: 'i' },
  output: { type: 'string', short: 'o', default: 'dist' },
  help: { type: 'boolean', short: 'h' }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function findJsGeneratorsInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries
    .filter(e => e.isFile() && /\.([^.]+)\.js$/.test(e.name))
    .map(e => path.join(dir, e.name))
}

function deriveOutName(generatorFile) {
  const base = path.basename(generatorFile) // e.g. 'index.html.js'
  const m = base.match(/^(.*)\.([^.]+)\.js$/)
  if (!m) return null
  return `${m[1]}.${m[2]}` // 'index.html' or 'style.css'
}

async function importModule(filePath) {
  const urlPath = url.pathToFileURL(filePath).href
  return import(urlPath)
}

function writeFileAtomic(outPath, content) {
  ensureDir(path.dirname(outPath))
  fs.writeFileSync(outPath, String(content))
}

/* ---------- generator processing ---------- */

async function runGeneratorFile(generatorFile, outputDir) {
  try {
    const mod = await importModule(generatorFile)

    const defaultOutName = deriveOutName(generatorFile)
    if (!defaultOutName) {
      warn(`Skipping (pattern no match): ${generatorFile}`)
      return
    }

    let result
    if (typeof mod.default === 'function') {
      result = await Promise.resolve(mod.default())
    } else if (typeof mod.generate === 'function') {
      result = await Promise.resolve(mod.generate())
    } else if (typeof mod.generateHead === 'function' || typeof mod.generateBody === 'function') {
      const headRes = typeof mod.generateHead === 'function' ? mod.generateHead() : ''
      const bodyRes = typeof mod.generateBody === 'function' ? mod.generateBody() : ''
      const headContent = typeof headRes === 'function' ? headRes() : headRes
      const bodyContent = typeof bodyRes === 'function' ? bodyRes() : bodyRes
      result = `<!doctype html>\n${headContent}${bodyContent}`
    } else {
      warn(`No callable export found in ${generatorFile}; skipping`)
      return
    }

    if (Array.isArray(result)) {
      for (const item of result) {
        if (typeof item === 'string') {
          const outPath = path.join(outputDir, defaultOutName)
          writeFileAtomic(outPath, item)
          log(`Generated: ${outPath}`)
        } else if (item && typeof item === 'object') {
          const name = item.name || defaultOutName
          const content = item.content ?? ''
          const outPath = path.join(outputDir, name)
          writeFileAtomic(outPath, content)
          log(`Generated: ${outPath}`)
        }
      }
    } else if (result && typeof result === 'object' && ('name' in result || 'content' in result)) {
      const name = result.name || defaultOutName
      const content = result.content ?? ''
      const outPath = path.join(outputDir, name)
      writeFileAtomic(outPath, content)
      log(`Generated: ${outPath}`)
    } else {
      const content = (typeof result === 'function') ? result() : (result ?? '')
      const outPath = path.join(outputDir, defaultOutName)
      writeFileAtomic(outPath, content)
      log(`Generated: ${outPath}`)
    }
  } catch (err) {
    error(`Error processing ${generatorFile}: ${err.message}`)
  }
}

/* ---------- main ---------- */

async function main() {
  const { values } = parseArgs({ args: process.argv.slice(2), options })

  if (values.help) {
    console.log(`
Usage: tagma [options]
  -i, --input    Input file or directory
  -o, --output   Output directory (default: dist or dist/<input-dir-name> when input is a dir)
  -h, --help     Show help
`)
    process.exit(0)
  }

  if (!values.input) {
    error('Error: Input file or directory is required')
    process.exit(1)
  }

  const inputPath = path.resolve(values.input)

  // Determine outputDir:
  // - If user passed -o explicitly (any value), use it.
  // - Else if input is a directory, default to dist/<basename(input)>
  // - Else default to dist
  let outputDir
  let stats
  try {
    stats = fs.statSync(inputPath)
  } catch (err) {
    error(`Error: input path does not exist: ${inputPath}`)
    process.exit(1)
  }

  const userProvidedOutput = process.argv.includes('-o') || process.argv.includes('--output')
  if (userProvidedOutput) {
    outputDir = path.resolve(values.output)
  } else {
    if (stats.isDirectory()) {
      outputDir = path.resolve('dist', path.basename(inputPath))
    } else {
      outputDir = path.resolve('dist')
    }
  }

  if (stats.isDirectory()) {
    let files = findJsGeneratorsInDir(inputPath)
    if (files.length === 0) {
      error('No generator files found in directory')
      process.exit(1)
    }

    files.sort((a, b) => {
      const aCss = a.endsWith('.css.js')
      const bCss = b.endsWith('.css.js')
      if (aCss && !bCss) return -1
      if (bCss && !aCss) return 1
      return a.localeCompare(b)
    })

    ensureDir(outputDir)
    for (const file of files) {
      await runGeneratorFile(file, outputDir)
    }
  } else if (stats.isFile()) {
    ensureDir(outputDir)
    await runGeneratorFile(inputPath, outputDir)
  } else {
    error('Error: input is neither file nor directory')
    process.exit(1)
  }
}

main().catch(err => {
  error(err)
  process.exit(1)
})
