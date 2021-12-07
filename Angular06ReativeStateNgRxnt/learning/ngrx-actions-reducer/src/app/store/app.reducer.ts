import { Action, createReducer, on } from '@ngrx/store';
import { IFruit } from '../interfaces/fruit.interface';
import * as AppActions from './app.actions';

export interface AppState {
  bucket: IFruit[];
}

const initialState: AppState = {
  bucket: [],
};

const appReducer = createReducer(
  initialState,
  on(AppActions.addItemToBucket, (state, fruit) => ({
    ...state,
    bucket: [fruit, ...state.bucket],
  })),
  on(AppActions.removeItemFromBucket, (state, fruit) => {
    return {
      ...state,
      bucket: state.bucket.filter((bucketItem) => {
        return bucketItem.id !== fruit.id;
      }),
    };
  })
);
export function reducer(state: AppState = initialState, action: Action) {
  console.log('state', state);
  console.log('action', action);
  return appReducer(state, action);
}
