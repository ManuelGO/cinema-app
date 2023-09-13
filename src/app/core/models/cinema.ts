import { BaseEntity } from './base-entity';
import { Screen } from './screen';

export interface Cinema extends BaseEntity {
  screens: Screen[];
}
