import React, { createContext, useState } from 'react';
import { mainContextTypes, PropsChildren } from './types';

export const MainContext = createContext({} as mainContextTypes);

export const MainContextProvider: React.FC<PropsChildren> = ({ children }) => {
  const [theme, setTheme] = useState(false);

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
      {children}
    </MainContext.Provider>
  );
};
