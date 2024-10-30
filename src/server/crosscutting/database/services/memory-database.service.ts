import { injectable } from "inversify";
import { InternalError, NotFoundError } from "../../common/errors";
import { IEntityModelData } from "../../common/interfaces/data";
import { IDatabase, IDbQueryWhere, IIndexDbQueryWhere } from "../interfaces";

@injectable()
export class MemoryDatabaseService<MD extends IEntityModelData> implements IDatabase<MD> {

    private connected: boolean = false;
    private data: { [from: string]: MD[] | undefined } = {};

    constructor() { }

    public connection = {
        get connected(): boolean {
            return this.connected;
        },

        open: async () => {
            this.connected = true
        },
        close: async () => {
            this.connected = false
        }
    }

    public async insert(from: string, data: MD): Promise<MD> {

        if (!this.connected) {
            throw new InternalError('Database not connected');
        }

        this.data[from] ??= [];
        this.data[from].push({
            ...data,
            id: this.data[from].length + 1
        });

        return data;
    }

    public async get(from: string, toIndex: IIndexDbQueryWhere<MD>): Promise<MD | undefined> {

        if (!this.connected) {
            throw new InternalError('Database not connected');
        }

        const { A: property, B: value } = toIndex;

        return structuredClone(this.data[from]?.find((item) => item[property] === value));
    }

    public async list(from: string, wheres: IDbQueryWhere<MD>[]): Promise<MD[]> {

        if (!this.connected) {
            throw new InternalError('Database not connected');
        }

        return this.data[from]?.filter((item) => wheres.every((where) => item)) || [];
    }

    public async update(from: string, toIndex: IIndexDbQueryWhere<MD>, data: MD): Promise<MD> {

        if (!this.connected) {
            throw new InternalError('Database not connected');
        }

        const element = await this.get(from, toIndex);
        const { A: property, B: value } = toIndex;
        // Find index of the element
        const index = this.data[from]?.findIndex((item) => item[property] === value);

        if (!this.data[from] || !element || index === undefined) {
            throw new NotFoundError('Record not found');
        }

        // Update the element avoiding mutating the original id
        this.data[from][index] = {
            ...element,
            ...data,
            [property]: element[property]
        };

        return data;
    }

    public async delete(from: string, toIndex: IIndexDbQueryWhere<MD>): Promise<MD> {

        if (!this.connected) {
            throw new InternalError('Database not connected');
        }

        const element = await this.get(from, toIndex);
        const { A: property, B: value } = toIndex;
        // Find index of the element
        const index = this.data[from]?.findIndex((item) => item[property] === value);

        if (!this.data[from] || !element || index === undefined) {
            throw new NotFoundError('Record not found');
        }
        // Delete the element
        this.data[from].splice(index, 1);

        return element;
    }
}