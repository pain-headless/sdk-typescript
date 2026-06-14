[**pain-headless**](../README.md)

***

[pain-headless](../globals.md) / WSClient

# Class: WSClient

Defined in: src/ws-client.ts:5

## Constructors

### Constructor

> **new WSClient**(`env?`): `WSClient`

Defined in: src/ws-client.ts:12

#### Parameters

##### env?

`"local"` \| `"prod"`

#### Returns

`WSClient`

## Methods

### connect()

> **connect**(): `Promise`\<`void`\>

Defined in: src/ws-client.ts:19

#### Returns

`Promise`\<`void`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: src/ws-client.ts:73

#### Returns

`void`

***

### send()

> **send**(`data`): `Promise`\<`any`\>

Defined in: src/ws-client.ts:60

#### Parameters

##### data

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`any`\>
