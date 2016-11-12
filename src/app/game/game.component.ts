import {Component, ChangeDetectionStrategy, AfterContentInit} from '@angular/core';
import {PuzzleService} from "../puzzle/puzzle.service";
import {GameState} from "../state/state.class";
import {Store} from "@ngrx/store";

@Component({
  selector: 'game',
  template: '<board [state]="gameState | async" (move)="moveTile($event)"></board>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements AfterContentInit{

  gameState;

  constructor(private puzzle: PuzzleService,
              private store: Store<GameState>) {
    this.gameState = this.store.select('state');
  }

  ngAfterContentInit() {
    if (window.innerWidth > window.innerHeight) {
      /** Size for large screens */
      if (window.innerWidth > 600) {
        this.puzzle.tileSize = window.innerHeight / 3 - 65;
      }
      else {
        this.puzzle.tileSize = window.innerWidth / 3 - 20;
      }
    }
    else {
      /** Size for mobile screens */
      this.puzzle.tileSize = window.innerWidth / 3 - 10;
    }
    this.puzzle.initialize();

  }

  moveTile(tile) {
    this.puzzle.move(tile);
  }

}
