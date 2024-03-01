import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss',
})
export class DirectorViewComponent implements OnInit {
  // birthDateWithoutTime: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      BirthDate: Date;
    }
  ) {}

  ngOnInit(): void {}
}
