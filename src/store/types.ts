import { Store } from '.';

export interface eventsProps {
  circle: string;
  title: string;
  category: string;
  time: string;
  date: string;
  description: string;
}

export interface InitialStateProps {
  data: Array<eventsProps>;
}

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
