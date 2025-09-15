import { describe, it } from 'std/testing/bdd'
import { expect } from 'std/expect'

import { htmlDocument, compact } from '../../src/html/index.js'

describe('htmlDocument', () => {
  it('returns a complete HTML document', () => {
    const head = "<head><title>My Web Page</title></head>"
    const body = "<body><h1>Welcome to my page</h1><p>This is a test paragraph.</p></body>"

    const result = htmlDocument()([head, body])

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
