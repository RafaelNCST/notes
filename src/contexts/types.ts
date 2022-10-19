import { Dispatch, SetStateAction } from 'react';

export interface mainContextTypes {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
