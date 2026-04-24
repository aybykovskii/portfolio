# markdown-negotiation

Returns a Markdown representation of the portfolio when the request includes `Accept: text/markdown`.

## Usage

Send any page request with the header `Accept: text/markdown`. The response will be `Content-Type: text/markdown` containing the full portfolio description from `/llms.txt`.

## Headers

- Request: `Accept: text/markdown`
- Response: `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`
