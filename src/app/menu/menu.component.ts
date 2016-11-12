import {Component, ChangeDetectionStrategy} from '@angular/core';
import { PuzzleService} from "../puzzle/puzzle.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {


  constructor(private puzzle: PuzzleService) { }

}
