import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDiskIOAPIData, IDiskIOData, IDiskIOModelData } from "../data";

export interface IDiskIO extends IEntity<IDiskIOAPIData, IDiskIOData, IDiskIOModelData> { }
