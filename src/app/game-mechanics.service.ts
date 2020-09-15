import { Injectable } from '@angular/core';
import { Button } from './button';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMechanicsService {
  images: string[] = [
    '../assets/images/chicago.jpg',
    '../assets/images/colorado.jpg',
    '../assets/images/columbus.jpg',
    '../assets/images/dallas.jpg',
    '../assets/images/dc.jpg',
    '../assets/images/houston.jpg',
    '../assets/images/kansas_city.jpg',
    '../assets/images/la.jpg',
    '../assets/images/montreal.jpg',
    '../assets/images/new_england.jpg',
    '../assets/images/new_york_rb.jpg',
    '../assets/images/nyc.jpg',
    '../assets/images/orlando.jpg',
    '../assets/images/philadelphia.jpg',
    '../assets/images/portland.jpg',
    '../assets/images/salt_lake.jpg',
    '../assets/images/san_jose.jpg',
    '../assets/images/seattle.jpg',
    '../assets/images/toranto.jpg',
    '../assets/images/vancouver.jpg'
  ];
  default: string = '../assets/images/mls.jpg';
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
