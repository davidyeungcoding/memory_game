import { Injectable } from '@angular/core';
import { Button } from './button';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMechanicsService {
  images: string[] = [
    '../images/chicago.jpg',
    '../images/colorado.jpg',
    '../images/columbus.jpg',
    '../images/dallas.jpg',
    '../images/dc.jpg',
    '../images/houston.jpg',
    '../images/kansas_city.jpg',
    '../images/la.jpg',
    '../images/montreal.jpg',
    '../images/new_england.jpg',
    '../images/new_york_rb.jpg',
    '../images/nyc.jpg',
    '../images/orlando.jpg',
    '../images/philadelphia.jpg',
    '../images/portland.jpg',
    '../images/salt_lake.jpg',
    '../images/san_jose.jpg',
    '../images/seattle.jpg',
    '../images/toranto.jpg',
    '../images/vancouver.jpg'
  ];
  default: string = '../images/mls.jpg';
  selectedTeams: object = {};
  board: Button[] = new Array(12);
  matched: object = {};
  first: any = false;
  private boardSource = new BehaviorSubject<Button[]>(this.selectTeams());
  currentBoard = this.boardSource.asObservable();
  private matchedSource = new BehaviorSubject<object>(this.matched);
  currentMatched = this.matchedSource.asObservable();

  constructor() { }

  getNext(index: number, collection: any, compare: boolean, max: number): number {
    let temp = compare ? this.images[index] : index;
    while (collection[temp]) {
      index < max ? index++ : index = 0;
      temp = compare ? this.images[index] : index;
    };
    return index;
  }

  selectTeams(): Button[] {
    while (Object.keys(this.selectedTeams).length < 6) {
      let index = Math.floor(Math.random() * 12);
      if (this.selectedTeams[this.images[index]]) index = this.getNext(index, this.selectedTeams, true, 19);
      this.selectedTeams[this.images[index]] = true;
      this.buildBoard(index);
      this.buildBoard(index);
    };
    return this.board;
  }

  buildBoard(index: number): void {
    let fill = Math.floor(Math.random() * 12);
    if (this.board[fill]) fill = this.getNext(fill, this.board, false, 11);
    this.board[fill] = {
      id: `_${fill}`,
      display: this.default,
      value: this.images[index]
    };
  }

  changeBoard(board: Button[]): void {
    this.boardSource.next(board);
  }

  changeMatched(matched: object): void {
    this.matchedSource.next(matched);
  }

  newGame(): void {
    this.selectedTeams = {};
    this.board = new Array(12);
    this.changeMatched({});
    this.first = false;
    this.changeBoard(this.selectTeams());
  }

}
