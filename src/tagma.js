import { resolve } from 'std/path'

import findGenerators from './findGenerators.js'
import loadConfig from './loadConfig.js'
import importGenerators from './importGenerators.js'

export default async (input) => {
  const config = loadConfig(input)

  const paths = findGenerators(input).map((p) => resolve(p))
  const imported = await importGenerators(paths)

  const generators = imported
    .filter((i) => i.fn)
    .map(({ path, basename, name, type, fn }) => ({
      path,
      basename,
      name,
      type,
      fn,
    }))

  const errors = imported
    .filter((i) => i.error)
    .map((i) => ({ path: i.path, ...i.error }))

  return { config, generators, errors }
}
