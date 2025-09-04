import { describe, it, expect } from 'vitest'
import { readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { compact } from '../src/html'

describe('Generation Integration', () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const examplesPath = resolve(__dirname, '../examples')
  const expectedPath = resolve(__dirname, './expected')

  // Descubrimiento de directorios
  const exampleDirs = fs.readdirSync(examplesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => `${dirent.name}/`)

  console.log('Directorios de ejemplos descubiertos:', exampleDirs)

  exampleDirs.forEach(exampleDir => {
    it(`generates correct files for ${exampleDir}`, async () => {
      // Buscar archivos .js en el directorio de ejemplos
      const generatorFiles = fs.readdirSync(join(examplesPath, exampleDir.replace('/', '')))
        .filter(file => file.endsWith('.js'))

      // Comparar cada archivo generado con su expected
      for (const generatorFile of generatorFiles) {
        const [name, type] = generatorFile.split('.')
        
        // Importar generador
        const generatorPath = join(examplesPath, exampleDir.replace('/', ''), generatorFile)
        const generatorModule = await import(generatorPath)
        
        // Obtener la función generadora (manejar default export o named export)
        const generator = generatorModule.default || generatorModule

        // Leer expected
        const expectedFilePath = resolve(expectedPath, exampleDir.replace('/', ''), `${name}.${type}`)
        const expected = await readFile(expectedFilePath, 'utf-8')

        // Generar
        const result = generator()

        // Comparar usando compact
        expect(compact(result)).toBe(compact(expected))
      }
    })
  })
})
