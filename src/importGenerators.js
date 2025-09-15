// src/importGenerators.js
import { basename as pathBasename } from 'https://deno.land/std@0.203.0/path/mod.ts'

export default async function importGenerators(paths) {
  const results = await Promise.all(
    paths.map(async (filePath) => {
      try {
        const spec = filePath.startsWith('file://')
          ? filePath
          : `file://${filePath}`
        const module = await import(spec)

        const b = pathBasename(filePath) // "name.type.js"
        const parts = b.split('.')
        const name = parts[0] || ''
        const type = parts[1] || ''

        const raw = module?.default
        if (raw === undefined) {
          return {
            path: filePath,
            basename: b,
            name,
            type,
            fn: null,
            error: { message: 'Generador inválido: no exporta default' },
          }
        }

        const fn = typeof raw === 'function' ? raw : () => raw

        return { path: filePath, basename: b, name, type, fn, error: null }
      } catch (err) {
        return {
          path: filePath,
          basename: pathBasename(filePath),
          name: pathBasename(filePath).split('.')[0] || '',
          type: pathBasename(filePath).split('.')[1] || '',
          fn: null,
          error: { message: String(err.message ?? err), stack: err.stack },
        }
      }
    }),
  )

  return results
}
