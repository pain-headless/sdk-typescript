# Types & Enums

## types

### `CreditUsage`
**Properties:**
- `used: number`
- `total: number`
- `remaining: number`

### `CommandResult`
**Properties:**
- `message: string`
- `success: boolean`
- `credits: CreditUsage`
- `rawData: Record<string, any>`

### `ExtractAttributesResult`
```ts
CommandResult & (Record<string, AttributeValue> | Record<string, AttributeValue>[])
```

### `ExistsResult`
**Properties:**
- `exists: boolean`
- `message: string`
- `success: boolean`
- `credits: CreditUsage`
- `rawData: Record<string, any>`

### `ExtractedDataField`
```ts
IExtractedDataField | IExtractedDataField[]
```

### `ExtractDataResult`
```ts
CommandResult & { data: Record<string, ExtractedDataField> }
```

### `ExtractListResult`
**Properties:**
- `data: Record<string, ExtractedDataField>[]`
- `meta: { lookedPages: number; extractedItems: number }`
- `message: string`
- `success: boolean`
- `credits: CreditUsage`
- `rawData: Record<string, any>`

### `ExtractTextResult`
**Properties:**
- `text: string | string[]`
- `message: string`
- `success: boolean`
- `credits: CreditUsage`
- `rawData: Record<string, any>`

### `FillFormValues`
```ts
Record<string, string | number | boolean>
```

### `ScreenshotResult`
**Properties:**
- `url: string`
- `message: string`
- `success: boolean`
- `credits: CreditUsage`
- `rawData: Record<string, any>`
