import { ITEM_TYPES, ITEM_CIRCLE_TYPES } from '../utils';

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailsEvent: {
    id: string | undefined;
    title: string | undefined;
    time: string | undefined;
    description: string | undefined;
    circle: ITEM_CIRCLE_TYPES | undefined;
    category: ITEM_TYPES | undefined;
    date: string | undefined;
    assistTimeFormat: string | undefined;
  };
  SettingsScreen: undefined;
  CalendarScreen: undefined;
};
