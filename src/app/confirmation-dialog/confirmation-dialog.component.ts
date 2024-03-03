import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Confirmation dialog for delete-user action
 * @selector 'app-confirmation-dialog'
 * @templateUrl './confirmation-dialog.component.html'
 * @styleUrls ['./confirmation-dialog.component.scss']
 */

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  /**
   * @constructor - Constructor for ConfirmationDialogComponent.
   * @param - Delete User confiramtion dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
