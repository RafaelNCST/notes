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
  const pastMonth = parseInt(momentNow.format('MM'), 10) - 1;
  const actualMonth = parseInt(momentNow.format('MM'), 10);
  const actualYear = momentNow.format('YYYY');
  const firstDayOfWeek = moment(`${actualYear}-${actualMonth}-01`).weekday();

  const [arrayDaysInMonth, setArrayDaysInMonth] = useState(
    new Array(42).fill(0),
  );
  const [pastQuantDaysMonth, setPastQuantDaysMonth] = useState<number>(0);
  const [actualQuantDaysMonth, setActualQuantDaysMonth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [outWeek, setOutWeek] = useState(0);

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

  console.log(pastQuantDaysMonth);
  console.log(actualQuantDaysMonth);

  const handleGetDaysInMonth = () => {
    let newArray = [];
    if (firstDayOfWeek === 0) {
      newArray = arrayDaysInMonth.map((_, index: number) => {
        if (index + 1 > actualQuantDaysMonth) {
          setOutWeek(index);
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
            setOutWeek(index);
            return index - firstDayOfWeek - actualQuantDaysMonth + 1;
          } else {
            return index - firstDayOfWeek + 1;
          }
        } else {
          setOutWeek(index);
          return item;
        }
      });
    }
    setArrayDaysInMonth(newArray);
    setIsLoading(false);
  };

  useEffect(() => {
    getMaxDaysInMonth();
    handleGetDaysInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(arrayDaysInMonth);

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
      {!isLoading && (
        <FlatList
          data={arrayDaysInMonth}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={7}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            return (
              <CardDay>
                <TextRegular>{item}</TextRegular>
              </CardDay>
            );
          }}
        />
      )}
    </CalendarContainer>
  );
};
