import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData } from "../data";

export interface IDiskioFile extends IEntity<IDiskioFileAPIData, IDiskioFileData, IDiskioFileModelData> { }
