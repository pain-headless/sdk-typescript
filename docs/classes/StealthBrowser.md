[**pain-headless**](../README.md)

***

[pain-headless](../globals.md) / StealthBrowser

# Class: StealthBrowser

Defined in: src/stealth-browser.ts:15

## Constructors

### Constructor

> **new StealthBrowser**(`options`): `StealthBrowser`

Defined in: src/stealth-browser.ts:20

#### Parameters

##### options

[`BrowserLaunchOptions`](../interfaces/BrowserLaunchOptions.md)

#### Returns

`StealthBrowser`

## Methods

### click()

> **click**(`selector`, `options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:155

Clicks on one or more elements specified by the selector(s).

**Credit cost:** 2 credits (per element)

#### Parameters

##### selector

`string` \| `string`[]

The CSS or XPath selector(s) of the element(s) to click.

##### options?

[`ClickOptions`](../interfaces/ClickOptions.md)

Optional settings for the click action.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### close()

> **close**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:126

Closes the browser session and ends the automation.

**Credit cost:** 0 credits

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### exists()

> **exists**(`selector`): `Promise`\<[`ExistsResult`](../interfaces/ExistsResult.md)\>

Defined in: src/stealth-browser.ts:280

Checks if an element exists on the page.

**Credit cost:** 1 credit

#### Parameters

##### selector

`string`

The CSS or XPath selector of the element to check.

#### Returns

`Promise`\<[`ExistsResult`](../interfaces/ExistsResult.md)\>

A result object indicating whether the element exists.

***

### extractAttribute()

> **extractAttribute**(`selector`, `attribute`): `Promise`\<[`ExtractAttributesResult`](../type-aliases/ExtractAttributesResult.md)\>

Defined in: src/stealth-browser.ts:332

Extracts a specific attribute (e.g., `href`, `src`) from one or more elements.

**Credit cost:** 1 credit (per element)

#### Parameters

##### selector

`string`

The CSS or XPath selector of the element(s).

##### attribute

`string`

The name of the attribute to extract.

#### Returns

`Promise`\<[`ExtractAttributesResult`](../type-aliases/ExtractAttributesResult.md)\>

An object containing the extracted attribute(s).

***

### extractData()

> **extractData**(`options`): `Promise`\<[`ExtractDataResult`](../type-aliases/ExtractDataResult.md)\>

Defined in: src/stealth-browser.ts:297

Extracts structured data from one or more elements on the current page.

**Credit cost:** 30 credits

#### Parameters

##### options

[`ExtractDataOptions`](../interfaces/ExtractDataOptions.md)

The configuration object defining the fields to extract.

#### Returns

`Promise`\<[`ExtractDataResult`](../type-aliases/ExtractDataResult.md)\>

An object containing the extracted data.

***

### extractList()

> **extractList**(`options`): `Promise`\<[`ExtractListResult`](../interfaces/ExtractListResult.md)\>

Defined in: src/stealth-browser.ts:354

Extracts a paginated list of items. Can navigate through multiple pages to extract data.

**Credit cost:** 30 credits (per Page).

#### Parameters

##### options

[`ExtractListOptions`](../interfaces/ExtractListOptions.md)

The configuration object defining the list items, fields, and pagination settings.

#### Returns

`Promise`\<[`ExtractListResult`](../interfaces/ExtractListResult.md)\>

An object containing the extracted list data and metadata.

***

### extractText()

> **extractText**(`selector`): `Promise`\<[`ExtractTextResult`](../interfaces/ExtractTextResult.md)\>

Defined in: src/stealth-browser.ts:314

Extracts the text content from one or more elements.

**Credit cost:** 1 credit (per element)

#### Parameters

##### selector

`string`

The CSS or XPath selector of the element(s).

#### Returns

`Promise`\<[`ExtractTextResult`](../interfaces/ExtractTextResult.md)\>

An object containing the extracted text.

***

### fillForm()

> **fillForm**(`parentForm`, `values`, `options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:178

Fills an entire form based on a values object.

**Credit cost:** 5 credits + 1 credit per selector in values.

#### Parameters

##### parentForm

`string`

The CSS or XPath selector of the parent form element.

##### values

[`FillFormValues`](../type-aliases/FillFormValues.md)

An object containing the values to fill, where keys are selectors and values are the input values.

##### options?

[`FillFormOptions`](../interfaces/FillFormOptions.md)

Optional settings for filling the form.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### goTo()

> **goTo**(`url`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:142

Navigates to the specified URL.

**Credit cost:** 15 credits

#### Parameters

##### url

`string`

The URL to navigate to.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### hover()

> **hover**(`selector`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:268

Hovers the mouse over an element.

**Credit cost:** 1 credit

#### Parameters

##### selector

`string`

The CSS or XPath selector of the element to hover over.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### screenshot()

> **screenshot**(): `Promise`\<[`ScreenshotResult`](../interfaces/ScreenshotResult.md)\>

Defined in: src/stealth-browser.ts:438

Captures a screenshot of the current page.

**Credit cost:** 4 credits

#### Returns

`Promise`\<[`ScreenshotResult`](../interfaces/ScreenshotResult.md)\>

An object containing the screenshot presigned URL.

***

### select()

> **select**(`selector`, `value`, `options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:201

Selects an option in a `<select>` element.

**Credit cost:** 2 credits (per filled element)

#### Parameters

##### selector

`string`

The CSS or XPath selector of the select element.

##### value

`string` \| `number`

The value to select.

##### options?

[`SelectOptions`](../interfaces/SelectOptions.md)

Optional settings for the select action.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### setChecked()

> **setChecked**(`selector`, `value`, `options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:247

Checks or unchecks a checkbox or radio button.

**Credit cost:** 2 credits (per checked/unchecked element)

#### Parameters

##### selector

`string`

The CSS or XPath selector of the checkbox or radio button.

##### value

`boolean`

True to check, false to uncheck.

##### options?

[`SetCheckedOptions`](../interfaces/SetCheckedOptions.md)

Optional settings for the action.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### sleep()

> **sleep**(`ms`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:455

Pauses the automation for a specified number of milliseconds.

**Credit cost:** 0 credits

#### Parameters

##### ms

`number`

The number of milliseconds to pause the automation.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### solveSimpleCaptcha()

> **solveSimpleCaptcha**(`options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:466

Solves a simple captcha (like reCAPTCHA v2/Cloudflare Turnstile) on the current page.

**Credit cost:** 80 credits

#### Parameters

##### options?

[`SolveSimpleCaptchaOptions`](../interfaces/SolveSimpleCaptchaOptions.md)

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### solveTextCaptcha()

> **solveTextCaptcha**(`options`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:500

Solves a text captcha on the current page.

**Credit cost:** 80 credits

#### Parameters

##### options

[`SolveTextCaptchaOptions`](../interfaces/SolveTextCaptchaOptions.md)

The configuration object defining the image and input selectors.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### start()

> **start**(): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:105

Starts the browser session and connects to the WebSocket.

**Credit cost:** 10 credits

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.

***

### type()

> **type**(`selector`, `value`, `options?`): `Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

Defined in: src/stealth-browser.ts:224

Types text into an input or textarea field.

**Credit cost:** 2 credits (per filled element)

#### Parameters

##### selector

`string`

The CSS or XPath selector of the input field.

##### value

`string`

The text to type.

##### options?

[`TypeOptions`](../interfaces/TypeOptions.md)

Optional settings for the typing action.

#### Returns

`Promise`\<[`CommandResult`](../interfaces/CommandResult.md)\>

The result of the command execution.
