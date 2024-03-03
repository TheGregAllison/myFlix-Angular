import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from './movie.model';

/**
 * @description Component representing the movie details.
 * @selector 'app-movie-view'
 * @templateUrl './movie-view.component.html'
 * @styleUrls ['./movie-view.component.scss']
 */
@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrl: './movie-view.component.scss',
})
export class MovieViewComponent {
  /**
   * @constructor - Constructor for MovieViewComponent.
   * @param {any} movie - Movie data displayed in MovieViewComponent.
   * @returns Movie modal
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movie: Movie },
    public dialogRef: MatDialogRef<MovieViewComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
