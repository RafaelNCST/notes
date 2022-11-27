import { ITEM_TYPES, ITEM_CIRCLE_TYPES } from '../utils';
import { Store } from '.';

export interface eventsProps {
  id?: string;
  circle?: ITEM_CIRCLE_TYPES;
  title?: string;
  category?: ITEM_TYPES;
  time?: string;
  date?: string;
  description?: string;
  assistTimeFormat?: string;
}

export interface InitialStateProps {
  data: Array<eventsProps>;
  reload?: boolean;
}

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
