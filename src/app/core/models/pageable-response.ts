import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PageableResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  sort: Sort;
  totalElements: number;
  totalPages: number
}
