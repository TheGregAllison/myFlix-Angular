import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

/**
 * @description Component representing the user profile view.
 * @selector 'app-profile-view'
 * @templateUrl './profile-view.component.html'
 * @styleUrls ['./profile-view.component.scss']
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Email: '',
    BirthDate: '',
    FavoriteMovies: [],
  };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];
  accountDeleted = false;

  /**
   * @constructor - Constructor for ProfileViewComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {Router} router - Routing service for navigation.
   * @param {MatDialog} dialog - Service for opening dialogs.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  /**
   * Function for getting user.
   * @returns user's username, email, birthday, and favorite movies array.
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

  getFavMovies(): void {
    this.getProfile();
  }

  /**
   * Function for updating user information.
   * @returns Message "User update successful" / "Failed to update user"
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log('User update success:', result);
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Function to delete user profile.
   * @returns Message "User successfully deleted."
   */
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000,
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

  // NOT IN USE AT THE MOMENT
  // private confirmDeleteUser(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.fetchApiData.deleteUser().subscribe(
  //       () => {
  //         console.log('Account deleted successfully.');
  //         resolve();
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // }

  /**
   * Function for getting all movies.
   * @returns All movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function that will open the dialog when director button is clicked.
   * @param {string} name - Name of the director.
   * @param {string} bio - Biography of the director.
   * @param {date} birth - Date of birth of the director.
   * @returns Directors name, bio, and date of birth.
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '450px',
    });
  }

  /**
   * Function that will open the genre dialog.
   * @param {string} name - Name of the genre.
   * @param {string} description - Description of the genre.
   * @returns Genre name and discription.
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Function that will open the movie synopsis dialog
   * @param {string} title - Title of the movie.
   * @param {string} description - Description of the movie.
   * @returns Title and description of the movie.
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * Function to check if movie is a in user's favorites array.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is present in favorites list.
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
    isFavorite ? this.deleteFavMovie(movie) : this.addFavMovie(movie);
  }

  /**
   * Function to append movie to favMovie list
   * @param {any} movie - Movie to added to user's favorite movies array.
   * @returns Message "Movie has been added to your favorites!"
   */
  addFavMovie(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavoriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.snackBar.open(`${movie.Title} added to favorites.`, 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Function to delete movie from user's favorite movies array.
   * @param {any} movie - Movie to delete from favorite movies.
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
