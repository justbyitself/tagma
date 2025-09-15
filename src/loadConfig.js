export default (dir) => {
  try {
    const configPath = `${dir}/config.json`
    const configContent = Deno.readTextFileSync(configPath)
    return JSON.parse(configContent)
  } catch {
    console.log('Error loading config.json')
    return {}
  }
}
