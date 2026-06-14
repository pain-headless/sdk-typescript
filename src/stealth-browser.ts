import { 
    PainHeadlessError,
    AuthenticationError,
    CommandNotFoundError,
    InsufficientCreditsError,
    InvalidParamsError,
    CommandError,
    NoCaptchaDetectedError
} from "./exceptions";
import { BrowserLaunchOptions, ClickOptions, CommandResult, ExistsResult, ExtractAttributesResult, ExtractDataOptions, ExtractDataResult, ExtractFieldOptions, ExtractListOptions, ExtractListResult, ExtractTextResult, FillFormOptions, FillFormValues, ScreenshotResult, SelectOptions, SetCheckedOptions, SolveSimpleCaptchaOptions, SolveTextCaptchaOptions, TypeOptions } from "./types";
import { WSClient } from "./ws-client";

export class StealthBrowser {
    private options: BrowserLaunchOptions;
    private ws: WSClient;

    constructor (options: BrowserLaunchOptions) {
        const defaultOptions: BrowserLaunchOptions = {
            language: 'pt-BR',
            device: 'desktop',
            system: 'windows',
            timezone: 'America/Sao_Paulo',
            waitElements: {
                until: 'visible',
                timeout: 3000,
                ...options.waitElements
            },
            ...options,
        };

        this.options = defaultOptions;
        this.ws = new WSClient('local');
    }

    private async send(command: string, parameters?: any): Promise<CommandResult> {
        const message: Record<string, any> = {
            apiKey: this.options.apiKey,
            command,
        }

        if (parameters) {
            message.data = parameters;
        }

        const response = await this.ws.send(message);

        if (!response.success) {
            throw this.handleError(response);
        }

        const result: CommandResult = {
            success: true,
            message: response.message,
            rawData: response,
            credits: response.credits,
        }

        return result;
    }

    private handleError(response: Record<string, any>): PainHeadlessError {
        const message = response.message || 'Unknown error occurred.';
        const code = response.error?.code;
        const errorCause = response.error?.message;
        const partialData = response.error?.partialData;
        const credits = response.credits;

        switch (code) {
            case -1:
            case 4:
                return new InvalidParamsError(message);
            case 1:
            case 3:
                return new AuthenticationError(message);
            case 2:
                return new CommandNotFoundError(message);
            case 5:
                return new InsufficientCreditsError(message);
            case 6:
                return new NoCaptchaDetectedError(message);
            default:
                return new CommandError(message, errorCause, partialData, credits);
        }
    }

