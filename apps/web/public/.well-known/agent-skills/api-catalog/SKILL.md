# api-catalog

Publishes an API catalog at `/.well-known/api-catalog` per RFC 9727.

## Endpoint

GET `/.well-known/api-catalog` → `application/linkset+json`

Includes links to the OpenAPI spec (`/openapi.json`), documentation (`/llms.txt`), and health endpoint (`/api/health`).
