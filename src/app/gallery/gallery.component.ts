import {Component, ChangeDetectionStrategy} from '@angular/core';
import {PuzzleService} from "../puzzle/puzzle.service";

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {

  constructor(private puzzle: PuzzleService) {
  }

}
