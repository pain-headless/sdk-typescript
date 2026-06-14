# Classes

## ws-client

### `WSClient`
```ts
constructor(env: "local" | "prod"): WSClient
```
**Methods:**
- `connect(): Promise<void>`
- `send(data: Record<string, any>): Promise<any>`
- `disconnect(): void`
