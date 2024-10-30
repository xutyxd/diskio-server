import { IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntityModel } from "../interfaces/dto";

export class EntityModel implements IEntityModel<IEntityData, IEntityModelData> {

    public id: number;
    public uuid: string;
    public created_at: number;
    public updated_at: number;
    public version: `${number}.${number}.${number}`;

    constructor(record: IEntityModelData) {
        this.id = record.id;
        this.uuid = record.uuid;
        this.created_at = record.created_at;
        this.updated_at = record.updated_at;
        this.version = record.version;
    }

    public toDomain() {
        return {
            id: this.id,
            uuid: this.uuid,
            createdAt: this.created_at,
            updatedAt: this.updated_at,
            version: this.version
        };
    }

    public toRepository() {
        return {
            id: this.id,
            uuid: this.uuid,
            created_at: this.created_at,
            updated_at: this.updated_at,
            version: this.version
        };
    }

    public static fromDomain(record: IEntityData): EntityModel {
        return new EntityModel({
            id: record.id,
            uuid: record.uuid,
            created_at: record.createdAt,
            updated_at: record.updatedAt,
            version: record.version
        });
    }

    public static fromRepository(record: IEntityModelData): EntityModel {
        return new EntityModel({
            id: record.id,
            uuid: record.uuid,
            created_at: record.created_at,
            updated_at: record.updated_at,
            version: record.version
        });
    }

}