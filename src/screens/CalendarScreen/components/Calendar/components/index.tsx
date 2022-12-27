import React, { memo } from 'react';
import { CardDay, ContainerBadges, Badge } from './styles';
import { DATE_LOCAL_LIST } from '../../../../../utils';
import { eventsProps } from '../../../../../store/types';
import { TextRegular } from '../styles';

interface ItemsListCalendarProps {
  actualDay: string;
  clickedDay: string;
  handleChangeDate: (item: string) => void;
  item: string;
  actualMonth: number;
  dateTypeLocal: string;
  dataEvents: eventsProps[];
}

let count = 0;

export const ItemsListCalendar: React.FC<ItemsListCalendarProps> = memo(
  ({
    actualDay,
    clickedDay,
    handleChangeDate,
    item,
    actualMonth,
    dateTypeLocal,
    dataEvents,
  }) => {
    const compareEventsInDay = (numberToCompare: string) => {
      return dataEvents.some(events => events.date === numberToCompare);
    };

    const formatedDay =
      DATE_LOCAL_LIST[dateTypeLocal] === 'en'
        ? item.split('/')[1]
        : item.split('/')[0];

    const formatedMonth = parseInt(
      DATE_LOCAL_LIST[dateTypeLocal] === 'en'
        ? item.split('/')[0]
        : item.split('/')[1],
      10,
    );

    console.log(count++, 'render');

    return (
      <CardDay
        onPress={() => handleChangeDate(item)}
        clickedDay={clickedDay === item ? true : false}
        backGroundToday={actualDay === item ? true : false}>
        <ContainerBadges>
          {compareEventsInDay(item) ? <Badge /> : null}
        </ContainerBadges>
        <TextRegular
          outMonth={
            formatedMonth < actualMonth + 1 || formatedMonth > actualMonth + 1
              ? true
              : false
          }>
          {formatedDay}
        </TextRegular>
      </CardDay>
    );
  },
);