    /**
     * Starts the browser session and connects to the WebSocket.
     * 
     * **Credit cost:** 10 credits
     * 
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async start(): Promise<CommandResult> {
        await this.ws.connect();
        const { apiKey, ...options } = this.options;

        return await this.send('start', options);
    }

    /**
     * Closes the browser session and ends the automation.
     * 
     * **Credit cost:** 0 credits
     * 
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async close(): Promise<CommandResult> {
        const result = await this.send('close');
        this.ws.disconnect();
        return result;
    }

    /**
     * Navigates to the specified URL.
     * 
     * **Credit cost:** 15 credits
     * 
     * @param {string} url - The URL to navigate to.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async goTo(url: string): Promise<CommandResult> {
        return await this.send('go-to', { url });
    }

    /**
     * Clicks on one or more elements specified by the selector(s).
     * 
     * **Credit cost:** 2 credits (per element)
     * 
     * @param {string | string[]} selector - The CSS or XPath selector(s) of the element(s) to click.
     * @param {ClickOptions} [options] - Optional settings for the click action.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async click(selector: string | string[], options?: ClickOptions): Promise<CommandResult> {
        const defaultOptions: ClickOptions = {
            clickAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('click', { selector, ...mergedOptions });
    }

    /**
     * Fills an entire form based on a values object.
     * 
     * **Credit cost:** 5 credits + 1 credit per selector in values.
     * 
     * @param {string} parentForm - The CSS or XPath selector of the parent form element.
     * @param {FillFormValues} values - An object containing the values to fill, where keys are selectors and values are the input values.
     * @param {FillFormOptions} [options] - Optional settings for filling the form.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async fillForm(parentForm: string, values: FillFormValues, options?: FillFormOptions): Promise<CommandResult> {
        const defaultOptions: FillFormOptions = {
            autoSubmit: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('fill-form', { parentForm, values, ...mergedOptions });
    }

    /**
     * Selects an option in a `<select>` element.
     * 
     * **Credit cost:** 2 credits (per filled element)
     * 
     * @param {string} selector - The CSS or XPath selector of the select element.
     * @param {string | number} value - The value to select.
     * @param {SelectOptions} [options] - Optional settings for the select action.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async select(selector: string, value: string | number, options?: SelectOptions): Promise<CommandResult> {
        const defaultOptions: SelectOptions = {
            fillAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('select', { selector, value, ...mergedOptions });
    }

    /**
     * Types text into an input or textarea field.
     * 
     * **Credit cost:** 2 credits (per filled element)
     * 
     * @param {string} selector - The CSS or XPath selector of the input field.
     * @param {string} value - The text to type.
     * @param {TypeOptions} [options] - Optional settings for the typing action.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async type(selector: string, value: string, options?: TypeOptions): Promise<CommandResult> {
        const defaultOptions: TypeOptions = {
            fillAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('type', { selector, value, ...mergedOptions });
    }

    /**
     * Checks or unchecks a checkbox or radio button.
     * 
     * **Credit cost:** 2 credits (per checked/unchecked element)
     * 
     * @param {string} selector - The CSS or XPath selector of the checkbox or radio button.
     * @param {boolean} value - True to check, false to uncheck.
     * @param {SetCheckedOptions} [options] - Optional settings for the action.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async setChecked(selector: string, value: boolean, options?: SetCheckedOptions): Promise<CommandResult> {
        const defaultOptions: SetCheckedOptions = {
            fillAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('set-checked', { selector, value, ...mergedOptions });
    }

    /**
     * Hovers the mouse over an element.
     * 
     * **Credit cost:** 1 credit
     * 
     * @param {string} selector - The CSS or XPath selector of the element to hover over.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async hover(selector: string) {
        return await this.send('hover', { selector });
    }

    /**
     * Checks if an element exists on the page.
     * 
     * **Credit cost:** 1 credit
     * 
     * @param {string} selector - The CSS or XPath selector of the element to check.
     * @returns {Promise<ExistsResult>} A result object indicating whether the element exists.
     */
    async exists(selector: string): Promise<ExistsResult> {
        const result = await this.send('exists', { selector });

        return {
            exists: result.rawData?.data?.exists || false,
            ...result,
        };
    }

    /**
     * Extracts structured data from one or more elements on the current page.
     * 
     * **Credit cost:** 30 credits
     * 
     * @param {ExtractDataOptions} options - The configuration object defining the fields to extract.
     * @returns {Promise<ExtractDataResult>} An object containing the extracted data.
     */
    async extractData(options: ExtractDataOptions): Promise<ExtractDataResult> {
        const result = await this.send('extract-data', options);

        return {
            data: result.rawData?.data?.data || {},
            ...result,
        };
    }

    /**
     * Extracts the text content from one or more elements.
     * 
     * **Credit cost:** 1 credit (per element)
     * 
     * @param {string} selector - The CSS or XPath selector of the element(s).
     * @returns {Promise<ExtractTextResult>} An object containing the extracted text.
     */
    async extractText(selector: string): Promise<ExtractTextResult> {
        const result = await this.send('extract-text', { selector });

        return {
            text: result.rawData?.data?.data || '',
            ...result,
        };
    }

    /**
     * Extracts a specific attribute (e.g., `href`, `src`) from one or more elements.
     * 
     * **Credit cost:** 1 credit (per element)
     * 
     * @param {string} selector - The CSS or XPath selector of the element(s).
     * @param {string} attribute - The name of the attribute to extract.
     * @returns {Promise<ExtractAttributesResult>} An object containing the extracted attribute(s).
     */
    async extractAttribute(selector: string, attribute: string): Promise<ExtractAttributesResult> {
        const result = await this.send('extract-attribute', { selector, attribute });

        if (Array.isArray(result.rawData?.data?.data)) {
            const value = result.rawData?.data?.data;

            Object.assign(value, result);

            return value as ExtractAttributesResult
        }

        return { ...result, ...result.rawData?.data?.data };
    }

