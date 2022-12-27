import React, { useEffect, useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { Container, Content, ContentSpinner, ListEvents } from './styles';
import { BottomMenu, HeaderMenu } from '../../components';
import { AddEventModal } from '../AddEventModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlankList, Events } from './components';
import { RootStackParamList } from '../../routes/types';
import { ActivityIndicator } from 'react-native';
import { GET_TITLE_DATE_TODAY } from '../../helpers';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { ConsumerMainContext } from '../../contexts/consumer';
import { INITIALIZE_APP } from '../../store/eventsReducer';
import { eventsProps } from '../../store/types';
import moment from 'moment';
import momentz from 'moment-timezone';
import 'moment/min/locales';
import { DATE_LOCAL_LIST } from '../../utils';
import { defaultStyle } from '../../styles/themes/defaultStyle';

interface RenderItemProps {
  item: eventsProps;
}

export const Home: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { dateTypeLocal, timezone } = ConsumerMainContext();

  const dispatch = useAppDispatch();
  const reload_changes = useAppSelector(store => store.Events.reload);
  const { language } = ConsumerMainContext();

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
  const [dataEvents, setDataEvents] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  moment.locale(DATE_LOCAL_LIST[dateTypeLocal]);
  const actualMoment = momentz.tz(timezone);
  const TITLE_DATE_TODAY = GET_TITLE_DATE_TODAY(language);

  const openModalAddEvent = () => {
    setShowModalAddEvent(true);
  };

  const handleNavigationOptions = () => {
    navigate('SettingsScreen');
  };

  const handleNavigationCalendar = () => {
    navigate('CalendarScreen');
  };

  const getEventsToday = (resultArraySavedEvents: eventsProps[]) => {
    const dateTodayBrasil = actualMoment.format('DD/MM/YYYY');
    const dateTodayAmerican = actualMoment.format('MM/DD/YYYY');
    if (resultArraySavedEvents) {
      const eventsToday = resultArraySavedEvents.filter(
        item =>
          item.date === dateTodayBrasil || item.date === dateTodayAmerican,
      );
      setDataEvents(eventsToday);
    }
  };

  const getAsyncStorageEvents = async () => {
    const stringArraySavedEvents = await AsyncStorage.getItem('@ArrayEvents');
    const parsedArraySavedEvents = JSON.parse(stringArraySavedEvents as string);
    const formatedArraySavedEvents = changeFormatedDates(
      parsedArraySavedEvents,
    );
    if (formatedArraySavedEvents) {
      getEventsToday(formatedArraySavedEvents);
      dispatch(INITIALIZE_APP(formatedArraySavedEvents));
    }

    setLoading(false);
  };

  const changeFormatedDates = (arrayData: eventsProps[]) => {
    const newArray = arrayData.map(item => {
      const year = item.date?.split('/')[2];
      if (DATE_LOCAL_LIST[dateTypeLocal] === 'en') {
        const day = item.date?.split('/')[0];
        const month = item.date?.split('/')[1];
        return { ...item, date: `${month}/${day}/${year}` };
      } else {
        const day = item.date?.split('/')[0];
        const month = item.date?.split('/')[1];
        return { ...item, date: `${day}/${month}/${year}` };
      }
    });
    return newArray;
  };

  const reset = () => {
    AsyncStorage.clear();
  };

  useEffect(() => {
    getAsyncStorageEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload_changes, dateTypeLocal]);

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate={TITLE_DATE_TODAY}
          iconLeft="calendar-today"
          iconRight="settings"
          actionLeftButton={handleNavigationCalendar}
          actionRightButton={handleNavigationOptions}
        />
        <Content>
          {loading ? (
            <ContentSpinner>
              <ActivityIndicator
                size={30}
                color={defaultStyle.colors.GREEN_AFIRMATIVE}
              />
            </ContentSpinner>
          ) : (
            <ListEvents
              data={dataEvents}
              ListEmptyComponent={<BlankList />}
              keyExtractor={(item: eventsProps) => item.id}
              renderItem={({ item }: RenderItemProps) => {
                return <Events {...item} />;
              }}
            />
          )}
        </Content>

        <AddEventModal modalState={showModalAddEvent} />

        <BottomMenu
          buttonExists={true}
          buttonAction={openModalAddEvent}
          iconButton="add"
        />
      </Container>
    </BodyScreen>
  );
};
