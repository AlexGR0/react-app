import { Action } from 'redux';

export interface CustomAction<T = any> extends Action<string> {
  payload?: T;
}
