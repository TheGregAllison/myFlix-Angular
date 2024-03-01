import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from './movie.model';


@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.scss'
})
export class MovieViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: Movie },
    public dialogRef: MatDialogRef<MovieViewComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
