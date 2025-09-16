import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { fromFileUrl, dirname, join, resolve } from 'std/path'
import { compact } from "../html.js"
import tagma from "../src/tagma.js"

const __filename = fromFileUrl(import.meta.url)
const __dirname = dirname(__filename)

const examplesPath = resolve(__dirname, "../examples")
const expectedPath = resolve(__dirname, "./expected")

const exampleDirs = Array.from(Deno.readDirSync(examplesPath))
  .filter(dirent => dirent.isDirectory)
  .map(dirent => `${dirent.name}/`)

console.log('Directorios de ejemplos descubiertos:', exampleDirs)

describe('Generation Integration', () => {
  exampleDirs.forEach(exampleDir => {
    
    it(`generates correct files for ${exampleDir}`, async () => {
      const exampleDirPath = join(examplesPath, exampleDir.replace('/', ''))

      const { config, generators } = await tagma(exampleDirPath)

      for (const g of generators) {        
        const expectedFilePath = resolve(expectedPath, exampleDir.replace('/', ''), `${g.name}.${g.type}`)
        const expected = await Deno.readTextFile(expectedFilePath)

        const result = await g.fn(config)

        expect(compact(result)).toBe(compact(expected))
      }
    })
  })
})
