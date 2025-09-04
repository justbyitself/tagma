export default html => html
  .replace(/>\s+</g, '><') // Remove spaces between tags
  .replace(/^\s+|\s+$/g, '') // Trim spaces at the start and end of the string
  .replace(/>\s+/g, '>') // Remove spaces after opening tags
  .replace(/\s+</g, '<') // Remove spaces before closing tags
  .replace(/>\s+/g, '>') // Remove spaces after opening tags
  .replace(/\s+</g, '<') // Remove spaces before closing tags
  .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
