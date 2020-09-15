import { Component, OnInit } from '@angular/core';
import { GameMechanicsService } from '../game-mechanics.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private gameMechanicsService: GameMechanicsService) { }

  ngOnInit(): void { }

  newGame(): void {
    this.gameMechanicsService.newGame();
  }

}
