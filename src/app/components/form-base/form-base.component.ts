import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { LoadingStatus } from 'src/app/core/models/loading-status';
import { BaseService } from 'src/app/core/services/base-service';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss'],
})
export class FormBaseComponent implements OnInit {
  form!: FormGroup;
  status = LoadingStatus;
  loadingStatus = new BehaviorSubject<string>('');
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormBaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service: BaseService<any> }
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        ],
      ],
      runtime: [
        '',
        [Validators.required, Validators.minLength(2), Validators.min(1)],
      ],
    });
  }

  close(value: any) {
    this.dialogRef.close(value);
  }

  save() {
    this.loadingStatus.next(this.status.LOADING);
    this.data.service
      .saveItem(this.form.value)
      .pipe(
        catchError((err) => {
          this.loadingStatus.next(this.status.FAILED);
          return of(err);
        }),
        finalize(() => {
          if (this.loadingStatus.value !== 'failed') {
            this.loadingStatus.next(this.status.SUCCESS);
          }
        })
      )
      .subscribe((r: any) => console.log(r));
  }
}
