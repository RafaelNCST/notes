import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { eventsProps } from '../store/types';
import '../helpers/i18n';
import { mainContextTypes, PropsChildren, languages } from './types';
import { useTranslation } from 'react-i18next';
import { DEFAULT_VALUES } from './defaultValues';
import { LANGUAGE_LIST } from '../utils/languagesTypes';

export const MainContext = createContext({} as mainContextTypes);

export const MainContextProvider: React.FC<PropsChildren> = ({ children }) => {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<number>(DEFAULT_VALUES.THEME);
  const [automaticEraseEventsPastDays, setAutomaticEraseEventsPastDays] =
    useState<boolean>(DEFAULT_VALUES.AUTOMATIC_ERASE_PAST_EVENTS);
  const [language, setLanguage] = useState<languages>(
    DEFAULT_VALUES.LANGUAGE[0],
  );
  const [firstRun, setFirstrun] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

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

  const saveTheme = () => {
    AsyncStorage.setItem('@Theme', JSON.stringify(theme));
  };

  const saveAutomaticErasePastDays = () => {
    AsyncStorage.setItem(
      '@AutomaticErasePastDays',
      JSON.stringify(automaticEraseEventsPastDays),
    );
  };

  const saveLanguage = (item: languages) => {
    const chooseLanguage = LANGUAGE_LIST[item];
    i18n.changeLanguage(chooseLanguage);
    const arrayLanguage = [item, chooseLanguage];
    AsyncStorage.setItem('@Language', JSON.stringify(arrayLanguage));
  };

  const getSettingsInformations = async () => {
    const stringTheme = await AsyncStorage.getItem('@Theme');
    const stringAutomaticErasePastDays = await AsyncStorage.getItem(
      '@AutomaticErasePastDays',
    );
    const stringLanguage = await AsyncStorage.getItem('@Language');

    if (stringTheme) {
      setTheme(JSON.parse(stringTheme as string));
    }
    if (stringAutomaticErasePastDays) {
      setAutomaticEraseEventsPastDays(
        JSON.parse(stringAutomaticErasePastDays as string),
      );
    }
    if (stringLanguage) {
      setLanguage(JSON.parse(stringLanguage as string)[0]);
      i18n.changeLanguage(JSON.parse(stringLanguage as string)[1]);
    }

    setFirstrun(false);
    setLoading(false);
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
        loading,
        saveLanguage,
      }}>
      {children}
    </MainContext.Provider>
  );
};
