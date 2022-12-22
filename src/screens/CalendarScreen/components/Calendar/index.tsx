import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  CalendarContainer,
  CalendarShortNameDaysContainer,
  ContainerNameDay,
  TextRegular,
} from './styles';
import moment from 'moment';
import momentz from 'moment-timezone';
import { ConsumerMainContext } from '../../../../contexts/consumer';
import { HeaderMenu } from '../../../../components';
import { Calendar_Itens } from './data';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ItemsListCalendar } from './components';
import { DATE_LOCAL_LIST } from '../../../../utils';
interface CalendarProps {
  clickedDay: string;
  setClickedDay: Dispatch<SetStateAction<string>>;
}

export const Calendar: React.FC<CalendarProps> = ({
  clickedDay,
  setClickedDay,
}) => {
  const { timezone, dateTypeLocal, arrayDaysInMonth } = ConsumerMainContext();

  const { t } = useTranslation();

  moment.locale(DATE_LOCAL_LIST[dateTypeLocal]);
  const momentNow = momentz.tz(timezone);

  let auxActualMonth = parseInt(momentNow.format('MM'), 10);

  const actualDay = momentNow.format(
    DATE_LOCAL_LIST[dateTypeLocal] === 'en' ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
  );

  const [actualYear, setActualYear] = useState(
    parseInt(momentNow.format('YYYY'), 10),
  );
  const [actualMonth, setActualMonth] = useState(
    moment(`${actualYear}-${auxActualMonth}-01`, 'YYYY-MM-DD').month(),
  );
  const [monthName, setMonthName] = useState(
    Calendar_Itens.monthNames[actualMonth],
  );
  const finalDataDaysInMonth = arrayDaysInMonth;

  const actionLeftArrowCalendar = () => {
    if (actualYear === 1971 && actualMonth === 1) {
      setActualMonth(1);
      setActualYear(prev => prev);
      setMonthName(Calendar_Itens.monthNames[1]);
    } else if (actualMonth === 0) {
      setActualMonth(11);
      setActualYear(prev => prev - 1);
      setMonthName(Calendar_Itens.monthNames[11]);
    } else {
      setActualMonth(prev => prev - 1);
      setMonthName(Calendar_Itens.monthNames[actualMonth - 1]);
    }
  };

  const actionRightArrowCalendar = () => {
    if (actualYear === momentNow.year() + 10 && actualMonth === 11) {
      setActualMonth(11);
      setActualYear(prev => prev);
      setMonthName(Calendar_Itens.monthNames[11]);
    } else if (actualMonth === 11) {
      setActualMonth(0);
      setActualYear(prev => prev + 1);
      setMonthName(Calendar_Itens.monthNames[0]);
    } else {
      setActualMonth(prev => prev + 1);
      setMonthName(Calendar_Itens.monthNames[actualMonth + 1]);
    }
  };

  useEffect(() => {
    setClickedDay(actualDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(clickedDay);

  return (
    <CalendarContainer>
      <HeaderMenu
        textDate={t(`${monthName} de `) + actualYear}
        iconLeft="arrow-back"
        iconRight="arrow-forward"
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
      <FlatList
        data={finalDataDaysInMonth[actualYear][actualMonth]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={7}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <ItemsListCalendar
            actualDay={actualDay}
            clickedDay={clickedDay}
            setClickedDay={setClickedDay}
            item={item}
            actualMonth={actualMonth}
            dateTypeLocal={dateTypeLocal}
          />
        )}
      />
    </CalendarContainer>
  );
};
