import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDiskioAPIData, IDiskioData, IDiskioModelData } from "../data";

export interface IDiskio extends IEntity<IDiskioAPIData, IDiskioData, IDiskioModelData> { }
