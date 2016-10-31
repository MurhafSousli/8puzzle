export class GameState{
  states;
  initialState;
  actions;
  transitionModel;
  goalTest;
  pathCost;
}

/** State Description:

 *  States: A state description specifies the location of each of the eight tiles and the blank in one of the nine squares

 *  Initial state: Any state can be designated as the initial state. Note that any given goal can be reached from exactly half of
    the possible initial states

 *  Actions:  The simplest formulation defines the actions as movements of the blank space Left, Right, Up, or Down.
    Different subsets of these are possible depending on where the blank is.

 *  Transition model: Given a state and action, this returns the resulting state

 *  Goal test: This checks whether the state matches the goal configuration

 * Path cost: Each step costs 1, so the path cost is the number of steps in the path

 */
