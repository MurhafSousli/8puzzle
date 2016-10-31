export class Node {
  public goalLocation: Location;
  public isBlank: boolean;

  constructor(public location: Location) {
    this.goalLocation = location;
    this.isBlank = this.goalLocation.left === 360 && this.goalLocation.top === 360;
  }

  public goal = () => {
    return this.location === this.goalLocation;
  };
}

export class Location {
  constructor(public top: number, public left: number) {
  }
}
