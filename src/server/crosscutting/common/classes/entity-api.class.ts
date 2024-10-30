import { IEntityAPIData, IEntityData } from "../interfaces/data";
import { IEntityAPI } from "../interfaces/dto";
import { Entity } from "./entity.class";

export class EntityAPI implements IEntityAPI<IEntityAPIData, IEntityData> {

    public uuid: string;
    public createdAt: number;
    public updatedAt: number;

    constructor(entity: IEntityAPIData) {
        this.uuid = entity.uuid;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }

    public toApi() {
        return {
            uuid: this.uuid,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    };
    public toDomain() {
        const entity = new Entity(this);

        return entity.toDomain();
    };

    public static fromDomain(entity: IEntityAPIData): EntityAPI {
        return new EntityAPI(entity);
    }
}