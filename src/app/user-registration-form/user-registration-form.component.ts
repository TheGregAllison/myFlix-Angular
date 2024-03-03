import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @description Component representing the registration form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  /**
   * @constructor - Constructor for UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Service for opening dialogs.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registrationForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(7)]],
      Email: ['', [Validators.required, Validators.email]],
      BirthDate: [''],
    });
  }

  ngOnInit(): void {}

  /**
   * Function responsible for sending the form inputs to the server.
   * @returns Message 'Your account has been created and you have been logged in!' / error message.
   */
  registerUser(): void {
    if (this.registrationForm.valid) {
      this.fetchApiData.userRegistration(this.registrationForm.value).subscribe(
        (result) => {
          this.fetchApiData
            .userLogin({
              Username: this.registrationForm.value.Username,
              Password: this.registrationForm.value.Password,
            })
            .subscribe(
              (result) => {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', result.token);
                this.dialogRef.close();
                this.snackBar.open(
                  'Your account has been created and you have been logged in!',
                  'OK',
                  {
                    duration: 2000,
                  }
                );
                this.router.navigate(['movies']);
              },
              (error) => {
                this.snackBar.open(error, 'OK', {
                  duration: 2000,
                });
              }
            );
        },
        (error) => {
          this.snackBar.open(error, 'OK', {
            duration: 2000,
          });
        }
      );
    }
  }
}
