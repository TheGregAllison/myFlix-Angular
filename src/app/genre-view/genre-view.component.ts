import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrl: './genre-view.component.scss',
})
export class GenreViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { GenreName: string; Description: string },
    public dialogRef: MatDialogRef<GenreViewComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
