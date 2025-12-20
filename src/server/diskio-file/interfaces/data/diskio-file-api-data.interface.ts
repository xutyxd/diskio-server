import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IDiskioFileAPIData extends IEntityAPIData {
    name: string;
    size: number;
    original: number;
}
