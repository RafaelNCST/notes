import React, { createContext, useState } from 'react';
import { mainContextTypes } from './types';

export const MainContext = createContext({} as mainContextTypes);

interface Props {
  children: React.ReactNode;
}

export const MainContextProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(false);

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
      {children}
    </MainContext.Provider>
  );
};
