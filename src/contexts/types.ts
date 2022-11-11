import { Dispatch, SetStateAction } from 'react';

export interface PropsChildren {
  children: React.ReactNode;
}
export interface mainContextTypes {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
