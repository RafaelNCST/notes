import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  memo,
} from 'react';
import {
  CalendarContainer,
  CalendarShortNameDaysContainer,
  ContainerNameDay,
  TextRegular,
  CardDay,
  ContainerBadges,
  Badge,
} from './styles';
import moment from 'moment';
import momentz from 'moment-timezone';
import { ConsumerMainContext } from '../../../../contexts/consumer';
import { HeaderMenu } from '../../../../components';
import { Calendar_Itens } from './data';
import { FlatList } from 'react-native';
import { useAppSelector } from '../../../../store/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { DATE_LOCAL_LIST } from '../../../../utils';
interface CalendarProps {
  clickedDay: string;
  setClickedDay: Dispatch<SetStateAction<string>>;
}
interface arrayDaysInMonthType {
  [unit: number]: {
    [unit: string]: string[];
  };
}

export const Calendar: React.FC<CalendarProps> = memo(
  ({ clickedDay, setClickedDay }) => {
    const { timezone, dateTypeLocal } = ConsumerMainContext();

    const { t } = useTranslation();

    const dataEvents = useAppSelector(store => store.Events.data);

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
    const [arrayDaysInMonth, setArrayDaysInMonth] =
      useState<arrayDaysInMonthType>({});
    const [monthName, setMonthName] = useState(
      Calendar_Itens.monthNames[actualMonth],
    );
    const [loading, setLoading] = useState<boolean>(true);

    let calendarYear = 1969;

    const formatDateByLanguage = (day: number, month: number, year: number) => {
      return DATE_LOCAL_LIST[dateTypeLocal] === 'en'
        ? `${String(month).padStart(2, '0')}/${String(day).padStart(
            2,
            '0',
          )}/${year}`
        : `${String(day).padStart(2, '0')}/${String(month).padStart(
            2,
            '0',
          )}/${year}`;
    };

    const getDaysInMonth = (
      quantPastMonth: number,
      quantActualMonth: number,
      firstDayOfWeek: number,
      month: number,
      year: number,
    ) => {
      let auxArray = new Array(42).fill(0);
      let pastMonthArray: number[] = [];
      let finalPastArray: string[] = [];
      let quantPastDaysMonth = quantPastMonth - firstDayOfWeek;

      if (firstDayOfWeek !== 0) {
        let auxPastArray = [25, 26, 27, 28, 29, 30, 31];
        pastMonthArray = auxPastArray.filter(item => {
          if (item > quantPastDaysMonth && item <= quantPastMonth) {
            return item;
          }
        });
      }

      finalPastArray = pastMonthArray.map((item: number) => {
        if (month === 1) {
          return formatDateByLanguage(item, 12, year - 1);
        } else {
          return formatDateByLanguage(item, month - 1, year);
        }
      });

      let countAuxDays = 0;

      const finalArray = auxArray.map((item, index) => {
        if (finalPastArray[index] !== undefined) {
          return finalPastArray[index];
        } else if (
          index >= finalPastArray.length &&
          index < quantActualMonth + finalPastArray.length
        ) {
          return formatDateByLanguage(
            index - finalPastArray.length + 1,
            month,
            year,
          );
        } else {
          countAuxDays = countAuxDays + 1;
          if (month === 12) {
            return formatDateByLanguage(countAuxDays, 1, year + 1);
          } else {
            return formatDateByLanguage(countAuxDays, month + 1, year);
          }
        }
      });

      return finalArray;
    };

    const handleDaysInMonthArray = () => {
      let arrayMonths: arrayDaysInMonthType = {};
      while (calendarYear < actualYear + 10) {
        calendarYear = calendarYear + 1;
        arrayMonths[calendarYear] = {
          0: getDaysInMonth(
            moment(`${calendarYear - 1}-${12}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').weekday(),
            1,
            calendarYear,
          ),
          1: getDaysInMonth(
            moment(`${calendarYear}-${1}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').weekday(),
            2,
            calendarYear,
          ),
          2: getDaysInMonth(
            moment(`${calendarYear}-${2}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').weekday(),
            3,
            calendarYear,
          ),
          3: getDaysInMonth(
            moment(`${calendarYear}-${3}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').weekday(),
            4,
            calendarYear,
          ),
          4: getDaysInMonth(
            moment(`${calendarYear}-${4}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').weekday(),
            5,
            calendarYear,
          ),
          5: getDaysInMonth(
            moment(`${calendarYear}-${5}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').weekday(),
            6,
            calendarYear,
          ),
          6: getDaysInMonth(
            moment(`${calendarYear}-${6}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').weekday(),
            7,
            calendarYear,
          ),
          7: getDaysInMonth(
            moment(`${calendarYear}-${7}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').weekday(),
            8,
            calendarYear,
          ),
          8: getDaysInMonth(
            moment(`${calendarYear}-${8}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').weekday(),
            9,
            calendarYear,
          ),
          9: getDaysInMonth(
            moment(`${calendarYear}-${9}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').weekday(),
            10,
            calendarYear,
          ),
          10: getDaysInMonth(
            moment(`${calendarYear}-${10}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').weekday(),
            11,
            calendarYear,
          ),
          11: getDaysInMonth(
            moment(`${calendarYear}-${11}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${12}-01`, 'YYYY-MM-DD').daysInMonth(),
            moment(`${calendarYear}-${12}-01`, 'YYYY-MM-DD').weekday(),
            12,
            calendarYear,
          ),
        };
      }

      setArrayDaysInMonth(arrayMonths);
      setLoading(false);
    };

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

    const compareEventsInDay = (numberToCompare: string) => {
      return dataEvents.some(item => item.date === numberToCompare);
    };

    useEffect(() => {
      setClickedDay(actualDay);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      handleDaysInMonthArray();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        {!loading ? (
          <FlatList
            data={arrayDaysInMonth[actualYear][actualMonth]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={7}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
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
                      formatedMonth < actualMonth + 1 ||
                      formatedMonth > actualMonth + 1
                        ? true
                        : false
                    }>
                    {formatedDay}
                  </TextRegular>
                </CardDay>
              );
            }}
          />
        ) : null}
      </CalendarContainer>
    );
  },
);
