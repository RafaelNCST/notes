import { Dispatch, SetStateAction } from 'react';

export interface PropsChildren {
  children: React.ReactNode;
}

export type languages = 'Português(BR)' | 'English';

export interface mainContextTypes {
  theme: number;
  setTheme: Dispatch<SetStateAction<number>>;
  setAutomaticEraseEventsPastDays: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<languages>>;
  language: languages;
  automaticEraseEventsPastDays: boolean;
  loading: boolean;
  saveLanguage: (item: languages) => void;
}
