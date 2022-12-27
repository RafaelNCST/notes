import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { eventsProps } from '../store/types';
import '../helpers/i18n';
import { mainContextTypes, PropsChildren } from './types';
import { useTranslation } from 'react-i18next';
import { DEFAULT_VALUES } from './defaultValues';
import moment from 'moment';
import { arrayDaysInMonthType } from './types';
import { LANGUAGE_LIST, DATE_LOCAL_LIST } from '../utils';

export const MainContext = createContext({} as mainContextTypes);

export const MainContextProvider: React.FC<PropsChildren> = ({ children }) => {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<number>(DEFAULT_VALUES.THEME);
  const [automaticEraseEventsPastDays, setAutomaticEraseEventsPastDays] =
    useState<boolean>(DEFAULT_VALUES.AUTOMATIC_ERASE_PAST_EVENTS);
  const [language, setLanguage] = useState<string>(DEFAULT_VALUES.LANGUAGE[0]);
  const [timeformat, setTimeFormat] = useState<string>(
    DEFAULT_VALUES.TIME_FORMAT,
  );
  const [timezone, setTimeZone] = useState<string>(DEFAULT_VALUES.TIME_ZONE);
  const [dateTypeLocal, setDateTypeLocal] = useState<string>(
    DEFAULT_VALUES.DATE_TYPE_LOCAL[0],
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

  const saveLanguage = (item: string) => {
    const chooseLanguage = LANGUAGE_LIST[item];
    i18n.changeLanguage(chooseLanguage);
    const arrayLanguage = [item, chooseLanguage];
    AsyncStorage.setItem('@Language', JSON.stringify(arrayLanguage));
  };

  const saveDateTypeLocal = (item: string) => {
    const chooseDateTypeLocal = DATE_LOCAL_LIST[item];
    setDateTypeLocal(item);
    const arrayDateTypeLocal = [item, chooseDateTypeLocal];
    AsyncStorage.setItem('@dateTypeLocal', JSON.stringify(arrayDateTypeLocal));
  };

  const saveTimeFormat = (item: string) => {
    setTimeFormat(item);
    AsyncStorage.setItem('@timeFormat', item);
  };

  const saveTimeZone = (item: string) => {
    AsyncStorage.setItem('@timeZone', item);
  };

  const getSettingsInformations = async () => {
    const stringTheme = await AsyncStorage.getItem('@Theme');
    const stringAutomaticErasePastDays = await AsyncStorage.getItem(
      '@AutomaticErasePastDays',
    );
    const stringLanguage = await AsyncStorage.getItem('@Language');
    const stringDateTypeLocal = await AsyncStorage.getItem('@dateTypeLocal');
    const stringTimeFormat = await AsyncStorage.getItem('@timeFormat');
    const stringTimeZone = await AsyncStorage.getItem('@timeZone');

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
    if (stringDateTypeLocal) {
      setDateTypeLocal(JSON.parse(stringDateTypeLocal as string)[0]);
    }
    if (stringTimeFormat) {
      setTimeFormat(stringTimeFormat);
    }
    if (stringTimeZone) {
      setTimeZone(stringTimeZone);
    }

    setFirstrun(false);
    setLoading(false);
  };

  const formatDateByLanguage = (day: number, month: number, year: number) => {
    return DATE_LOCAL_LIST[dateTypeLocal] === 'en'
      ? `${String(month).padStart(2, '0')}/${day}/${year}`
      : `${day}/${String(month).padStart(2, '0')}/${year}`;
  };

  const getDaysInMonth = (
    quantPastMonth: number,
    quantActualMonth: number,
    firstDayOfWeek: number,
    month: number,
    year: number,
  ) => {
    let auxArray = new Array(42).fill(0);
    let pastMonthArray: number[] = [];
    let finalPastArray: string[] = [];
    let quantPastDaysMonth = quantPastMonth - firstDayOfWeek;

    if (firstDayOfWeek !== 0) {
      let auxPastArray = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      pastMonthArray = auxPastArray.filter(item => {
        if (item > quantPastDaysMonth && item <= quantPastMonth) {
          return item;
        }
      });
    }

    finalPastArray = pastMonthArray.map((item: number) => {
      if (month === 1) {
        return formatDateByLanguage(item, 12, year - 1);
      } else {
        return formatDateByLanguage(item, month - 1, year);
      }
    });

    let countAuxDays = 0;

    const finalArray = auxArray.map((item, index) => {
      if (finalPastArray[index] !== undefined) {
        return finalPastArray[index];
      } else if (
        index >= finalPastArray.length &&
        index < quantActualMonth + finalPastArray.length
      ) {
        return formatDateByLanguage(
          index - finalPastArray.length + 1,
          month,
          year,
        );
      } else {
        countAuxDays = countAuxDays + 1;
        if (month === 12) {
          return formatDateByLanguage(countAuxDays, 1, year + 1);
        } else {
          return formatDateByLanguage(countAuxDays, month + 1, year);
        }
      }
    });

    return finalArray;
  };

  const handleDaysInMonthArray = () => {
    let calendarYear = 1969;
    let arrayMonths: arrayDaysInMonthType = {};
    while (calendarYear < moment().year() + 10) {
      calendarYear = calendarYear + 1;
      arrayMonths[calendarYear] = {
        0: getDaysInMonth(
          moment(`${calendarYear - 1}-${12}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').weekday(),
          1,
          calendarYear,
        ),
        1: getDaysInMonth(
          moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').weekday(),
          2,
          calendarYear,
        ),
        2: getDaysInMonth(
          moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').weekday(),
          3,
          calendarYear,
        ),
        3: getDaysInMonth(
          moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').weekday(),
          4,
          calendarYear,
        ),
        4: getDaysInMonth(
          moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').weekday(),
          5,
          calendarYear,
        ),
        5: getDaysInMonth(
          moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').weekday(),
          6,
          calendarYear,
        ),
        6: getDaysInMonth(
          moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').weekday(),
          7,
          calendarYear,
        ),
        7: getDaysInMonth(
          moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').weekday(),
          8,
          calendarYear,
        ),
        8: getDaysInMonth(
          moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').weekday(),
          9,
          calendarYear,
        ),
        9: getDaysInMonth(
          moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').weekday(),
          10,
          calendarYear,
        ),
        10: getDaysInMonth(
          moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').weekday(),
          11,
          calendarYear,
        ),
        11: getDaysInMonth(
          moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${12}-01`, 'YYYY-MM-DD').daysInMonth(),
          moment(`${calendarYear}-${12}-01`, 'YYYY-MM-DD').weekday(),
          12,
          calendarYear,
        ),
      };
    }

    return arrayMonths;
  };

  let arrayDaysInMonth: arrayDaysInMonthType = handleDaysInMonthArray();

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
        dateTypeLocal,
        setDateTypeLocal,
        saveDateTypeLocal,
        timeformat,
        setTimeFormat,
        saveTimeFormat,
        timezone,
        setTimeZone,
        saveTimeZone,
        arrayDaysInMonth,
      }}>
      {children}
    </MainContext.Provider>
  );
};
