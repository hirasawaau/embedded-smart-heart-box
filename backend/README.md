# Smart Heart Box Backend

## Requirements

- Go 1.21
- Docker

## Installation

```bash
go mod download
```



## Endpoints

### /esp32

- POST /esp32 (body:{name: String}) [Register new esp32]
- GET /esp32 [Get all esp32]

### /menus

- POST /menus (body: {msg: String}) [Create new message]
- GET /menus [Get all messages default menu]

### /msg

- POST /msg (body: {msg: String , createdBy: String, sendTo: String}) [Send message]
