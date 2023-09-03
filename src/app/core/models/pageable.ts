import { Sort } from "./sort";

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: true;
  unpaged: boolean;
  sort: Sort;
}
