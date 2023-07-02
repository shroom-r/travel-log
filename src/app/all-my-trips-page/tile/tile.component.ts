import { Component } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  // construire une tuile qui sera utilisée pour présenter chaque trip
  // on doit afficher au minimum un titre et une description
  title: string;
  tripDescription: string;

  constructor() {
    this.title = 'titre Tuile';
    this.tripDescription = 'Description du trip';
  }

}
