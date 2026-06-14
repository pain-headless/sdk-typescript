[**pain-headless**](../README.md)

***

[pain-headless](../globals.md) / ExtractListOptions

# Interface: ExtractListOptions

Defined in: src/types.ts:67

## Extends

- [`ExtractDataOptions`](ExtractDataOptions.md)

## Properties

### clickBeforeExtract?

> `optional` **clickBeforeExtract?**: `string`

Defined in: src/types.ts:75

***

### elements

> **elements**: `string`

Defined in: src/types.ts:68

***

### fields

> **fields**: `Record`\<`string`, [`ExtractFieldOptions`](ExtractFieldOptions.md) \| `string`\>

Defined in: src/types.ts:60

#### Inherited from

[`ExtractDataOptions`](ExtractDataOptions.md).[`fields`](ExtractDataOptions.md#fields)

***

### pagination?

> `optional` **pagination?**: `object`

Defined in: src/types.ts:69

#### buttonSelectors

> **buttonSelectors**: `string` \| `string`[] \| ((`page`, `nextPage`, `prevPage`) => `string`)

#### delayBetweenPages?

> `optional` **delayBetweenPages?**: `number`

#### maxPages

> **maxPages**: `number`

#### offset?

> `optional` **offset?**: `number`

***

### throwError?

> `optional` **throwError?**: `object`

Defined in: src/types.ts:76

#### onClickBeforeExtractNotFound?

> `optional` **onClickBeforeExtractNotFound?**: `boolean`

#### onPageNotFound?

> `optional` **onPageNotFound?**: `boolean`
