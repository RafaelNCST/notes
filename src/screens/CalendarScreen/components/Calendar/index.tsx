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
import { DATA_MASK_MONTH, February } from '../../../../helpers';
import { Calendar_Itens } from './data';
import { FlatList } from 'react-native';
import { useAppSelector } from '../../../../store/hooks/useAppSelector';
import { DATE_LOCAL_LIST } from '../../../../utils';

interface CalendarProps {
  clickedDay: string;
  setClickedDay: Dispatch<SetStateAction<string>>;
}

export const Calendar: React.FC<CalendarProps> = memo(
  ({ clickedDay, setClickedDay }) => {
    const { timezone, dateTypeLocal } = ConsumerMainContext();

    const dataEvents = useAppSelector(store => store.Events.data);

    moment.locale(DATE_LOCAL_LIST[dateTypeLocal]);
    const momentNow = momentz.tz(timezone);

    const actualDay = momentNow.format(
      DATE_LOCAL_LIST[dateTypeLocal] === 'en' ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
    );

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
    const [endGetDates, setEndGetDates] = useState<boolean | null>(null);
    const [outMonth, setOutMonth] = useState<number[]>([]);
    const [monthName, setMonthName] = useState(
      Calendar_Itens.monthNames[actualMonth],
    );

    const firstDayOfWeek = moment(
      `${actualYear}-${actualMonth}-01`,
      'YYYY-MM-DD',
    ).weekday();

    // const actualYear = 2022;

    let calendarYear = 1969;

    const getDaysInMonth = (
      quantPastMonth: number,
      quantActualMonth: number,
      firstDayOfWeek2: number,
    ) => {
      let auxArray = new Array(42).fill(0);
      let firstDayOfWeek2 = [];
      let pastMonthArray = [];
      let quantPastDaysMonth = quantPastMonth - firstDayOfWeek;

      if (firstDayOfWeek !== 0) {
        let auxPastArray = [25, 26, 27, 28, 29, 30, 31];
        pastMonthArray = auxPastArray.filter(item => {
          if (item > quantPastDaysMonth && item <= quantPastMonth) {
            return item;
          }
        });
      }

      let countAuxDays = 0;

      const finalArray = auxArray.map((item, index) => {
        if (pastMonthArray[index] !== undefined) {
          return pastMonthArray[index];
        } else if (
          index >= pastMonthArray.length &&
          index < quantActualMonth + pastMonthArray.length
        ) {
          return index - pastMonthArray.length + 1;
        } else {
          countAuxDays = countAuxDays + 1;
          return countAuxDays;
        }
      });

      return finalArray;
    };

    const handleDaysInMonthArray = () => {
      let arrayMonths = {};
      while (calendarYear < actualYear + 10) {
        calendarYear = calendarYear + 1;
        arrayMonths[calendarYear] = {
          jan: getDaysInMonth(31, 31, 0),
          feb: getDaysInMonth(31, 28, 3),
          mar: 31,
          abr: 30,
          mai: 31,
          jun: 30,
          jul: 31,
          ago: 31,
          set: 30,
          out: 31,
          nov: 30,
          dez: getDaysInMonth(30, 31, 4),
        };
      }
    };

    // console.log(arrayMonths)

    const formatDateByLanguage = (day: string, month: string, year: string) =>
      DATE_LOCAL_LIST[dateTypeLocal] === 'en'
        ? `${month}/${day}/${year}`
        : `${day}/${month}/${year}`;

    const handleOrganizeDateLocalsOne = (index: number) => {
      const day = String(index - actualQuantDaysMonth).padStart(2, '0');
      const month = String(actualMonth).padStart(2, '0');
      const year = actualYear;

      return formatDateByLanguage(day, month, year);
    };

    const handleOrganizeDateLocalsTwo = (index: number) => {
      const day = String(index - actualQuantDaysMonth).padStart(2, '0');
      const month = String(actualMonth).padStart(2, '0');
      const year = actualYear;

      return formatDateByLanguage(day, month, year);
    };

    const handleOrganizeDateLocalsThree = (index: number) => {
      const day = String(
        index - firstDayOfWeek - actualQuantDaysMonth + 1,
      ).padStart(2, '0');
      const month = String(actualMonth === 12 ? 1 : actualMonth + 1).padStart(
        2,
        '0',
      );
      const year = String(
        actualMonth === 12 ? parseInt(actualYear, 10) + 1 : actualYear,
      );

      return formatDateByLanguage(day, month, year);
    };

    const handleOrganizeDateLocalsFour = (index: number) => {
      const day = String(index - firstDayOfWeek + 1).padStart(2, '0');
      const month = String(actualMonth).padStart(2, '0');
      const year = actualYear;

      return formatDateByLanguage(day, month, year);
    };

    const handleOrganizeDateLocalsFive = (item: number | undefined) => {
      const day = String(item).padStart(2, '0');
      const month = String(actualMonth === 1 ? 12 : actualMonth - 1).padStart(
        2,
        '0',
      );
      const year = String(
        actualMonth === 1 ? parseInt(actualYear, 10) - 1 : actualYear,
      );

      return formatDateByLanguage(day, month, year);
    };

    const getQuantDaysInMonth = (
      setTimeQuant: Dispatch<SetStateAction<number>>,
      month: number,
    ) => {
      if (month === 2) {
        setTimeQuant(parseInt(February(actualYear), 10));
      } else {
        setTimeQuant(
          parseInt(DATA_MASK_MONTH[String(pastMonth).padStart(2, '0')], 10),
        );
      }
    };

    const getMaxDaysInMonth = () => {
      getQuantDaysInMonth(setPastQuantDaysMonth, pastMonth);
      getQuantDaysInMonth(setActualQuantDaysMonth, actualMonth);

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
              `${handleOrganizeDateLocalsOne(index)}`,
            ]);
            return index - actualQuantDaysMonth + 1;
          } else {
            setTotalDateArray(prev => [
              ...prev,
              `${handleOrganizeDateLocalsTwo(index)}`,
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
                `${handleOrganizeDateLocalsThree(index)}`,
              ]);
              return index - firstDayOfWeek - actualQuantDaysMonth + 1;
            } else {
              setTotalDateArray(prev => [
                ...prev,
                `${handleOrganizeDateLocalsFour(index)}`,
              ]);
              return index - firstDayOfWeek + 1;
            }
          } else {
            setOutMonth(prev => [...prev, index]);
            setTotalDateArray(prev => [
              ...prev,
              `${handleOrganizeDateLocalsFive(item)}`,
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

    const compareEventsInDay = (numberToCompare: string) => {
      return dataEvents.some(item => item.date === numberToCompare);
    };

    useEffect(() => {
      setClickedDay(actualDay);
      getMaxDaysInMonth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pastMonth]);

    useEffect(() => {
      if (endGetDates !== null) {
        handleGetDaysInMonth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endGetDates]);

    // console.log(moment(`${2023}-${2}-01`, 'YYYY-MM-DD').daysInMonth());
    console.log(moment(`${1970}-${actualMonth}-01`, 'YYYY-MM-DD').weekday());

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
          {Calendar_Itens.dayNamesShort.map(
            (item, index) =>
              !!index && (
                <ContainerNameDay key={index}>
                  <TextRegular>{item}</TextRegular>
                </ContainerNameDay>
              ),
          )}
        </CalendarShortNameDaysContainer>
        <FlatList
          data={arrayDaysInMonth}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={7}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, index }) => (
            <CardDay
              onPress={() => setClickedDay(totalDateArray[index])}
              clickedDay={clickedDay === totalDateArray[index] ? true : false}
              backGroundToday={
                actualDay === totalDateArray[index] ? true : false
              }>
              <ContainerBadges>
                {compareEventsInDay(totalDateArray[index]) ? <Badge /> : null}
              </ContainerBadges>
              <TextRegular outMonth={outMonth} position={index}>
                {item}
              </TextRegular>
            </CardDay>
          )}
        />
      </CalendarContainer>
    );
  },
);

