import { ActionReducer, Action } from '@ngrx/store';
import {GameState} from "../state/state.class";

export const stateReducer: ActionReducer<GameState> = (state: GameState, action: Action) => {
  switch (action.type) {
    default:
      return action.payload || state;
  }
};
