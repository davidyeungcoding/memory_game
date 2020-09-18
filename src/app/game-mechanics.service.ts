import { Injectable } from '@angular/core';
import { Button } from './button';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMechanicsService {
  images: string[] = [
    'dist/assets/chicago.jpg',
    'dist/assets/colorado.jpg',
    'dist/assets/columbus.jpg',
    'dist/assets/dallas.jpg',
    'dist/assets/dc.jpg',
    'dist/assets/houston.jpg',
    'dist/assets/kansas_city.jpg',
    'dist/assets/la.jpg',
    'dist/assets/montreal.jpg',
    'dist/assets/new_england.jpg',
    'dist/assets/new_york_rb.jpg',
    'dist/assets/nyc.jpg',
    'dist/assets/orlando.jpg',
    'dist/assets/philadelphia.jpg',
    'dist/assets/portland.jpg',
    'dist/assets/salt_lake.jpg',
    'dist/assets/san_jose.jpg',
    'dist/assets/seattle.jpg',
    'dist/assets/toranto.jpg',
    'dist/assets/vancouver.jpg'
  ];
  default: string = 'dist/assets/mls.jpg';
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
