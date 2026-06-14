# Configuration

## BrowserLaunchOptions

### Properties

#### apiKey

**Type:** `string`

**Required:** yes

#### autoStartSession

**Type:** `boolean`

#### language

**Type:** `"pt-BR" | "en-US" | "es-ES"`

#### timezone

**Type:** `string`

#### device

**Type:** `"desktop" | "mobile"`

#### system

**Type:** `"windows" | "mac" | "linux" | "android" | "ios"`

#### proxy

**Type:** `{ type: "premium" | "simple"; country: string; strategy: "sticky" | "rotate" }`

#### waitElements

**Type:** `{ timeout?: number; until?: "visible" | "presence" }`

## ClickOptions

### Properties

#### clickAll

**Type:** `boolean`

#### delay

**Type:** `number`

## ExtractFieldOptions

### Properties

#### element

**Type:** `string`

**Required:** yes

#### attribute

**Type:** `string | string[]`

#### format

**Type:** `(value: any) => any`

#### isList

**Type:** `boolean`

## ExtractDataOptions

### Properties

#### fields

**Type:** `Record<string, ExtractFieldOptions | string>`

**Required:** yes

## ExtractListOptions

### Properties

#### elements

**Type:** `string`

**Required:** yes

#### pagination

**Type:** `{ maxPages: number; buttonSelectors: string | string[] | ((page: number, nextPage: number, prevPage: number) => string); offset?: number; delayBetweenPages?: number }`

#### clickBeforeExtract

**Type:** `string`

#### throwError

**Type:** `{ onPageNotFound?: boolean; onClickBeforeExtractNotFound?: boolean }`

#### fields

**Type:** `Record<string, ExtractFieldOptions | string>`

**Required:** yes

## FillFormOptions

### Properties

#### autoSubmit

**Type:** `boolean`

## InputFillOptions

### Properties

#### fillAll

**Type:** `boolean`

## SelectOptions

### Properties

#### fillAll

**Type:** `boolean`

## TypeOptions

### Properties

#### fillAll

**Type:** `boolean`

## SetCheckedOptions

### Properties

#### fillAll

**Type:** `boolean`

## SolveSimpleCaptchaOptions

### Properties

#### throwOnNoCaptcha

**Type:** `boolean`

**Required:** yes

## SolveTextCaptchaOptions

### Properties

#### image

**Type:** `string`

**Required:** yes

#### input

**Type:** `string`

**Required:** yes