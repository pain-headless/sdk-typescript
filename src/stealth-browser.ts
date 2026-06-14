import { 
    PainHeadlessError,
    AuthenticationError,
    CommandNotFoundError,
    InsufficientCreditsError,
    InvalidParamsError,
    CommandError
} from "./exceptions";
import { BrowserLaunchOptions, ClickOptions, CommandResult, ExistsResult, ExtractAttributesResult, ExtractDataOptions, ExtractDataResult, ExtractFieldOptions, ExtractListOptions, ExtractListResult, ExtractTextResult, FillFormOptions, FillFormValues, SelectOptions, SetCheckedOptions, TypeOptions } from "./types";
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
            useProxy: false,
            rotateIp: false,
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
            default:
                return new CommandError(message, errorCause, partialData, credits);
        }
    }

    async start(): Promise<CommandResult> {
        const { apiKey, ...options } = this.options;

        return await this.send('start', options);
    }

    async close(): Promise<CommandResult> {
        return await this.send('close');
    }

    async goTo(url: string): Promise<CommandResult> {
        return await this.send('goto', { url });
    }

    async click(selector: string, options?: ClickOptions): Promise<CommandResult> {
        const defaultOptions: ClickOptions = {
            clickAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('click', { selector, ...mergedOptions });
    }

    async fillForm(parentForm: string, values: FillFormValues, options?: FillFormOptions): Promise<CommandResult> {
        const defaultOptions: FillFormOptions = {
            autoSubmit: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('fillForm', { parentForm, values, ...mergedOptions });
    }

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

    async setChecked(selector: string, value: boolean, options?: SetCheckedOptions): Promise<CommandResult> {
        const defaultOptions: SetCheckedOptions = {
            fillAll: true,
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return await this.send('setChecked', { selector, value, ...mergedOptions });
    }

    async hover(selector: string) {
        return await this.send('hover', { selector });
    }

    async exists(selector: string): Promise<ExistsResult> {
        const result = await this.send('exists', { selector });

        return {
            exists: result.rawData?.data?.exists || false,
            ...result,
        };
    }

    async extractData(options: ExtractDataOptions): Promise<ExtractDataResult> {
        const result = await this.send('extract-data', options);

        return {
            data: result.rawData?.data?.data || {},
            ...result,
        };
    }

    async extractText(selector: string): Promise<ExtractTextResult> {
        const result = await this.send('extract-text', { selector });

        return {
            text: result.rawData?.data?.data || '',
            ...result,
        };
    }

    async extractAttribute(selector: string, attribute: string): Promise<ExtractAttributesResult> {
        const result = await this.send('extract-attribute', { selector, attribute });

        if (Array.isArray(result.rawData?.data?.data)) {
            const value = result.rawData?.data?.data;

            Object.assign(value, result);

            return value as ExtractAttributesResult
        }

        return { ...result, ...result.rawData?.data?.data };
    }

    async extractList(options: ExtractListOptions): Promise<ExtractListResult> {
        let fields: Record<string, ExtractFieldOptions | string> = structuredClone(options.fields);

        Object.entries(fields).forEach(([key, value]: [string, ExtractFieldOptions | string]) => {
            if (value !== 'string' && typeof value?.format !== 'undefined') {
                delete fields[key].format;
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
                if (typeof options.fields[field].format !== 'undefined') {
                    data.data[i][field] = options.fields[field].format(data.data[i][field]);
                }
            } 
        }

        return data;
    }
}