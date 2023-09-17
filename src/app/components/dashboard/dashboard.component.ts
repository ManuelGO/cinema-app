import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashBoardData } from 'src/app/core/models/dashboard-data';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { ResponsiveService } from 'src/app/core/services/responsive/responsive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashBoarData$!: Observable<DashBoardData>;

  constructor(
    private dashboardService: DashboardService,
    private responsiveService: ResponsiveService
  ) {}
  ngOnInit(): void {
    this.dashBoarData$ = this.dashboardService.getDasboardData();
  }

  cardLayout = this.responsiveService
    .getBreackPointObserver()
    .observe(Breakpoints.Handset)
    .pipe(
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
