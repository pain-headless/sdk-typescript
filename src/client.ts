import WebSocket from 'ws';

export interface PainHeadlessOptions {
    url: string;
    apiKey?: string;
}

export class PainClient {
    private ws: WebSocket | null = null;
    private options: PainHeadlessOptions;

    constructor(options: PainHeadlessOptions) {
        this.options = options;
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const url = new URL(this.options.url);
            
            // Adiciona o apiKey se existir, como na maioria dos websockets baseados em auth query
            if (this.options.apiKey) {
                url.searchParams.append('apiKey', this.options.apiKey);
            }

            this.ws = new WebSocket(url.toString());

            this.ws.on('open', () => {
                console.log('Conectado ao WebSocket do Pain Headless');
                resolve();
            });

            this.ws.on('error', (error) => {
                console.error('Erro no WebSocket:', error);
                reject(error);
            });

            this.ws.on('message', (data) => {
                this.handleMessage(data);
            });
            
            this.ws.on('close', () => {
                console.log('Desconectado do WebSocket');
            });
        });
    }

    public sendCommand(action: string, payload?: any) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket não está conectado.');
        }

        const message = JSON.stringify({ action, payload });
        this.ws.send(message);
    }
    
    private handleMessage(data: WebSocket.RawData) {
        try {
            const parsed = JSON.parse(data.toString());
            console.log('Mensagem recebida:', parsed);
            // Aqui podemos adicionar emissores de eventos (EventEmitters) no futuro
        } catch (e) {
            console.log('Mensagem (raw):', data.toString());
        }
    }

    public disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
