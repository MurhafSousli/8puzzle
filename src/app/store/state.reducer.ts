import {ActionReducer, Action} from '@ngrx/store';
import {GameState} from "../state/state.class";

const INITIAL_STATE = {
  tiles: [],
  goal: false,
  image: '',
  tileSize: 105
};

export const stateReducer: ActionReducer<GameState> = (state: GameState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return action.payload || state;
  }
};
