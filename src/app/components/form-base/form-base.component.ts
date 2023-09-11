import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { EntityType } from 'src/app/core/models/entity-type.enum';
import { LoadingStatus } from 'src/app/core/models/loading-status.enum';
import { BaseService } from 'src/app/core/services/base-service';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss'],
})
export class FormBaseComponent<T> implements OnInit {
  form!: FormGroup;
  status = LoadingStatus;
  types = EntityType;
  loadingStatus = new BehaviorSubject<string>('');
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormBaseComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      service: BaseService<any>;
      entityType: string;
      entityId: number;
    }
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
    });
    if (this.data.entityType === this.types.MOVIE) {
      this.form.addControl(
        'runtime',
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.min(1),
        ])
      );
    } else if (this.data.entityType === this.types.CINEMA) {
    }
  }

  close(value: any) {
    this.dialogRef.close(value);
  }

  save() {
    this.loadingStatus.next(this.status.LOADING);
    this.data.service
      .saveItem(this.form.value, this.data.entityType, this.data.entityId)
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
