
import { injectable } from 'inversify';

@injectable()
export class ConfigurationService {

    private KEYS: { [K in 'oauth' | 'cookies' ]?: object };

    private Diskio = {
        path: process.env.DISKIO_PATH || './diskio',
        size: process.env.DISKIO_SIZE ? parseInt(process.env.DISKIO_SIZE) : 1024 * 1024 * 1024 * 10
    }
    public keys = {
        cookies: () => {
            const keys = (this.KEYS.cookies || []) as string[];

            if (!keys.length) {
                [
                    "This is a test key",
                    "This is another test key",
                    "This is yet another test key"
                ].forEach((key) => {
                    keys.push(key);
                });

                console.warn('No keys found, using default ones!');
            }

            return structuredClone(keys);
        },
        oauth: () => {
            return structuredClone(this.KEYS.oauth || { });
        }
    }

    public get diskio () {
        return structuredClone(this.Diskio);
    }


    constructor() {
        this.KEYS = {
            oauth: this.load('OAUTH2_KEYS'),
            cookies: this.load('COOKIES_KEYS')
        };
    }

    private load(keys: string): object | undefined {
        let result: object | undefined;

        try {

            const env = process.env[keys];

            if (env) {
                result = JSON.parse(env);
            }
        } catch {
            result = undefined;
        }

        return result;
    }
}