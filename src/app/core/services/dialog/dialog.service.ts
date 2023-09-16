import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseComponent } from 'src/app/components/form-base/form-base.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  showFormDialog<T>(service: T, entityType?: string, entityId?: number) {
    const dialogRef = this.dialog.open(FormBaseComponent<T>, {
      data: {
        service,
        entityType,
        entityId,
      },
    });
    return dialogRef.afterClosed();
  }
}
