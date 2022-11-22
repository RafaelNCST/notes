import { Dispatch, SetStateAction } from 'react';
import { eventsProps } from '../store/types';

export const handleConfirmOrganizationMaskInputs = (
  arrayEvents: eventsProps,
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>,
) => {
  const date = new Date();
  const year = date.getFullYear();
  const inputDate = arrayEvents.date?.split('/');
  const [inputDay, inputMonth, inputYear] = inputDate || [];
  const inputTime = arrayEvents.time?.split(':');
  const [inputHour, inputSeconds] = inputTime || [];

  if (
    inputDay.length === 1 ||
    inputMonth.length === 1 ||
    inputYear.length === 1
  ) {
    setArrayEvents(prevState => ({
      ...prevState,
      date: `${inputDay.length === 1 ? '0' + inputDay : inputDay}/${
        inputMonth.length === 1 ? '0' + inputMonth : inputMonth
      }/${inputYear.length <= 3 ? year : inputYear}`,
    }));
  }

  if (inputHour.length === 1 || inputSeconds.length === 1) {
    setArrayEvents(prevState => ({
      ...prevState,
      time: `${inputHour.length === 1 ? '0' + inputHour : inputHour}:${
        inputSeconds.length === 1 ? '0' + inputSeconds : inputSeconds
      }`,
    }));
  }

  return true;
};

const confirmUniqueTitleName = (
  title: string | undefined,
  data: eventsProps[],
  limitQuantity: number,
) => {
  const lenghtDataDuplicatedName = data.filter(item => title === item.title);

  if (lenghtDataDuplicatedName.length >= limitQuantity) {
    return true;
  } else {
    return false;
  }
};

export const checkWarnings = (
  arrayEvents: eventsProps,
  data: eventsProps[],
  limityQuantity: number,
) => {
  if (confirmUniqueTitleName(arrayEvents.title, data, limityQuantity)) {
    return true;
  } else {
    return false;
  }
};

export const checkErrors = (
  arrayEvents: eventsProps,
  setArrayBlankError: Dispatch<SetStateAction<string[]>>,
) => {
  setArrayBlankError([]);
  if (
    arrayEvents.circle === 'white' ||
    arrayEvents.category === '' ||
    arrayEvents.date === '' ||
    arrayEvents.date === '//' ||
    arrayEvents.time === '' ||
    arrayEvents.time === ':' ||
    arrayEvents.title === ''
  ) {
    if (arrayEvents.circle === 'white') {
      setArrayBlankError(['Círculo de urgência']);
    }

    if (arrayEvents.category === '') {
      setArrayBlankError(prev => [...prev, 'Categoria']);
    }

    if (arrayEvents.date === '' || arrayEvents.date === '//') {
      setArrayBlankError(prev => [...prev, 'Data']);
    }

    if (arrayEvents.time === '' || arrayEvents.time === ':') {
      setArrayBlankError(prev => [...prev, 'Horário']);
    }

    if (arrayEvents.title === '') {
      setArrayBlankError(prev => [...prev, 'Título']);
    }
    return true;
  } else {
    return false;
  }
};
