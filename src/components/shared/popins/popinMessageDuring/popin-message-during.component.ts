import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {finalize, tap} from "rxjs/operators";

export interface DialogData {
  name: string;
  message: string;
}

@Component({
  selector:  'app-popin-message-during',
  template: `
  <span>
  <mat-progress-spinner color="accent" mode="indeterminate" value="50" diameter="20"></mat-progress-spinner>
    {{data.message}}
  </span>
  `,
  styleUrls: ['./popin-message-during.component.scss']

})
export class PopinMessageDuringComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog) {}
}

export const showMessageDuring = (dialog: any,
                                  obs: Observable<any>,
                                  message: string = `Enregistrement en cours`): Observable<any> => {

  const dialogRef = dialog.open(PopinMessageDuringComponent, { width: `auto`, data: { message }});

  console.log('showMessageDuring');
  obs.pipe(
    tap(() => {
      console.log('tap obs');
    }),
    finalize(() => {
      console.log('close dialog');
      dialog.close();
    })
  );
  return obs;
};
