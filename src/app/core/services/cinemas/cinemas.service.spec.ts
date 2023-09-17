import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Cinema } from '../../models/cinema';
import { CinemaParams } from '../../models/cinema-params';
import { TableLoadEvent } from '../../models/table-load-event';
import { CinemasService } from './cinemas.service';

describe('CinemasService', () => {
  let service: CinemasService;
  let httpTestingController: HttpTestingController;
  const mockCinema: Cinema = {
    name: 'Cinema 1',
    id: 1,
    screens: [
      { id: 1, name: 'Screen 1' },
      { id: 2, name: 'Screen 2' },
    ],
  };
  const mockParams: TableLoadEvent = {
    pageIndex: 1,
    pageSize: 10,
    sort: 'name_asc',
  };
  const cinemaParams: CinemaParams = {
    cinema: mockCinema,
    params: mockParams,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CinemasService],
    });
    service = TestBed.inject(CinemasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set cinema parameters using setCinemaParams', () => {
    service.setCinemaParams(cinemaParams);
    expect(service.cinemaParams$.value).toEqual(cinemaParams);
  });

  it('should get current cinema parameters using getCurrentParams', () => {
    service.cinemaParams$ = new BehaviorSubject<CinemaParams | null>(
      cinemaParams
    );
    const params = service.getCurrentParams();
    params.subscribe((result) => {
      expect(result).toEqual(cinemaParams);
    });
  });

  it('should retrieve all screens associated with cinemas', () => {
    const mockCinemasResponse = [
      {
        id: 1,
        name: 'Cinema 1',
        screens: [
          { id: 1, name: 'Screen 1' },
          { id: 2, name: 'Screen 2' },
        ],
      },
      {
        id: 2,
        name: 'Cinema 2',
        screens: [
          { id: 3, name: 'Screen 3' },
          { id: 4, name: 'Screen 4' },
        ],
      },
    ];

    spyOn(service, 'getAllPages').and.returnValue(of(mockCinemasResponse));

    service.getAllScrens().subscribe((screens) => {
      expect(screens).toEqual([
        { id: 1, name: 'Screen 1' },
        { id: 2, name: 'Screen 2' },
        { id: 3, name: 'Screen 3' },
        { id: 4, name: 'Screen 4' },
      ]);
    });

    expect(service.getAllPages).toHaveBeenCalled();
    httpTestingController.expectNone(service.endpoint);
  });
});
