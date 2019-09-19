import { createStore as reduxCreateStore } from "redux";

export interface AppState {}

export interface AppAction {
  type: string;
}

const reducer = (state: AppState = {}, action: AppAction) => {
  return state;
};

const initialState = { count: 0 };

export const createStore = () => reduxCreateStore(reducer, initialState);
