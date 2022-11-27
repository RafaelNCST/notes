import { Dispatch, SetStateAction } from 'react';
import { ITEM_TYPES, ITEM_CIRCLE_TYPES } from '../../../utils';
import { eventsProps } from '../../../store/types';

export interface ContentProps {
  id?: string | undefined;
  time?: string | undefined;
  description?: string | undefined;
  category?: ITEM_TYPES | undefined;
  date?: string | undefined;
  circle?: ITEM_CIRCLE_TYPES | undefined;
  title?: string | undefined;
  assistTimeFormat?: string | undefined;
}

export interface ContentEditProps {
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
}
