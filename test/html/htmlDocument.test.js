import { describe, it, expect } from 'vitest'
import { htmlDocument, compact } from '../../src/html'

describe('htmlDocument function', () => {
  it('should return a complete HTML document', () => {
    const head = "<head><title>My Web Page</title></head>"
    const body = "<body><h1>Welcome to my page</h1><p>This is a test paragraph.</p></body>"

    const result = htmlDocument()(head, body)

    const expected = `<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>
    <h1>Welcome to my page</h1><p>This is a test paragraph.</p>
</body>
</html>`

    expect(result).toBe(compact(expected))
  })
})
