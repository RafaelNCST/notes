import React from 'react';
import {
  CalendarContainer,
  CalendarHeaderContainer,
  CalendarShortNameDaysContainer,
} from './styles';
import { HeaderMenu } from '../../../../components';
import { Calendar_Itens } from './data';

export const Calendar = () => {
  return (
    <CalendarContainer>
      <CalendarHeaderContainer>
        <HeaderMenu textDate="Novembro"></HeaderMenu>
        <CalendarShortNameDaysContainer></CalendarShortNameDaysContainer>
      </CalendarHeaderContainer>
    </CalendarContainer>
  );
};
