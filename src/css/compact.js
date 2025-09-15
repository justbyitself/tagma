export default (css) =>
  css
    .replace(/\s+{/g, '{') // Remove spaces before {
    .replace(/:\s+/g, ':') // Remove spaces after :
    .replace(/;\s+/g, ';') // Remove spaces after ;
    .replace(/\s+}/g, '}') // Remove spaces before }
    .replace(/\n\s+/g, '\n') // Remove indentation
    .replace(/^\s+|\s+$/g, '') // Trim start and end
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
