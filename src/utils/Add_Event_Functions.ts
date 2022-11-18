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
};

export const confirmUniqueTitleName = (
  title: string | undefined,
  data: eventsProps[],
) => {
  for (let item of data) {
    if (title === item.title) {
      return true;
    }
  }

  return false;
};
