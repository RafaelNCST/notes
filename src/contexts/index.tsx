import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { eventsProps } from '../store/types';
import { mainContextTypes, PropsChildren, languages } from './types';

export const MainContext = createContext({} as mainContextTypes);

export const MainContextProvider: React.FC<PropsChildren> = ({ children }) => {
  const [theme, setTheme] = useState<number>(-2);
  const [automaticEraseEventsPastDays, setAutomaticEraseEventsPastDays] =
    useState<boolean>(false);
  const [language, setLanguage] = useState<languages>('Português(BR)');
  const [firstRun, setFirstrun] = useState<boolean>(true);

  const deleteEventPastDays = async () => {
    const dateNow = new Date();
    const month = dateNow.getMonth() + 1;
    const day = dateNow.getDate();
    const year = dateNow.getDate();
    const stringArray = await AsyncStorage.getItem('@ArrayEvents');
    const parsedArray = JSON.parse(stringArray as string);

    const newArray = parsedArray.filter((item: eventsProps) => {
      if (
        (item.date && parseInt(item.date.split('/')[2], 10) > year) ||
        (item.date &&
          parseInt(item.date.split('/')[2], 10) === year &&
          item.date &&
          parseInt(item.date.split('/')[1], 10) > month) ||
        (item.date &&
          parseInt(item.date.split('/')[2], 10) === year &&
          parseInt(item.date.split('/')[1], 10) === month &&
          parseInt(item.date.split('/')[0], 10) >= day)
      ) {
        return item;
      }
    });

    const stringNewArray = JSON.stringify(newArray);

    AsyncStorage.setItem('@ArrayEvents', stringNewArray);
  };

  const saveAutomaticErasePastDays = () => {
    AsyncStorage.setItem(
      '@AutomaticErasePastDays',
      JSON.stringify(automaticEraseEventsPastDays),
    );
    console.log(automaticEraseEventsPastDays, 'salvo');
  };

  const saveTheme = () => {
    AsyncStorage.setItem('@Theme', JSON.stringify(theme));
    console.log(theme, 'salvo');
  };

  const getSettingsInformations = async () => {
    const stringTheme = await AsyncStorage.getItem('@Theme');
    const stringAutomaticErasePastDays = await AsyncStorage.getItem(
      '@AutomaticErasePastDays',
    );

    setTheme(JSON.parse(stringTheme as string));
    setAutomaticEraseEventsPastDays(
      JSON.parse(stringAutomaticErasePastDays as string),
    );

    console.log(JSON.parse(stringTheme as string), 'pego');
    console.log(JSON.parse(stringAutomaticErasePastDays as string), 'pego');
    setFirstrun(false);
  };

  useEffect(() => {
    if (automaticEraseEventsPastDays) {
      deleteEventPastDays();
    }
    getSettingsInformations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstRun) {
      saveTheme();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (!firstRun) {
      saveAutomaticErasePastDays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [automaticEraseEventsPastDays]);

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
        setAutomaticEraseEventsPastDays,
        setLanguage,
        language,
        automaticEraseEventsPastDays,
      }}>
      {children}
    </MainContext.Provider>
  );
};
