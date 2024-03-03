import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  /**
   * @constructor - Constructor for NavbarComponent.
   * @param {Router} router - Service for routing and page navigation.
   * @param {MatSnackBar} snackBar - Notification service.
   */
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  /**
   * Function to navigate to movies page.
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Function to navigate to user's profile page.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Function to logout user and returns to welcome page.
   * @returns Message "You are now logged out.".
   */
  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('You are now logged out.', 'OK', {
      duration: 2000,
    });
  }
}
