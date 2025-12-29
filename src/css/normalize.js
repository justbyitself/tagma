export default (css) =>
  css
    .replace(/\s*{\s*/g, '{')   // Eliminar espacios antes y después de {
    .replace(/\s*}\s*/g, '}')   // Eliminar espacios antes y después de }
    .replace(/\s*:\s*/g, ':')   // Eliminar espacios antes y después de :
    .replace(/\s*;\s*/g, ';')   // Eliminar espacios antes y después de ;
    .replace(/\n\s*/g, '')      // Eliminar saltos de línea y espacios después
    .replace(/^\s+|\s+$/g, '')  // Trim al inicio y final
    .replace(/\s+/g, ' ');      // Reemplazar múltiples espacios por uno solo
