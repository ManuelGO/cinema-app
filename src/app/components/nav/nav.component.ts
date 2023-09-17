import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { menuItems } from './menu-items';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  dashBoarData$ = this.dashboardService.getDasboardData();
  private breakpointObserver = inject(BreakpointObserver);
  menuItems = menuItems;
  constructor(private dashboardService: DashboardService) {}

  trackByItems(index: number, item: any): number {
    return item.trackId;
  }
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
