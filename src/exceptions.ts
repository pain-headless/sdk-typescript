export class PainHeadlessError extends Error {

    constructor(message: string, public code?: number, public partialData?: any, public errorCause?: string, public credits?: { used: number, total: number;  }) {
        super(message);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ConnectionError extends PainHeadlessError {
    constructor(message: string = 'Failed to connect to the WebSocket server.') {
        super(message, -2);
    }
}

export class DisconnectedError extends PainHeadlessError {
    constructor(message: string = 'The WebSocket connection was closed unexpectedly.') {
        super(message, -3);
    }
}

export class AuthenticationError extends PainHeadlessError {
    constructor(message: string = 'Authentication failed. Please check your API Key.') {
        super(message, 3);
    }
}

export class PayloadParsingError extends PainHeadlessError {
    constructor(message: string = 'Failed to parse the incoming WebSocket message.') {
        super(message, 1000);
    }
}

export class TimeoutError extends PainHeadlessError {
    constructor(message: string = 'The operation timed out.') {
        super(message, 1001);
    }
}

export class InsufficientCreditsError extends PainHeadlessError {
    constructor(message: string = 'Insufficient credits to perform this action.') {
        super(message, 5);
    }
}

export class InvalidParamsError extends PainHeadlessError {
    constructor(message: string = 'Invalid parameters provided for command.') {
        super(message, 4);
    }
}

export class CommandNotFoundError extends PainHeadlessError {
    constructor(message: string = 'The requested command does not exist.') {
        super(message, 2);
    }
}

export class CommandError extends PainHeadlessError {
    constructor(message: string = 'Error running the command.', errorCause?: string, partialData?: any, credits?: { used: number, total: number;  }) {
        super(message, 1000, partialData, errorCause, credits);
    }
}

export class NoCaptchaDetectedError extends PainHeadlessError {
    constructor(message: string = 'No captcha detected on page.') {
        super(message, 6);
    }
}

export class BrowserNotStartedError extends PainHeadlessError {
    constructor(message: string = 'Browser has not been started. Please call .start() before running any commands.') {
        super(message, -4);
    }
}

export class ServiceNotAvailableError extends PainHeadlessError {
    constructor(message: string = 'Could not establish connection with the pain.headless service.') {
        super(message, -5);
    }
}

export class LostBrowserConnectionError extends PainHeadlessError {
    constructor(message: string = 'The connection to the browser was lost unexpectedly.') {
        super(message, -6);
    }
}
