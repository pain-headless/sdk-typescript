# Classes

## stealth-browser

### `StealthBrowser`
```ts
constructor(options: BrowserLaunchOptions): StealthBrowser
```
**Methods:**
- `start(): Promise<CommandResult>` — Starts the browser session and connects to the WebSocket.

**Credit cost:** 10 credits
- `close(): Promise<CommandResult>` — Closes the browser session and ends the automation.

**Credit cost:** 0 credits
- `goTo(url: string): Promise<CommandResult>` — Navigates to the specified URL.

**Credit cost:** 15 credits
- `click(selector: string | string[], options?: ClickOptions): Promise<CommandResult>` — Clicks on one or more elements specified by the selector(s).

**Credit cost:** 2 credits (per element)
- `fillForm(parentForm: string, values: FillFormValues, options?: FillFormOptions): Promise<CommandResult>` — Fills an entire form based on a values object.

**Credit cost:** 5 credits + 1 credit per selector in values.
- `select(selector: string, value: string | number, options?: SelectOptions): Promise<CommandResult>` — Selects an option in a `<select>` element.

**Credit cost:** 2 credits (per filled element)
- `type(selector: string, value: string, options?: TypeOptions): Promise<CommandResult>` — Types text into an input or textarea field.

**Credit cost:** 2 credits (per filled element)
- `setChecked(selector: string, value: boolean, options?: SetCheckedOptions): Promise<CommandResult>` — Checks or unchecks a checkbox or radio button.

**Credit cost:** 2 credits (per checked/unchecked element)
- `hover(selector: string): Promise<CommandResult>` — Hovers the mouse over an element.

**Credit cost:** 1 credit
- `exists(selector: string): Promise<ExistsResult>` — Checks if an element exists on the page.

**Credit cost:** 1 credit
- `extractData(options: ExtractDataOptions): Promise<ExtractDataResult>` — Extracts structured data from one or more elements on the current page.

**Credit cost:** 30 credits
- `extractText(selector: string): Promise<ExtractTextResult>` — Extracts the text content from one or more elements.

**Credit cost:** 1 credit (per element)
- `extractAttribute(selector: string, attribute: string): Promise<ExtractAttributesResult>` — Extracts a specific attribute (e.g., `href`, `src`) from one or more elements.

**Credit cost:** 1 credit (per element)
- `extractList(options: ExtractListOptions): Promise<ExtractListResult>` — Extracts a paginated list of items. Can navigate through multiple pages to extract data.

**Credit cost:** 30 credits (per Page).
- `screenshot(): Promise<ScreenshotResult>` — Captures a screenshot of the current page.

**Credit cost:** 4 credits
- `sleep(ms: number): Promise<CommandResult>` — Pauses the automation for a specified number of milliseconds.

**Credit cost:** 0 credits
- `solveSimpleCaptcha(options?: SolveSimpleCaptchaOptions): Promise<CommandResult>` — Solves a simple captcha (like reCAPTCHA v2/Cloudflare Turnstile) on the current page.

**Credit cost:** 80 credits
- `solveTextCaptcha(options: SolveTextCaptchaOptions): Promise<CommandResult>` — Solves a text captcha on the current page.

**Credit cost:** 80 credits
