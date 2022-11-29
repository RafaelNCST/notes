import React, { useState } from 'react';
import {
  CalendarContainer,
  CalendarShortNameDaysContainer,
  ContainerNameDay,
  TextRegular,
  CardDay,
} from './styles';
import moment from 'moment';
import momentz from 'moment-timezone';
import { ConsumerMainContext } from '../../../../contexts/consumer';
import { HeaderMenu } from '../../../../components';
import { DATA_MASK_MONTH, February } from '../../../../helpers';
import { Calendar_Itens, DaysNumber } from './data';
import { FlatList } from 'react-native';

export const Calendar = () => {
  const { timezone } = ConsumerMainContext();

  moment.locale('en');
  const momentNow = momentz.tz(timezone);
  const actualMonth = momentNow.format('MM');
  const actualYear = momentNow.format('YYYY');
  const dayOfWeekNumber = moment(`${actualYear}-${actualMonth}-01`).weekday();

  const [arrayDaysInMonth, setArrayDaysInMonth] = useState(
    new Array(42).fill(0),
  );
  const [pastMaxDaysInMonth, setPastMaxDaysInMonth] = useState(
    parseInt(DATA_MASK_MONTH[actualMonth], 10) - 1,
  );
  const [actualMaxDaysInMonth, setActualMaxDaysInMonth] = useState(
    parseInt(DATA_MASK_MONTH[actualMonth], 10),
  );

  const getMaxDaysInMonth = () => {
    if (pastMaxDaysInMonth === 2) {
      setPastMaxDaysInMonth(parseInt(February(actualYear), 10));
    } else {
      setPastMaxDaysInMonth(parseInt(DATA_MASK_MONTH[actualMonth], 10));
    }

    if (actualMaxDaysInMonth === 2) {
      setActualMaxDaysInMonth(parseInt(February(actualYear), 10));
    } else {
      setActualMaxDaysInMonth(parseInt(DATA_MASK_MONTH[actualMonth], 10));
    }
  };

  getMaxDaysInMonth();

  const switchGetArrayDays = () => {
    let finalArray = [];
    switch (dayOfWeekNumber) {
      case 0:
        finalArray = arrayDaysInMonth.map(() => {
          let actualItem = 1;
          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return actualItem;
        });
        break;
      case 1:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;

          if (index === 0) {
            return item + pastMaxDaysInMonth;
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
      case 2:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;

          if (index === 0) {
            return item + pastMaxDaysInMonth;
          } else if (index === 1) {
            return item + (pastMaxDaysInMonth - 1);
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
      case 3:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;
          let pastDayMonth = pastMaxDaysInMonth;

          if (index === 0) {
            return item + pastDayMonth;
          } else if (index <= 2) {
            pastDayMonth = pastDayMonth - 1;
            return item + pastDayMonth;
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
      case 4:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;
          let pastDayMonth = pastMaxDaysInMonth;

          if (index === 0) {
            return item + pastDayMonth;
          } else if (index <= 3) {
            pastDayMonth = pastDayMonth - 1;
            return item + pastDayMonth;
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
      case 5:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;
          let pastDayMonth = pastMaxDaysInMonth;

          if (index === 0) {
            return item + pastDayMonth;
          } else if (index <= 4) {
            pastDayMonth = pastDayMonth - 1;
            return item + pastDayMonth;
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
      case 6:
        finalArray = arrayDaysInMonth.map((item, index) => {
          let actualItem = 1;
          let pastDayMonth = pastMaxDaysInMonth;

          if (index === 0) {
            return item + pastDayMonth;
          } else if (index <= 5) {
            pastDayMonth = pastDayMonth - 1;
            return item + pastDayMonth;
          }

          if (actualItem === actualMaxDaysInMonth) {
            actualItem = 0;
            actualItem + 1;
          } else {
            actualItem + 1;
          }
          return item + actualItem;
        });
        break;
    }

    setArrayDaysInMonth(finalArray);
    console.log(finalArray);
  };

  switchGetArrayDays();

  return (
    <CalendarContainer>
      <HeaderMenu
        textDate="Novembro"
        iconLeft="arrow-back-ios"
        iconRight="arrow-forward-ios"
      />
      <CalendarShortNameDaysContainer>
        <ContainerNameDay>
          <TextRegular>Dom</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Seg</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Ter</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Qua</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Qui</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Sex</TextRegular>
        </ContainerNameDay>
        <ContainerNameDay>
          <TextRegular>Sab</TextRegular>
        </ContainerNameDay>
      </CalendarShortNameDaysContainer>
      <FlatList
        data={DaysNumber}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={7}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return (
            <CardDay>
              <TextRegular>{item}</TextRegular>
            </CardDay>
          );
        }}
      />
    </CalendarContainer>
  );
};
