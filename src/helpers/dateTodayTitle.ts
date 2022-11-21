import { MONTHS, MONTHS_ENGLISH } from '../utils';
import { languages } from '../contexts/types';
import 'moment/locale/pt-br';
import moment from 'moment';
import momentz from 'moment-timezone';

moment.locale('pt-br');

export const GET_TITLE_DATE_TODAY = (language: languages) => {
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
