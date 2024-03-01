import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-profile',
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

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

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

  deleteUser(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Account',
        message: 'Are you sure you want to delete your account?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchApiData.deleteUser().subscribe(
          () => {
            console.log('Account deleted successfully.');
            this.router.navigate(['welcome']).then(() => {
              localStorage.clear();
              this.snackBar.open('Account successfully deleted.', 'OK', {
                duration: 2000,
              });
            });
          },
          (error) => {
            console.error('Error deleting account:', error);
            this.snackBar.open('Failed to delete account', 'OK', {
              duration: 2000,
            });
          }
        );
      }
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie._id === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite ? this.deleteFavMovie(movie) : this.addFavMovie(movie);
  }

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

  openMovieView(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie },
    });
  }
}
