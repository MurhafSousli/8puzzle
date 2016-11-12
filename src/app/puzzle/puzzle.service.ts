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
    '../../assets/dog.jpg',
    '../../assets/adriana.jpg',
    '../../assets/romance.jpg',
    '../../assets/tiger.jpg',
    '../../assets/cartoon1.jpg',
    '../../assets/cartoon2.jpg',
    '../../assets/cartoon3.jpg'
  ];

  constructor(private store: Store<GameState>) {
  }

  initialize() {
      this.puzzleImage = this.images[0];
      /** prepare the goal state with indexes and proper locations */
      let i = 0;
      for (let top = 0; top < this.tileSize * 3; top += this.tileSize)
        for (let left = 0; left < this.tileSize * 3; left += this.tileSize)
          this._prepTiles.push(new Tile(++i, new Location(top, left)));
      this.mapNodes();
  }

  mapNodes() {
    /** fill nodes with locations */
    this.tiles = [];
    this._prepTiles.map((node)=> {
      this.tiles.push(new PuzzleTile(node, this.tileSize));
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
  move(node: PuzzleTile) {
    let blank = this._getBlankTile();
    let blankLoc = this._getBlankTile().current.location;
    let nodeLoc = node.current.location;
    /** Check Horizontally */
    if (nodeLoc.top === blankLoc.top) {
      if (nodeLoc.left - blankLoc.left === this.tileSize) {
        console.log('Left');
      }
      else if (blankLoc.left - nodeLoc.left === this.tileSize) {
        console.log('Right');
      }
      else {
        console.log("Can't move this, too far");
        return;
      }
    }
    /** Check Vertically */
    else if (nodeLoc.left === blankLoc.left) {
      if (nodeLoc.top - blankLoc.top === this.tileSize) {
        console.log('Top');
      }
      else if (blankLoc.top - nodeLoc.top === this.tileSize) {
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
    let temp = node.current;
    node.current = blank.current;
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
    for (let i = 0; i < this._prepTiles.length; i++) {
      this.tiles[i].current = this._prepTiles[i];
    }
    /** Keep shuffling until getting a solvable puzzle */
    if (!this._isSolvable()) {
      this.shuffle();
    }
    this.updateState();
  }

  /** Get blank tile  */
  private _getBlankTile() {
    return this.tiles[8];
  }

  /** Check if puzzle is solvable */
  private _isSolvable() {
    let invCount = 0;
    for (let i = 0; i < this.tiles.length - 1; i++)
      for (let j = i + 1; j < this.tiles.length - 1; j++)
        if (this.tiles[j].current.index > this.tiles[i].current.index)
          invCount++;
    return invCount % 2 == 0;
  }

  /** Check if game is over */
  private _goalTest() {
    for (let node of this.tiles) {
      let goal = node.isGoal();
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
    let availableNodes = [];
    /** Horizontal availability */
    if (blankLoc.left === this.tileSize) {
      //left & right
      availableNodes.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
      availableNodes.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    }
    else if (blankLoc.left < this.tileSize) {
      //right
      availableNodes.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    }
    else {
      //left
      availableNodes.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
    }
    /** Vertical availability */
    if (blankLoc.top === this.tileSize) {
      //top & bottom
      availableNodes.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
      availableNodes.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    }
    else if (blankLoc.top < this.tileSize) {
      //bottom
      availableNodes.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    }
    else {
      //top
      availableNodes.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
    }
    highlightNode(availableNodes);
    return availableNodes;
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


var highlightNode = (availableNodes) => {
  console.log("Tiles to switch");
  availableNodes.map((e) => {
    console.log(e.goal.index + " ");
  });
};

