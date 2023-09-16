import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() total!: number;
  @Input() dataSource!: MatTableDataSource<any>;
}
