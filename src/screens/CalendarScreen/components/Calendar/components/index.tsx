import React, { Dispatch, SetStateAction, memo } from 'react';
import { CardDay, ContainerBadges, Badge } from './styles';
import { useAppSelector } from '../../../../../store/hooks/useAppSelector';
import { DATE_LOCAL_LIST } from '../../../../../utils';
import { TextRegular } from '../styles';

interface ItemsListCalendarProps {
  actualDay: string;
  clickedDay: string;
  setClickedDay: Dispatch<SetStateAction<string>>;
  item: string;
  actualMonth: number;
  dateTypeLocal: string;
}

let count = 0;

export const ItemsListCalendar: React.FC<ItemsListCalendarProps> = memo(
  ({
    actualDay,
    clickedDay,
    setClickedDay,
    item,
    actualMonth,
    dateTypeLocal,
  }) => {
    const dataEvents = useAppSelector(store => store.Events.data);

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

    console.log(count++, clickedDay);

    return (
      <CardDay
        onPress={() => setClickedDay(item)}
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
