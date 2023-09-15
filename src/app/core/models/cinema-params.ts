import { Cinema } from './cinema';
import { TableLoadEvent } from './table-load-event';

export interface CinemaParams {
  cinema: Cinema;
  params: TableLoadEvent;
}
