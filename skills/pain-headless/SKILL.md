---
description: "The ultimate browser as a service SDK for webscraping Also: websocket, client, webscraping, browser, automation, data science, crawler, selenium, puppeteer, playwright, webdriver, chromedriver, geckodriver, beaultifoul-soup, bs4, sraping, scrap, proxy, capsolver, captcha."
license: ISC
name: pain-headless
---

# pain-headless

The ultimate browser as a service SDK for webscraping

## Features

- 🛡️ **Anti-Bot Bypassing:** Native, seamless solving of captchas and anti-bot challenges.
- 🌍 **Premium Proxies:** Built-in support for sticky and rotating ISP residential proxies.
- 💸 **Pay-per-Action:** Transparent, credit-based billing model. You are charged based on the complexity of the command.
- 🏗️ **Robust Data Extraction:** Paginated list scrapers, complex form fillers, and structured data extractors right out of the box.
- 🔌 **Auto-Managed Sessions:** Graceful websocket connection handling and automatic cleanup.

---

## Quick Start

```typescript
import { StealthBrowser } from 'pain-headless';

async function runAutomation() {
    // 1. Initialize the browser with your API Key
    const browser = new StealthBrowser({
        apiKey: 'YOUR_API_KEY_HERE',
        autoStartSession: true, // Automatically connects and starts the browser on the first command
        language: 'en-US',
        device: 'desktop',
        proxy: {
            type: 'premium',
            country: 'US',
            strategy: 'rotate'
        }
    });

    try {
        // 2. Navigate to your target URL
        console.log('Navigating...');
        await browser.goTo('https://example.com/login');

        // 3. Fill the login form automatically
        console.log('Filling form...');
        await browser.fillForm('form#login-form', {
            'input[name="username"]': 'my_username',
            'input[name="password"]': 'my_secret_password'
        });

        // 4. Solve potential Captchas
        console.log('Solving Captcha...');
        await browser.solveSimpleCaptcha({ throwOnNoCaptcha: false });

        // 5. Submit and Wait
        console.log('Submitting...');
        await browser.click('button[type="submit"]');
        await browser.sleep(2000);

        // 6. Extract structured data
        const data = await browser.extractData({
            fields: {
                title: { element: 'h1.dashboard-title' },
                balance: { element: '.account-balance', format: (val) => parseFloat(val.replace('$', '')) }
            }
        });

        console.log('Extracted Data:', data);

    } catch (error) {
        console.error('Automation Failed:', error.message);
    } finally {
        // 7. Always close the session to prevent extra billing and clean up resources
        await browser.close();
    }
}

runAutomation();
```

## Configuration

12 configuration interfaces — see references/config.md for details.

## Quick Reference

**exceptions:** `PainHeadlessError`, `ConnectionError`, `DisconnectedError`, `AuthenticationError`, `PayloadParsingError`, `TimeoutError`, `InsufficientCreditsError`, `InvalidParamsError`, `CommandNotFoundError`, `CommandError`, `NoCaptchaDetectedError`, `BrowserNotStartedError`, `ServiceNotAvailableError`, `LostBrowserConnectionError`
**ws-client:** `WSClient`
**stealth-browser:** `StealthBrowser`
**types:** `CreditUsage`, `CommandResult`, `ExtractAttributesResult`, `ExistsResult`, `ExtractedDataField`, `ExtractDataResult`, `ExtractListResult`, `ExtractTextResult`, `FillFormValues`, `ScreenshotResult`

## References

Load these on demand — do NOT read all at once:

- When using a class → browse `references/classes/` for grouped indexes, properties, methods, and inheritance
- When defining typed variables or function parameters → read `references/types.md`
- When configuring options → read `references/config.md` for all settings and defaults