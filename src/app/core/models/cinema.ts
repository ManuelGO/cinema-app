import { BaseEntity } from "./base-entity";

export interface Cinema extends BaseEntity{
 screens: BaseEntity[];
}
