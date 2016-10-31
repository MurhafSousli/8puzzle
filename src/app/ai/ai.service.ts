import {Injectable} from '@angular/core';
import {Node, Location} from '../node/node.class';

@Injectable()
export class AiService {

  nodes: Node[];
  nodeWidth = 150;
  puzzleMap: Location[] = [];

  constructor() {
    /** prepare puzzle map */
    for (let top = 0; top < this.nodeWidth * 3; top += this.nodeWidth) {
      for (let left = 0; left < this.nodeWidth * 3; left += this.nodeWidth) {
        this.puzzleMap.push(new Location(top, left));
      }
    }
    this.mapNodes();
  }

  mapNodes() {
    this.nodes = [];
    for (let location of this.puzzleMap) {
      this.nodes.push(new Node(location, this.nodeWidth));
    }
  }

  goalTest() {
    for (let node of this.nodes) {
      let goal = node.goal();
      if (!goal) {
        console.log(goal);
        return goal;
      }
    }
    console.log(true);
    return true;
  }

  shuffle() {
    this.puzzleMap = shuffle(this.puzzleMap);
    for (let i = 0; i < this.puzzleMap.length; i++) {
      this.nodes[i].location = this.puzzleMap[i];
    }
  }

  getBlankNode() {
    return this.nodes[this.nodes.map((e) => { return e.isBlank }).indexOf(true)];
  }

  move(node: Node) {
    let blankLoc = this.getBlankNode().location;
    let nodeLoc = node.location;
    if (nodeLoc.top === blankLoc.top) {
      /** move left or right */
      if (nodeLoc.left - blankLoc.left === this.nodeWidth) {
        /** go left */
        console.log('Go Left');
      }
      else if (blankLoc.left - nodeLoc.left === this.nodeWidth) {
        /** go right */
        console.log('Go Right');
      }
      else{
        console.log("Can't move this, too far");
        return;
      }
      let temp = nodeLoc.left;
      nodeLoc.left = blankLoc.left;
      blankLoc.left = temp;
    }
    else if (nodeLoc.left === blankLoc.left) {
      /** move top or bottom */
      if (nodeLoc.top - blankLoc.top === this.nodeWidth){
        /** go top */
        console.log('Go Top');
      }
      else if(blankLoc.top - nodeLoc.top === this.nodeWidth){
        console.log('Go Bottom');
      }
      else {
        /** go bottom */
        console.log("Can't move this, too far");
        return;
      }
      let temp = nodeLoc.top;
      nodeLoc.top = blankLoc.top;
      blankLoc.top = temp;
    }
    else {
      console.log("You can't move this.");
      return;
    }
    console.log(node.goalLocation, node.location);
    this.submitState();
  }

  private submitState(){

    // this.store.dispatch({
    //   payload: {
    //     states: this.nodes,
    //     goalTest: this.goalTest()
    //   },
    //   type: ''
    // });
  }

}

var shuffle = (array) => {
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


function depthFirstSearch() {
  /**
   * Uses a stack
   * Follow a single path to the end
   * Push intersections on stack
   * Last intersection: different path
   */
  while (true) {
    curNode = stack.top();
    path.push(curNode.id);
    curNode.visited = true;
    if (curNode.id === targetNode.id) {
      break;
    }

    var unvisited = 0;
    curNode.adj.forEach((id)=> {
      let node = getNodeById(graph, id);
      if (!node.visited) {
        stack.push(node);
        unvisited += 1;
      }
    });

    if (unvisited === 0) {
      stack.pop();
    }
  }
}
