# myFlix Angular Client

This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0, aimed at providing a client-side interface for the myFlix app, which leverages a server-side REST API and database to present a collection of movies to users.

## Description

The myFlix Angular Client allows users to access information about different movies, directors, and genres. Users can sign up, log in, view movie details, and manage their favorite movies list.

## Features

- **Welcome View:** New users can register, while existing users can log in.
- **Main View:** Displays all movies from the API, including director details, genre details, and a synopsis of each movie.
  - In the Navbar:
    - Users can log out.
    - Navigate to Profile View.
- **Profile View:**
  - Displays user registration details.
  - Allows users to update their information (username, email, date of birth).
  - Users can deregister.
  - Displays a list of favorite movies with the option to remove movies from the list.

## Dependencies

- **Angular:** Web application framework for building single-page client applications.
- **Angular Material:** UI component library for Angular, implementing Google's Material Design.
- **RxJS:** Library for reactive programming using observables.
- Additional dependencies are listed in the `package.json` file.

## Development Dependencies

- **Angular CLI:** ^17.1.3
- **TypeScript:** ~5.3.2
- **Karma:** ~6.4.0
- **Jasmine:** ~5.1.0

## Project API

This project uses data from the `Node-Movie-API` available at: https://github.com/TheGregAllison/Node-Movie-API

## Installation

1. Clone this repository: `git clone https://github.com/TheGregAllison/myFlix-Angular-App`
2. Navigate to the project directory: `cd myFlix-Angular-App`
3. Install dependencies: `npm install`

## Running the Application Locally

1. Run `ng serve` to start the development server.
2. Open `http://localhost:4200/` in your browser.

## Link to the Deployed App

The app is hosted on GitHub Pages and can be accessed at:
