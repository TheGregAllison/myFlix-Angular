import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Modal displaying director details.
 * @selector 'app-director-info'
 * @templateUrl './director-info.component.html'
 * @styleUrls ['./director-info.component.scss']
 */

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrl: './director-view.component.scss',
})
export class DirectorViewComponent implements OnInit {
  /**
   * @constructor - Constructor for DirectorViewComponent.
   * @param - Director Information.
   */

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
