import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  ContainerDetailsDay,
  BottomInfoEvent,
} from './styles';
import { HeaderMenu, BottomMenu } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { Calendar } from './components/Calendar';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { eventsProps } from '../../store/types';
import { EventsInfo } from './components/EventsInfo';
import { ConsumerMainContext } from '../../contexts/consumer';
import momentz from 'moment-timezone';
import { DATE_LOCAL_LIST } from '../../utils';
import { BodyScreen } from '../../styles/globalStyles';

export const CalendarScreen = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { timezone, dateTypeLocal } = ConsumerMainContext();

  const dataEvents = useAppSelector(store => store.Events.data);

  const momentNow = momentz.tz(timezone);

  const actualDay = momentNow.format(
    DATE_LOCAL_LIST[dateTypeLocal] === 'en' ? 'MM/D/YYYY' : 'D/MM/YYYY',
  );

  const [selectedDateEventsArray, setSelectedDateEventsArray] = useState<
    eventsProps[]
  >([]);
  const [clickedDay, setClickedDay] = useState(actualDay);

  const findSelectDate = () => {
    const newArrayFiltered = dataEvents.filter(item => {
      if (item.date === clickedDay) {
        return item;
      } else {
        return false;
      }
    });

    setSelectedDateEventsArray(newArrayFiltered);
  };

  useEffect(() => {
    findSelectDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedDay]);

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu iconLeft="arrow-back-ios" actionLeftButton={goBack} />
        <Content>
          <Calendar clickedDay={clickedDay} setClickedDay={setClickedDay} />
          <ContainerDetailsDay>
            <BottomInfoEvent>
              <EventsInfo Data={selectedDateEventsArray} />
            </BottomInfoEvent>
          </ContainerDetailsDay>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
