import { MONTHS, MONTHS_ENGLISH } from '../utils';
import momentz from 'moment-timezone';

export const GET_TITLE_DATE_TODAY = (language: string) => {
  const actualMoment = momentz.tz('America/Manaus');
  switch (language) {
    case 'Português(BR)':
      return `${actualMoment.format('DD')} de ${
        MONTHS[actualMoment.format('MM')]
      } de ${actualMoment.format('YYYY')}`;
    case 'English':
      return `${
        MONTHS_ENGLISH[actualMoment.format('MM')]
      } ${actualMoment.format('DD')}th, ${actualMoment.format('YYYY')}`;
  }
};
