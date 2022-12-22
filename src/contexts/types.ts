import { Dispatch, SetStateAction } from 'react';

export interface PropsChildren {
  children: React.ReactNode;
}

export interface arrayDaysInMonthType {
  [unit: number]: {
    [unit: string]: string[];
  };
}

export interface mainContextTypes {
  theme: number;
  setTheme: Dispatch<SetStateAction<number>>;
  setAutomaticEraseEventsPastDays: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  language: string;
  automaticEraseEventsPastDays: boolean;
  loading: boolean;
  dateTypeLocal: string;
  setDateTypeLocal: Dispatch<SetStateAction<string>>;
  saveLanguage: (item: string) => void;
  saveDateTypeLocal: (item: string) => void;
  timeformat: string;
  setTimeFormat: Dispatch<SetStateAction<string>>;
  saveTimeFormat: (item: string) => void;
  timezone: string;
  setTimeZone: Dispatch<SetStateAction<string>>;
  saveTimeZone: (item: string) => void;
  arrayDaysInMonth: arrayDaysInMonthType;
}
