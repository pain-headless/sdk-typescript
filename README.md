# Pain Headless SDK

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Pain Headless** is the ultimate stealth browser automation and web scraping SDK. Designed for resilience, it bypasses advanced bot detection systems (like Cloudflare Turnstile, reCAPTCHA, and Datadome) by running fully managed, undetectable browser instances in the cloud via WebSockets.

You control the browser using our strongly-typed, synchronous-like API, and pay only for the credits you consume per action.

---

## ⚡ Features

- 🛡️ **Anti-Bot Bypassing:** Native, seamless solving of captchas and anti-bot challenges.
- 🌍 **Premium Proxies:** Built-in support for sticky and rotating ISP residential proxies.
- 💸 **Pay-per-Action:** Transparent, credit-based billing model. You are charged based on the complexity of the command.
- 🏗️ **Robust Data Extraction:** Paginated list scrapers, complex form fillers, and structured data extractors right out of the box.
- 🔌 **Auto-Managed Sessions:** Graceful websocket connection handling and automatic cleanup.

---

## 📦 Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install pain-headless
# or
yarn add pain-headless
# or
pnpm add pain-headless
```

---

## 🚀 Quick Start

Here is a complete example of how to start a session, navigate to a page, fill a form, solve a captcha, and close the session.

```typescript
import { StealthBrowser } from "pain-headless";

async function runAutomation() {
  // 1. Initialize the browser with your API Key
  const browser = new StealthBrowser({
    apiKey: "YOUR_API_KEY_HERE",
    autoStartSession: true, // Automatically connects and starts the browser on the first command
    language: "en-US",
    device: "desktop",
    proxy: {
      type: "premium",
      country: "US",
      strategy: "rotate",
    },
  });

  try {
    // 2. Navigate to your target URL
    console.log("Navigating...");
    await browser.goTo("https://example.com/login");

    // 3. Fill the login form automatically
    console.log("Filling form...");
    await browser.fillForm("form#login-form", {
      'input[name="username"]': "my_username",
      'input[name="password"]': "my_secret_password",
    });

    // 4. Solve potential Captchas
    console.log("Solving Captcha...");
    await browser.solveSimpleCaptcha({ throwOnNoCaptcha: false });

    // 5. Submit and Wait
    console.log("Submitting...");
    await browser.click('button[type="submit"]');
    await browser.sleep(2000);

    // 6. Extract structured data
    const data = await browser.extractData({
      fields: {
        title: { element: "h1.dashboard-title" },
        balance: {
          element: ".account-balance",
          format: (val) => parseFloat(val.replace("$", "")),
        },
      },
    });

    console.log("Extracted Data:", data);
  } catch (error) {
    console.error("Automation Failed:", error.message);
  } finally {
    // 7. Always close the session to prevent extra billing and clean up resources
    await browser.close();
  }
}

runAutomation();
```

---

## 📚 Core API Reference

The `StealthBrowser` class exposes a variety of high-level commands. All commands return a `CommandResult` object containing the execution `success` status and the `credits` consumed.

### Lifecycle Management

- `start()`: Initializes the WebSocket connection and allocates a browser in the cloud. Cost: **10 credits**.
- `close()`: Terminates the browser session, disconnects the WebSocket, and stops billing. Cost: **0 credits**.

### Navigation & Interaction

- `goTo(url)`: Navigates the browser to the specified URL. Cost: **15 credits**.
- `click(selector, options)`: Clicks on target elements. Cost: **2 credits**.
- `type(selector, value, options)`: Types text into inputs. Cost: **2 credits**.
- `fillForm(parentForm, values, options)`: Highly optimized command to fill an entire form at once. Cost: **5 credits + 1 per field**.
- `select(selector, value)`: Selects dropdown options. Cost: **2 credits**.
- `hover(selector)`: Moves the mouse over an element. Cost: **1 credit**.

### Data Extraction

- `extractData(options)`: Extracts JSON structured data from multiple selectors at once. Cost: **30 credits**.
- `extractList(options)`: Extracts a paginated list of items, supporting automatic pagination clicking. Cost: **30 credits / page**.
- `extractText(selector)`: Grabs raw text from an element. Cost: **1 credit**.
- `extractAttribute(selector, attribute)`: Grabs attributes like `src` or `href`. Cost: **1 credit**.

### Utilities

- `solveSimpleCaptcha(options)`: Solves Turnstile, reCAPTCHA, and hCaptcha instances automatically. Cost: **80 credits**.
- `solveTextCaptcha(options)`: Solves standard image-to-text captchas. Cost: **80 credits**.
- `screenshot()`: Returns a presigned URL with a full-page screenshot. Cost: **4 credits**.
- `sleep(ms)`: Pauses execution securely. Cost: **0 credits**.

---

## ⚠️ Error Handling

The SDK exposes several custom, strongly-typed Exceptions (exported from `pain-headless/exceptions`) allowing you to handle edge cases gracefully:

- `AuthenticationError`: Invalid or expired API Key.
- `InsufficientCreditsError`: Your workspace ran out of credits.
- `ServiceNotAvailableError`: Could not establish a connection to the remote browser cluster.
- `LostBrowserConnectionError`: The websocket connection dropped unexpectedly.
- `NoCaptchaDetectedError`: Thrown if you try to solve a captcha where none exists (can be ignored via options).
- `BrowserNotStartedError`: Thrown if `autoStartSession` is false and a command is issued before `start()`.

```typescript
import { StealthBrowser, InsufficientCreditsError } from "pain-headless";

// ...
try {
  await browser.goTo("https://example.com");
} catch (err) {
  if (err instanceof InsufficientCreditsError) {
    console.error("Time to top up your account!");
  }
}
```

---

## 📄 Documentation

For full type definitions, parameter options, and advanced strategies (like custom pagination functions and proxy sticky sessions), please refer to your IDE's JSDoc tooltips or read the docs available at `docs/` directory.
