import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef,
  Renderer, OnInit
} from '@angular/core';
import {PuzzleTile} from "../puzzleTile/puzzle-tile.class";
import {GameState} from "../state/state.class";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input() state: GameState;
  @Output() move = new EventEmitter<PuzzleTile>();

  backgroundSize;
  showNumbers: boolean = false;
  @ViewChild('board') board: ElementRef;
  @ViewChild('background') background: ElementRef;


  constructor(private renderer: Renderer) {

  }

  ngOnInit() {
    let boardSize = this.state.tileSize * 3;
    this.backgroundSize = boardSize + 'px ' + boardSize + 'px';
    this.renderer.setElementStyle(this.board.nativeElement, 'width', boardSize + 'px');
    this.renderer.setElementStyle(this.board.nativeElement, 'height', boardSize + 'px');
    this.renderer.setElementStyle(this.background.nativeElement, 'background-size', this.backgroundSize);
  }

  getStyles(tile: PuzzleTile) {
    return {
      top: tile.current.location.top + 'px',
      left: tile.current.location.left + 'px',
      width: this.state.tileSize + 'px',
      height: this.state.tileSize + 'px',
      display: (tile.isBlank) ? 'none' : 'flex',
      backgroundImage: 'url(' + this.state.image + ')',
      backgroundPosition: (-tile.goal.location.left) + "px " + (-tile.goal.location.top) + "px",
      backgroundSize: this.backgroundSize
    };
  }


  moveTile(tile) {
    if (this.state.goal) return;
    this.move.emit(tile);
  }

}

