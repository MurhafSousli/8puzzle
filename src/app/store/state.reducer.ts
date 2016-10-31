import {ActionReducer, Action} from '@ngrx/store';
import {GameState} from "../state/state.class";

// var initialState = {
//   nodes: [],
//   goalTest: false
// };

export const stateReducer: ActionReducer<GameState> = (state: GameState, action: Action) => {
  switch (action.type) {
    default:
      console.log(action.payload);
      return action.payload || state;
  }
};

