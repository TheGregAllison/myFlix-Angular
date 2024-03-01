import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-navbar *ngIf="isAuthenticated()"></app-navbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
