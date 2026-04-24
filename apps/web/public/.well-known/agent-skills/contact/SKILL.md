# contact

Send a contact message to Aleksei Bykovskii via the portfolio contact form.

## Endpoint

POST `/_actions/contact` with `multipart/form-data`

## Parameters

| Field   | Type   | Required | Description          |
|---------|--------|----------|----------------------|
| name    | string | yes      | Sender's name        |
| email   | string | yes      | Sender's email       |
| message | string | yes      | Message body         |

## Response

Returns HTTP 200 on success.
