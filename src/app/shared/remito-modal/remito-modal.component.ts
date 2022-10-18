import { Component, Inject } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remito-modal',
  templateUrl: './remito-modal.component.html',
  styleUrls: ['./remito-modal.component.scss']
})
export class RemitoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close({ state: false });
  }
  updateStatus(): void {
    this.dialogRef.close({ state: true });
  }
}