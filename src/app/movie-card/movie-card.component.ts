import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { Title } from '@angular/platform-browser';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  userData = { Username: '', Email: '', BirthDate: '', FavoriteMovies: [] as string[] };
  FavoriteMovies: any[] = [];
  isFavorited: boolean = false;

  

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

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.movies.filter((movie) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    console.log('Favorite Movies:', this.FavoriteMovies);
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
    isFavorite ? this.deleteFavMovie(movie) : this.addFavMovies(movie);
  }

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

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }

  openGenreDialog(genreName: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        GenreName: genreName,
        Description: description,
      },
      width: '500px',
    });
  }

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

  openMovieView(movie: any): void {
    this.dialog.open(MovieViewComponent, {
      data: { movie: movie },
    });
  }
}
