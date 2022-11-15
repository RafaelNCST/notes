import { Dispatch, SetStateAction } from 'react';
import { eventsProps } from '../../../store/types';

export interface ContentProps {
  time: string | undefined;
  description: string | undefined;
  category: string | undefined;
  date: string | undefined;
  circle: string | undefined;
  title: string | undefined;
}

export interface ContentEditProps {
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
}