    /**
     * Extracts a paginated list of items. Can navigate through multiple pages to extract data.
     * 
     * **Credit cost:** 30 credits (per Page).
     * 
     * @param {ExtractListOptions} options - The configuration object defining the list items, fields, and pagination settings.
     * @returns {Promise<ExtractListResult>} An object containing the extracted list data and metadata.
     */
    async extractList(options: ExtractListOptions): Promise<ExtractListResult> {
        let fields: Record<string, ExtractFieldOptions | string> = structuredClone(JSON.parse(JSON.stringify(options.fields)));

        Object.entries(fields).forEach(([key, value]: [string, ExtractFieldOptions | string]) => {
            if (typeof value !== 'string' && typeof value?.format !== 'undefined') {
                delete (fields[key] as ExtractFieldOptions).format;
            }
        });
        
        const defaultOptions: ExtractListOptions = {
            elements: options.elements,
            fields,
            throwError: {
                onPageNotFound: false,
                onClickBeforeExtractNotFound: false,
            },
        }

        if (typeof options?.clickBeforeExtract !== 'undefined') {
            defaultOptions.clickBeforeExtract = options.clickBeforeExtract;
        }

        if (typeof options?.pagination !== 'undefined') {
            const offset = options.pagination?.offset || 0;
            const delayBetweenPages = options.pagination?.delayBetweenPages || 3000;
            const buttonSelectors: string[] = [];

            const requiredSelectors: number = offset === 0 ? options.pagination.maxPages : (options.pagination.maxPages + offset);

            if (typeof options.pagination.buttonSelectors === 'string') {
                for (let i = 1; i <= requiredSelectors; i++) {
                    buttonSelectors.push(options.pagination.buttonSelectors.replace('{page}', i.toString()));
                }
            } else if (Array.isArray(options.pagination.buttonSelectors)) {
                buttonSelectors.push(...options.pagination.buttonSelectors);
            } else {
                for (let i = 1; i <= requiredSelectors; i++) {
                    buttonSelectors.push(options.pagination.buttonSelectors(i, i + 1, i - 1));
                }
            }

            if (buttonSelectors.length !== requiredSelectors) {
                throw new Error('Invalid button selectors.');
            }

            defaultOptions.pagination = {
                offset,
                delayBetweenPages,
                buttonSelectors,
                maxPages: options.pagination.maxPages,
            };
        }

        if (typeof options?.throwError !== 'undefined') {
            defaultOptions.throwError = { ...defaultOptions.throwError, ...options.throwError };
        }

        const result = await this.send('extract-list', defaultOptions);

        const data: ExtractListResult = {
            data: result.rawData?.data?.data || [],
            meta: result.rawData?.data?.meta,
            ...result,
        };

        for (const i in data.data) {
            for (const field of Object.keys(data.data[i])) {
                const fieldOption = options.fields[field];
                if (typeof fieldOption !== 'string' && typeof fieldOption?.format !== 'undefined') {
                    data.data[i][field] = fieldOption.format(data.data[i][field]);
                }
            } 
        }

        return data;
    }

    /**
     * Captures a screenshot of the current page.
     * 
     * **Credit cost:** 4 credits
     * 
     * @returns {Promise<ScreenshotResult>} An object containing the screenshot presigned URL.
     */
    async screenshot(): Promise<ScreenshotResult> {
        const result = await this.send('screenshot');

        return {
            url: result.rawData?.data?.data || '',
            ...result,
        };
    }

    /**
     * Pauses the automation for a specified number of milliseconds.
     * 
     * **Credit cost:** 0 credits
     * 
     * @param {number} ms - The number of milliseconds to pause the automation.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async sleep(ms: number): Promise<CommandResult> {
        return await this.send('sleep', { ms });
    }

    /**
     * Solves a simple captcha (like reCAPTCHA v2/Cloudflare Turnstile) on the current page.
     * 
     * **Credit cost:** 80 credits
     * 
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async solveSimpleCaptcha(options?: SolveSimpleCaptchaOptions): Promise<CommandResult> {
        const defaultOptions: SolveSimpleCaptchaOptions = {
            throwOnNoCaptcha: false,
            ...options || {},
        }

        try {
            return await this.send('solve-simple-captcha');
        } catch (e) {
            if (!(e instanceof NoCaptchaDetectedError) || defaultOptions.throwOnNoCaptcha) {
                throw e;
            }

            return {
                success: false,
                message: e.message,
                rawData: {},
                credits: {
                    total: -1,
                    remaining: -1,
                    used: 0,
                }
            };
        }
    }

    /**
     * Solves a text captcha on the current page.
     * 
     * **Credit cost:** 80 credits
     * 
     * @param {SolveTextCaptchaOptions} options - The configuration object defining the image and input selectors.
     * @returns {Promise<CommandResult>} The result of the command execution.
     */
    async solveTextCaptcha(options: SolveTextCaptchaOptions): Promise<CommandResult> {
        return await this.send('solve-text-captcha', options);
    }
}