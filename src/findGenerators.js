export default (dir) =>
  Array.from(Deno.readDirSync(dir))
    .filter((entry) =>
      entry.isFile &&
      /\.[^.]+\.js$/.test(entry.name)
    )
    .map((entry) => `${dir}/${entry.name}`)
