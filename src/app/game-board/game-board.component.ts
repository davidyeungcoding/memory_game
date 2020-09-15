import { Component, OnInit } from '@angular/core';
import { Button } from '../button';
import { GameMechanicsService } from '../game-mechanics.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  isActive = { active: true };
  board = this.gameMechanicsService.board;
  first = this.gameMechanicsService.first;
  matched = this.gameMechanicsService.matched;

  constructor(private gameMechanicsService: GameMechanicsService) { }

  ngOnInit(): void {
    this.gameMechanicsService.currentBoard.subscribe(_board => this.board = _board);
    this.gameMechanicsService.currentMatched.subscribe(_matched => this.matched = _matched);
  }

  flip(delta: Button): void {
    console.log(this.first)
    console.log(this.matched)
    if (!this.matched[delta.id]) {
      let current = document.getElementById(delta.id);
      current.classList.add("selected");

      if (this.first && this.isActive.active && delta.id !== this.first.id) {
        delta.display = delta.value;
  
        if (this.first.display !== delta.display) {
          this.isActive.active = false;
          this.reset(this.first, this.gameMechanicsService.default, true, this.isActive, 600);
          this.reset(delta, this.gameMechanicsService.default, false, this.isActive, 900);
        } else {
          this.matched[this.first.id] = true;
          this.matched[delta.id] = true;
          if (Object.keys(this.matched).length === this.board.length) $('#winState').modal('show');
        };
        this.first = false;
      } else if (this.isActive.active) {
        this.first = delta;
        delta.display = delta.value;
      };
    };
  }

  reset(delta: Button, _default: string, first: boolean, _isActive: any, time: number): void {
    setTimeout(function() {
      delta.display = _default;
      document.getElementById(delta.id).classList.remove("selected");
      if (!first) _isActive.active = true;
    }, time);
  }

  newGame(): void {
    this.gameMechanicsService.newGame();
  }

}
