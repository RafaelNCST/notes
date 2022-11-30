import React, { useEffect, useState } from 'react';
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
import { Calendar_Itens } from './data';
import { FlatList } from 'react-native';

export const Calendar = () => {
  const { timezone } = ConsumerMainContext();

  moment.locale('en');
  const momentNow = momentz.tz(timezone);

  const [pastMonth, setPastMonth] = useState(
    parseInt(momentNow.format('MM'), 10) - 1,
  );
  const [actualMonth, setActualMonth] = useState(
    parseInt(momentNow.format('MM'), 10),
  );
  const [actualYear, setActualYear] = useState(momentNow.format('YYYY'));
  const [arrayDaysInMonth, setArrayDaysInMonth] = useState(
    new Array(42).fill(0),
  );
  const [pastQuantDaysMonth, setPastQuantDaysMonth] = useState<number>(0);
  const [actualQuantDaysMonth, setActualQuantDaysMonth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [outMonth, setOutMonth] = useState<number[]>([]);
  const [monthName, setMonthName] = useState(
    Calendar_Itens.monthNames[actualMonth - 1],
  );
  const firstDayOfWeek = moment(`${actualYear}-${actualMonth}-01`).weekday();

  const getMaxDaysInMonth = () => {
    if (pastMonth === 2) {
      setPastQuantDaysMonth(parseInt(February(actualYear), 10));
    } else {
      setPastQuantDaysMonth(parseInt(DATA_MASK_MONTH[String(pastMonth)], 10));
    }

    if (actualMonth === 2) {
      setActualQuantDaysMonth(parseInt(February(actualYear), 10));
    } else {
      setActualQuantDaysMonth(
        parseInt(DATA_MASK_MONTH[String(actualMonth)], 10),
      );
    }
  };

  const handleGetDaysInMonth = () => {
    let newArray = [];
    setOutMonth([]);
    if (firstDayOfWeek === 0) {
      newArray = arrayDaysInMonth.map((_, index: number) => {
        if (index + 1 > actualQuantDaysMonth) {
          setOutMonth(prev => [...prev, index]);
          return index - actualQuantDaysMonth + 1;
        } else {
          return index + 1;
        }
      });
    } else {
      let contDays = pastQuantDaysMonth - firstDayOfWeek;
      const arrayAux = arrayDaysInMonth.map((_, index: number) => {
        if (contDays <= pastQuantDaysMonth) {
          return contDays + (index + 1);
        }
      });
      newArray = arrayAux.map((item, index) => {
        if (item && item > pastQuantDaysMonth) {
          if (index - firstDayOfWeek >= actualQuantDaysMonth) {
            setOutMonth(prev => [...prev, index]);
            return index - firstDayOfWeek - actualQuantDaysMonth + 1;
          } else {
            return index - firstDayOfWeek + 1;
          }
        } else {
          setOutMonth(prev => [...prev, index]);
          return item;
        }
      });
    }
    setArrayDaysInMonth(newArray);
    setIsLoading(false);
  };

  const actionLeftArrowCalendar = () => {
    setPastMonth(prev => prev - 1);
    setMonthName(Calendar_Itens.monthNames[actualMonth - 2]);
    setActualMonth(prev => prev - 1);
  };

  const actionRightArrowCalendar = () => {
    setPastMonth(prev => prev + 1);
    setMonthName(Calendar_Itens.monthNames[actualMonth]);
    setActualMonth(prev => prev + 1);
  };

  useEffect(() => {
    getMaxDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualMonth]);

  useEffect(() => {
    handleGetDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualQuantDaysMonth]);

  return (
    <CalendarContainer>
      <HeaderMenu
        textDate={monthName}
        iconLeft="arrow-back-ios"
        iconRight="arrow-forward-ios"
        actionLeftButton={actionLeftArrowCalendar}
        actionRightButton={actionRightArrowCalendar}
      />
      <CalendarShortNameDaysContainer>
        {Calendar_Itens.dayNamesShort.map((item, index) => (
          <ContainerNameDay key={index}>
            <TextRegular>{item}</TextRegular>
          </ContainerNameDay>
        ))}
      </CalendarShortNameDaysContainer>
      {!isLoading ? (
        <FlatList
          data={arrayDaysInMonth}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={7}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => {
            return (
              <CardDay>
                <TextRegular outMonth={outMonth} position={index}>
                  {item}
                </TextRegular>
              </CardDay>
            );
          }}
        />
      ) : null}
    </CalendarContainer>
  );
};
