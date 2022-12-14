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
import { DATE_LOCAL_LIST } from '../../../../utils';

export const Calendar = () => {
  const { timezone, dateTypeLocal } = ConsumerMainContext();

  moment.locale(DATE_LOCAL_LIST[dateTypeLocal]);
  const momentNow = momentz.tz(timezone);

  const actualDay = momentNow.format('DD/MM/YYYY');

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
  const [totalDateArray, setTotalDateArray] = useState(['']);
  const [pastQuantDaysMonth, setPastQuantDaysMonth] = useState<number>(0);
  const [actualQuantDaysMonth, setActualQuantDaysMonth] = useState<number>(0);
  const [endGetDates, setEndGetDates] = useState<boolean>(false);
  const [outMonth, setOutMonth] = useState<number[]>([]);
  const [monthName, setMonthName] = useState(
    Calendar_Itens.monthNames[actualMonth],
  );
  const [clickedDay, setClickedDay] = useState(actualDay);

  const firstDayOfWeek = moment(
    `${actualYear}-${actualMonth}-01`,
    'YYYY-MM-DD',
  ).weekday();

  const getMaxDaysInMonth = () => {
    if (pastMonth === 2) {
      setPastQuantDaysMonth(parseInt(February(actualYear), 10));
    } else {
      setPastQuantDaysMonth(
        parseInt(DATA_MASK_MONTH[String(pastMonth).padStart(2, '0')], 10),
      );
    }

    if (actualMonth === 2) {
      setActualQuantDaysMonth(parseInt(February(actualYear), 10));
    } else {
      setActualQuantDaysMonth(
        parseInt(DATA_MASK_MONTH[String(actualMonth).padStart(2, '0')], 10),
      );
    }

    setEndGetDates(prev => !prev);
  };

  const handleGetDaysInMonth = () => {
    let newArray = [];
    setOutMonth([]);
    setTotalDateArray([]);
    if (firstDayOfWeek === 0) {
      newArray = arrayDaysInMonth.map((_, index: number) => {
        if (index + 1 > actualQuantDaysMonth) {
          setOutMonth(prev => [...prev, index]);
          setTotalDateArray(prev => [
            ...prev,
            `${String(index - actualQuantDaysMonth + 1).padStart(
              2,
              '0',
            )}/${actualMonth}/${actualYear}`,
          ]);
          return index - actualQuantDaysMonth + 1;
        } else {
          setTotalDateArray(prev => [
            ...prev,
            `${String(index + 1).padStart(2, '0')}/${
              actualMonth + 1
            }/${actualYear}`,
          ]);
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
            setTotalDateArray(prev => [
              ...prev,
              `${String(
                index - firstDayOfWeek - actualQuantDaysMonth + 1,
              ).padStart(2, '0')}/${actualMonth - 1}/${actualYear}`,
            ]);
            return index - firstDayOfWeek - actualQuantDaysMonth + 1;
          } else {
            setTotalDateArray(prev => [
              ...prev,
              `${String(index - firstDayOfWeek + 1).padStart(
                2,
                '0',
              )}/${actualMonth}/${actualYear}`,
            ]);
            return index - firstDayOfWeek + 1;
          }
        } else {
          setOutMonth(prev => [...prev, index]);
          setTotalDateArray(prev => [
            ...prev,
            `${String(item).padStart(2, '0')}/${actualMonth + 1}/${actualYear}`,
          ]);
          return item;
        }
      });
    }
    setArrayDaysInMonth(newArray);
  };

  const actionLeftArrowCalendar = () => {
    if (actualMonth === 2) {
      setActualMonth(1);
      setPastMonth(12);
      setMonthName(Calendar_Itens.monthNames[1]);
    } else if (actualMonth === 1) {
      setActualYear(prev => String(parseInt(prev, 10) - 1));
      setActualMonth(12);
      setPastMonth(11);
      setMonthName(Calendar_Itens.monthNames[12]);
    } else {
      setActualMonth(prev => prev - 1);
      setPastMonth(prev => prev - 1);
      setMonthName(Calendar_Itens.monthNames[actualMonth - 1]);
    }
  };

  const actionRightArrowCalendar = () => {
    if (actualMonth === 12) {
      setActualYear(prev => String(parseInt(prev, 10) + 1));
      setActualMonth(1);
      setPastMonth(12);
      setMonthName(Calendar_Itens.monthNames[1]);
    } else if (pastMonth === 12) {
      setActualMonth(2);
      setPastMonth(1);
      setMonthName(Calendar_Itens.monthNames[2]);
    } else {
      setActualMonth(prev => prev + 1);
      setPastMonth(prev => prev + 1);
      setMonthName(Calendar_Itens.monthNames[actualMonth + 1]);
    }
  };

  useEffect(() => {
    getMaxDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastMonth]);

  useEffect(() => {
    handleGetDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endGetDates]);

  console.log(clickedDay);

  return (
    <CalendarContainer>
      <HeaderMenu
        textDate={`${monthName} de ${actualYear}`}
        iconLeft="arrow-back"
        iconRight="arrow-forward"
        actionLeftButton={actionLeftArrowCalendar}
        actionRightButton={actionRightArrowCalendar}
      />
      <CalendarShortNameDaysContainer>
        {Calendar_Itens.dayNamesShort.map((item, index) => {
          if (index === 0) {
            return;
          }

          return (
            <ContainerNameDay key={index}>
              <TextRegular>{item}</TextRegular>
            </ContainerNameDay>
          );
        })}
      </CalendarShortNameDaysContainer>
      <FlatList
        data={arrayDaysInMonth}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={7}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return (
            <CardDay
              onPress={() => setClickedDay(totalDateArray[index])}
              clickedDay={clickedDay === totalDateArray[index] ? true : false}
              backGroundToday={
                actualDay === totalDateArray[index] ? true : false
              }>
              <TextRegular outMonth={outMonth} position={index}>
                {item}
              </TextRegular>
            </CardDay>
          );
        }}
      />
    </CalendarContainer>
  );
};
