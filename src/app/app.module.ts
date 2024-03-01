import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardHeader } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';


import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { SynopsisViewComponent } from './synopsis-view/synopsis-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenreViewComponent,
    DirectorViewComponent,
    SynopsisViewComponent,
    MovieViewComponent,
    NavBarComponent,
    ProfileViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatFormFieldModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
