import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashBoardData } from 'src/app/core/models/dashboard-data';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashBoarData$!: Observable<DashBoardData>;

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashBoarData$ = this.dashboardService.getDasboardData();
  }
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return { columns: 4, miniCard: { cols: 1, rows: 1 } };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
      };
    })
  );
}
