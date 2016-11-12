export class Tile {
  index: number;
  location: Location;

  constructor(i: number, loc: Location) {
    this.index = i;
    this.location = loc;
  }
}

export class Location {
  constructor(public top: number, public left: number) {
  }
}

