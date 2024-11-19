
import createClient, { Middleware } from "openapi-fetch";
import type { paths, components } from "../openapi/specification";

export class DiskioAPIClient {

    private client: ReturnType<typeof createClient<paths>>
    private authentication?: string;

    constructor(baseUrl: string) {
        this.client = createClient<paths>({ baseUrl, headers: { Bearer: 'access_token' } });
        this.client.use(this.authenticate);
    }

    private authenticate: Middleware = {
        onRequest: ({ request }) => {
            if (this.authentication) {
                request.headers.set('Authorization', `Bearer ${this.authentication}`);
            }

            return request;
        }
    }

    public auth = {
        set: (access_token: string) => {
            this.authentication = access_token;
        },
        get: () => {
            return this.authentication;
        }
    }

    public healthCheck() {
        return this.client.GET('/health-check');
    }

    public upload(files: File[]) {
        return this.client.POST('/diskio', { body: { files: files as any } });
    }
    public async download(name: string, type: 'arrayBuffer' | 'stream' = 'arrayBuffer') {
        const response = await this.client.GET('/diskio/{name}', { params: { path: { name } }, parseAs: type });
        return response.data;
    }
    public delete(name: string) {
        return this.client.DELETE('/diskio/{name}', { params: { path: { name } } });
    }
}
