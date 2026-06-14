import { LOCAL_WS_URL, PROD_WS_URL } from "./config";
import { WebSocket } from 'ws';

export class WSClient {
    private url: string;
    private ws?: WebSocket;
    private pendingResolve: any = null;
    private pendingReject: any = null;

    constructor (env: 'local'|'prod' = 'prod') {
        this.url = {
            'local': LOCAL_WS_URL,
            'prod': PROD_WS_URL,
        }[env];
    }

    connect (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);
        
            this.ws.on('message', (rawData) => {
                try {
                    const response = JSON.parse(rawData.toString());
        
                    if (this.pendingResolve && this.pendingReject) {
                        this.pendingResolve(response);
                    }
                } catch (err) {
                    this.pendingReject(err);
                } finally {
                    delete this.pendingResolve;
                    delete this.pendingReject;
                }
            });

            this.ws.on('open', resolve);
            this.ws.on('error', reject);
        });
    }

    send(data: Record<string, any>): Promise<any> {
        if (!this.ws || !(this.ws instanceof WebSocket)) {
            throw new Error('WebSocket not connected');
        }
        
        return new Promise((resolve, reject) => {
            this.pendingResolve = resolve;
            this.pendingReject = reject;

            this.ws?.send(JSON.stringify(data));
        });
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = undefined;
        }
    }
}