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
      if (window.innerWidth < 600) {
        console.log('screen < 600');
        this.puzzle.tileSize = Math.floor((window.innerHeight - 230) / 3);
      }
      else {
        console.log('screen >600');
        this.puzzle.tileSize = Math.floor((window.innerHeight - 200) / 3);
      }
    }
    else {
      /** Size for mobile screens */
       if(window.innerHeight < 500){
         console.log('mobile screen > ');
         this.puzzle.tileSize = Math.floor((window.innerHeight - 90) / 3);
       }
       else{
         console.log('mobile screen > 500');
         this.puzzle.tileSize = Math.floor((window.innerWidth - 50) / 3);
       }
    }
    this.puzzle.initialize();

  }

  moveTile(tile) {
    this.puzzle.move(tile);
  }

}
