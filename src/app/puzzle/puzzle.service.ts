import {Injectable} from '@angular/core';
import {Tile, Location} from '../tile/tile.class';
import {PuzzleTile} from "../puzzleTile/puzzle-tile.class";
import {GameState} from "../state/state.class";
import {Store} from "@ngrx/store";

@Injectable()
export class PuzzleService {

  private _prepTiles: Tile[] = [];

  tiles: PuzzleTile[];
  tileSize;
  puzzleImage: string;
  images = [
    prefixPath('../../assets/dog.jpg'),
    prefixPath('../../assets/adriana.jpg'),
    prefixPath('../../assets/romance.jpg'),
    prefixPath('../../assets/tiger.jpg'),
    prefixPath('../../assets/cartoon1.jpg'),
    prefixPath('../../assets/cartoon2.jpg'),
    prefixPath('../../assets/cartoon3.jpg')
  ];

  constructor(private store: Store<GameState>) {
  }

  initialize() {
    this.puzzleImage = this.images[0];
    /** prepare the goal state with indexes and proper locations */
    let tileIndex = 0;
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        this._prepTiles.push(new Tile(++tileIndex, new Location(this.tileSize * x, this.tileSize * y)));

    this.mapTiles();
  }

  mapTiles() {
    /** fill tiles with locations */
    this.tiles = [];
    this._prepTiles.map((tile)=> {
      this.tiles.push(new PuzzleTile(tile));
    });
    this.updateState();
  }

  /** Update puzzle state */
  updateState() {
    this.store.dispatch({
      payload: {
        tiles: this.tiles,
        goal: this._goalTest(),
        image: this.puzzleImage,
        tileSize: this.tileSize
      }, type: ''
    });
  }

  /** Update puzzle image */
  updateImage(index) {
    this.puzzleImage = this.images[index];
    this.updateState();
  }

  /** Move a tile */
  move(tile: PuzzleTile) {
    let blank = this._getBlankTile();
    let blankLoc = this._getBlankTile().current.location;
    let tileLoc = tile.current.location;
    /** Check Horizontally */
    if (tileLoc.top === blankLoc.top) {
      if (tileLoc.left - blankLoc.left === this.tileSize) {
        console.log('Left');
      }
      else if (blankLoc.left - tileLoc.left === this.tileSize) {
        console.log('Right');
      }
      else {
        console.log("Can't move this, too far");
        return;
      }
    }
    /** Check Vertically */
    else if (tileLoc.left === blankLoc.left) {
      if (tileLoc.top - blankLoc.top === this.tileSize) {
        console.log('Top');
      }
      else if (blankLoc.top - tileLoc.top === this.tileSize) {
        console.log('Bottom');
      }
      else {
        console.log("Can't move this, too far");
        return;
      }
    }
    else {
      console.log("You can't move this.");
      return;
    }
    let temp = tile.current;
    tile.current = blank.current;
    blank.current = temp;

    this.updateState();
  }

  solve() {
    // this._getAvailableTiles();
    alert('Sorry, but "Solve" is not implemented yet.');
  }

  /** Get a new solvable puzzle  */
  shuffle() {
    this._prepTiles = shuffleArray(this._prepTiles);
    /** Keep shuffling until getting a solvable puzzle */
    if (!isSolvable(this._prepTiles)) {
      this.shuffle();
      return;
    }
    this._prepTiles.map((tile, i)=> {
      this.tiles[i].current = this._prepTiles[i];
    });
    this.updateState();
  }

  /** Get blank tile  */
  private _getBlankTile() {
    return this.tiles[8];
  }

  /** Check if game is over */
  private _goalTest() {
    for (let tile of this.tiles) {
      let goal = tile.isGoal();
      if (!goal) {
        return false;
      }
    }
    return true;
  }

  /** Get movable tiles */
  _getAvailableTiles() {
    let blank = this._getBlankTile();
    let blankLoc = blank.current.location;
    let availableTiles = [];
    /** Horizontal availability */
    if (blankLoc.left === this.tileSize) {
      //left & right
      availableTiles.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
      availableTiles.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    }
    else if (blankLoc.left < this.tileSize) {
      //right
      availableTiles.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    }
    else {
      //left
      availableTiles.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
    }
    /** Vertical availability */
    if (blankLoc.top === this.tileSize) {
      //top & bottom
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    }
    else if (blankLoc.top < this.tileSize) {
      //bottom
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    }
    else {
      //top
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
    }
    highlightTile(availableTiles);
    return availableTiles;
  }

  /** Get a tile by location  */
  private _getTileByLoc(left, top) {
    return this.tiles[this.tiles.map((e) => {
      return e.current.location.left === left && e.current.location.top === top
    }).indexOf(true)];
  }

  /** A* Algorithm */
  aStar() {
    while (!this._goalTest()) {
      for (let tile of this._getAvailableTiles()) {

      }
    }
    // while(openList is not empty) {
    // * currentNode = pop from openHeap
    //   if currentNode is final, return the successful path
    //   * set currentNode as closed
    //   foreach neighbor of currentNode {
    //   * if neighbor is not set visited {
    //     * save g, h, and f then save the current parent and set visited
    //       * add neighbor to openHeap
    //     }
    //     if neighbor is in openList but the current g is better than previous g {
    //       save g and f, then save the current parent
    //       * reset position in openHeap (since f changed)
    //     }
    //   }
  }

}

/** Randomize array elements order */
var shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

/** Check if a puzzle is solvable */
var isSolvable = (arr: Tile[]) => {
  let invCount = 0;
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = i + 1; j < arr.length - 1; j++)
      if (arr[j].index > arr[i].index)
        invCount++;
  return invCount % 2 == 0;
};

/** Highlight or log available tiles to move */
var highlightTile = (availableTiles) => {
  console.log("Tiles to switch");
  availableTiles.map((e) => {
    console.log(e.goal.index + " ");
  });
};

/** prefix repo path for deploying purpose only */
var prefixPath = (path) => {
  return '8puzzle' + path;
};

