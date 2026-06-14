export interface BrowserLaunchOptions {
    apiKey: string;
    language?: 'pt-BR' | 'en-US' | 'es-ES';
    timezone?: string;
    device?: 'desktop' | 'mobile';
    system?: 'windows' | 'mac' | 'linux' | 'android' | 'ios';
    useProxy?: boolean;
    rotateIp?: boolean;
    waitElements?: {
        timeout?: number;
        until?: 'visible' | 'presence';
    }
}

export interface CreditUsage {
    used: number;
    total: number;
    remaining: number;
}

export interface CommandResult {
    message: string;
    success: boolean;
    credits: CreditUsage;
    rawData: Record<string, any>;
}

export interface ClickOptions {
    clickAll?: boolean;
    delay?: number;
}

type AttributeValue = string | null | boolean | number;

export type ExtractAttributesResult = CommandResult & (
    | Record<string, AttributeValue>
    | Array<Record<string, AttributeValue>>
);

export interface ExistsResult extends CommandResult {
    exists: boolean;
}

type IExtractedDataField = string | null | Record<string, string | null>;

export type ExtractedDataField = IExtractedDataField | IExtractedDataField[];

export interface ExtractFieldOptions {
    element: string;
    attribute?: string | string[];
    isList?: boolean;
}

export interface ExtractDataOptions {
    fields: Record<string, ExtractFieldOptions | string>;
}

export type ExtractDataResult = CommandResult & {
    data: Record<string, ExtractedDataField>;
};

export interface ExtractListOptions extends ExtractDataOptions {
    elements: string;
    pagination?: {
        maxPages: number;
        buttonSelector: string|string[]|((page: number, nextPage: number, prevPage: number) => string);
        offset?: number;
        delayBetweenPages?: number;
    };
    clickBeforeExtract?: string;
    throwError?: {
        onPageNotFound?: boolean;
        onClickBeforeExtractNotFound?: boolean;
    };
}

export interface ExtractListResult extends CommandResult {
    data: Record<string, ExtractedDataField>[];
    meta: {
        lookedPages: number;
        extractedItems: number;
    }
}

export interface ExtractTextResult extends CommandResult {
    data: string | string[];
}

export type FillFormValues = Record<string, string | number | boolean>

export interface FillFormOptions {
    autoSubmit?: boolean;
}

export interface ScreenshotResult extends CommandResult {
    url: string;
}

export interface InputFillOptions {
    fillAll?: boolean;
}

export interface SelectOptions extends InputFillOptions {};
export interface TypeOptions extends InputFillOptions {};
export interface SetCheckedOptions extends InputFillOptions {};