import { Dispatch, SetStateAction } from 'react';
import { typeError, typeWarning } from '../screens/AddEventModal';
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

const confirmUniqueID = (
  arrayEvents: eventsProps,
  data: eventsProps[],
  limitQuantity: number,
) => {
  const { date, title, time } = arrayEvents;
  const lenghtDataDuplicatedName = data.filter(
    item => title === item.title && date === item.date && time === item.time,
  );

  if (lenghtDataDuplicatedName.length >= limitQuantity) {
    return true;
  } else {
    return false;
  }
};

const confirmUniqueTimeAndDay = (
  arrayEvents: eventsProps,
  data: eventsProps[],
  limitQuantity: number,
) => {
  const { date, time } = arrayEvents;
  const lenghtDataDuplicatedName = data.filter(
    item => time === item.time && date === item.date,
  );

  if (lenghtDataDuplicatedName.length >= limitQuantity) {
    return true;
  } else {
    return false;
  }
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
  limitQuantity: number,
  setWarning: Dispatch<SetStateAction<typeWarning>>,
) => {
  if (confirmUniqueTimeAndDay(arrayEvents, data, limitQuantity)) {
    setWarning('DUPLICATED_TIME_DATE');
    return true;
  } else if (confirmUniqueTitleName(arrayEvents.title, data, limitQuantity)) {
    setWarning('DUPLICATED_TITLE');
    return true;
  }
};

export const checkErrors = (
  arrayEvents: eventsProps,
  setArrayBlankError: Dispatch<SetStateAction<string[]>>,
  data: eventsProps[],
  limitQuantity: number,
  setError: Dispatch<SetStateAction<typeError>>,
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
    setError('BLANK');
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
  } else if (confirmUniqueID(arrayEvents, data, limitQuantity)) {
    setError('DUPLICATED_ID');
    return true;
  } else {
    return false;
  }
};
