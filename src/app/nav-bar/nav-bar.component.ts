import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('You are now logged out.', 'OK', {
      duration: 2000,
    });
  }
}
