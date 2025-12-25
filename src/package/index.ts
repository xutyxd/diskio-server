
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

    public async files() {
        return this.client.GET('/diskio');
    }

    public async upload(files: (File | Blob)[]) {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        const response = await this.client.POST('/diskio', { body: formData as any });
        return response.data;
    }

    public async download(uuid: string, type: 'arrayBuffer' | 'stream' = 'arrayBuffer', range?: { from: number, to?: number }) {
        const Range = range ? `bytes=${range.from}-${range.to ?? ''}` : '';

        const response = await this.client.GET('/diskio/{uuid}', { params: { path: { uuid }, header: { Range } }, parseAs: type });
        const size = response.response.headers.get('Content-Length');
        const name = response.response.headers.get('Content-Disposition')?.split('filename=')[1];
        return { size, stream: response.data, name };
    }

    public delete(uuid: string) {
        return this.client.DELETE('/diskio/{uuid}', { params: { path: { uuid } } });
    }
}
