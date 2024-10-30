import { IEntityAPIData, IEntityData, IEntityModelData } from "../interfaces/data";
import { IEntity } from "../interfaces/dto";

export class Entity implements IEntity<IEntityAPIData, IEntityData, IEntityModelData> {

    public id: number;
    public uuid: string;
    public createdAt: number;
    public updatedAt: number;
    public version: `${number}.${number}.${number}`;

    constructor(entity: Partial<IEntityData>) {
        this.id = entity.id || 0;
        this.uuid = entity.uuid || crypto.randomUUID();
        this.createdAt = entity.createdAt || new Date().getTime();
        this.updatedAt = entity.updatedAt || new Date().getTime();
        this.version = entity.version || '1.0.0';
    }

    public toApi() {
        return {
            uuid: this.uuid,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    public toDomain() {
        return {
            id: this.id,
            uuid: this.uuid,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            version: this.version
        };
    }

    public toModel() {
        return {
            id: this.id,
            uuid: this.uuid,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            version: this.version
        };
    }

    public static fromAPI(entity: IEntityAPIData): Entity {
        return new Entity(entity);
    }

    public static fromModel(entity: IEntityModelData): Entity {
        return new Entity({
            id: entity.id,
            uuid: entity.uuid,
            createdAt: entity.created_at,
            updatedAt: entity.updated_at,
            version: entity.version
        });
    }
}