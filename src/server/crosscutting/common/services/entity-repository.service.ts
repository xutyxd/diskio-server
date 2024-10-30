import { IDatabase, IIndexDbQueryWhere, IDbQueryWhere } from "../../database/interfaces";
import { NotFoundError } from "../errors";
import { IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntityRepository } from "../interfaces/services";
import { IEntityModelStatic } from "../interfaces/static";

export class EntityRepositoryService<D extends IEntityData, M extends IEntityModelData, SM extends IEntityModelStatic<D, M> = IEntityModelStatic<D, M>> implements IEntityRepository<M> {

    constructor(private readonly database: IDatabase<M>,
                private readonly table: string,
                private readonly model: SM) { }

    public async insert(data: M): Promise<M> {
        const inserted = await this.database.insert(this.table, data);

        return this.model.fromRepository(inserted).toRepository();
    }

    public async get(index: IIndexDbQueryWhere<M>): Promise<M> {
        const record = await this.database.get(this.table, index);

        if (!record) {
            throw new NotFoundError('Record not found');
        }

        return this.model.fromRepository(record).toRepository();
    }

    public async list(where: IDbQueryWhere<M>[] = []): Promise<M[]> {
        const listed = await this.database.list(this.table, where);

        return listed.map((record) => this.model.fromRepository(record).toRepository());
    }

    public async update(index: IIndexDbQueryWhere<M>, patch: M): Promise<M> {
        // Get the original record
        const original = await this.get(index);
        // Create a new record instance
        const record = this.model.fromRepository(original);
        // Update the record
        const toUpdate = new this.model({
            ...record,
            ...patch
        }).toRepository()
        // Update the record in the database
        const updated = await this.database.update(this.table, index, toUpdate);

        return this.model.fromRepository(updated).toRepository();
    }

    public async delete(index: IIndexDbQueryWhere<M>): Promise<M> {
        const deleted = await this.database.delete(this.table, index);

        return this.model.fromRepository(deleted).toRepository();
    }
}