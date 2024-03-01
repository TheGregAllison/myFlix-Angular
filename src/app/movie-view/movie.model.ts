export interface Movie {
    Title: string;
    ReleaseYear: number;
    Genre: {
      GenreName: string;
      Description: string;
    };
    Director: {
      Name: string;
      Bio: string;
      BirthDate: Date;
    };
    Description: string;
  }