// const actualYear = 2022;

// let calendarYear = 1969;

// let arrayMonths = {}

// const getDaysInMonth = (quantPastMonth, quantActualMonth, firstDayOfWeek) => {
//     let auxArray = new Array(42).fill(0);
//     let pastMonthArray = [];
//     let quantPastDaysMonth = quantPastMonth - firstDayOfWeek

//     if(firstDayOfWeek !== 0){
//         let auxPastArray = [25, 26, 27, 28, 29, 30, 31]
//         pastMonthArray = auxPastArray.filter((item) => {
//         if(item > quantPastDaysMonth && item <= quantPastMonth){
//             return item
//         }
//     })
//     }

//     let countAuxDays = 0;

//     const finalArray = auxArray.map((item, index) => {
//         if(pastMonthArray[index] !== undefined){
//             return pastMonthArray[index];
//         } else if (index >= pastMonthArray.length && index < quantActualMonth + (pastMonthArray.length)) {
//             return (index - pastMonthArray.length) + 1
//         } else {
//             countAuxDays = countAuxDays + 1
//             return countAuxDays;
//         }
//     })

//     return finalArray
// }

// while(calendarYear < actualYear + 10){
//     calendarYear = calendarYear + 1;
//     arrayMonths[calendarYear] = {jan: getDaysInMonth(31, 31, 0), feb: getDaysInMonth(31, 28, 3), mar: 31, abr: 30, mai: 31, jun: 30, jul: 31, ago: 31, set: 30, out: 31, nov: 30, dez: getDaysInMonth(30, 31, 4)};
// }

// console.log(arrayMonths)
