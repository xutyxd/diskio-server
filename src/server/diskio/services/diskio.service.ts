import { inject, injectable } from "inversify";
import { DiskIO, DiskIOFile } from "diskio-core";
import { ConfigurationService } from "../../configuration/services/configuration.service";
import { HTTPRequest, IHTTPContextData } from "server-over-express";

@injectable()
export class DiskioService {

    private diskio: DiskIO;

    constructor(@inject(ConfigurationService) configurationService: ConfigurationService) {
        const { path, size } = configurationService.diskio;
        this.diskio = new DiskIO(path, size);
    }

    public async information() {
        const disk = await this.diskio.information.disk();
        const diskio = await this.diskio.information.diskio();

        return {
            disk,
            diskio
        };
    }

    public async upload(request: HTTPRequest, context: IHTTPContextData) {
        const { files } = context;

        const finish = new Promise<void>((resolve, reject) => {
            request.on('error', reject);
            request.on('end', resolve);
        });

        const diskioFiles: DiskIOFile[] = [];

        files.on('file', async (name, file, information) => {
            const { filename } = information;
            const diskioFile = this.diskio.createSync(filename);
            const writtings: Promise<void>[] = [];
            let index = 0;

            diskioFiles.push(diskioFile);
            await diskioFile.ready;

            file.on('data', (chunk) => {
                // Write the chunk to the file
                const writting = diskioFile.write(chunk, index);
                // Increment the index
                index += chunk.length;
                // Push the writting promise to the array
                writtings.push(writting);
            }).on('close', async () => {
                // Wait for all the writtings to finish
                await Promise.all(writtings);
                // Close the file
                await diskioFile.close();
            });
        });
        // Wait to process the request
        await finish;
        // Map the files to their names
        return diskioFiles.map((file) => file.name);
    }
}
