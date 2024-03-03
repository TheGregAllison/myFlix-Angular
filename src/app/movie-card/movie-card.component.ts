import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component for movie cards.
 * @selector 'app-movie-card'
 * @templateUrl './movie-card.component.html'
 * @styleUrls ['./movie-card.component.scss']
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  userData = {
    Username: '',
    Email: '',
    BirthDate: '',
    FavoriteMovies: [] as string[],
  };
  FavoriteMovies: any[] = [];
  isFavorited: boolean = false;

  /**
   * @constructor - Constructor for MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from API.
   * @param {MatDialog} dialog - Service for opening dialogs.
   * @param {MatSnackBar} snackBar - Service for displaying notification popups.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavMovies();
    });
  }

  /**
   * Function to get user profile data.
   * @returns JSON Object containing user data.
   */
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.BirthDate = this.user.BirthDate;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
    });
  }

  /**
   * Function that fetches all movies from API.
   * @returns Array containing all movies.
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function to get user's favoriteMovies list.
   * @returns Favorite movies of user.
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.movies.filter((movie) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    console.log('Favorite Movies:', this.FavoriteMovies);
  }

  /**
   * Function to check if movie is in user's favorites array.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is present in favorites array.
   */
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie._id === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Function to update favorite icon based on status of movie in favorites array.
   * @param {any} movie - Movie to be favorited/unfavorited.
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite ? this.deleteFavMovie(movie) : this.addFavMovies(movie);
  }

  /**
   * Function to append movie to favMovie list
   * @param {any} movie - Movie to added to user's favorite movies array.
   * @returns Message "Movie has been added to your favorites!"
   */
  addFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavoriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.snackBar.open(`${movie.Title} added to favorites.`, 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Function to delete movie from favoriteMovies list.
   * @param {any} movie - Movie to delete from user's favorite movies array.
   * @returns Message "Movie has been deleted from your favorites!"
   */
  deleteFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavoriteMovie(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.getProfile();
      this.snackBar.open(`${movie.Title} removed from favorites.`, 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Function to display movie synopsis modal.
   * @param {string} movie.Title - Movie title
   * @param {string} movie.Description - Movie synopsis/description
   * @returns Movie modal with title and synopsis
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Function to display genre modal.
   * @param {string} genre.GenreName - Genre name
   * @param {string} genre.Description - Genre description
   * @returns Genre modal with name and description
   */
  openGenreDialog(genreName: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        GenreName: genreName,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Function to display director modal.
   * @param {string} director.Name - Director name
   * @param {string} director.Bio - Director biography
   * @param {date} director.BirthDate - Director date of birth
   * @returns Director modal with name, bio, and date of birth
   */
  openDirectorDialog(Name: string, Bio: string, BirthDate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        BirthDate: BirthDate,
      },
      width: '500px',
    });
  }
  /**
   * Function to display movie view modal.
   * @param {any} movie - movie details
   * @returns Movie modal containing movie details,
   */
  openMovieView(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie },
    });
  }
}
