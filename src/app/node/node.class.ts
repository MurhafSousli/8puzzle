
export class Node {
  goalLocation: Location;
  location: Location;
  isBlank: boolean;

  constructor(loc: Location, nodeWidth: number) {
    this.goalLocation = loc;
    this.location =  Object.assign({}, loc);
    this.isBlank = this.goalLocation.left === nodeWidth*2 && this.goalLocation.top === nodeWidth*2;
  }

  goal = () => {
    return this.location.left === this.goalLocation.left && this.location.top === this.goalLocation.top;
  };
}

export class Location {
  constructor(public top: number, public left: number) {
  }
}
