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
import 'moment/locale/pt-br';
import moment from 'moment';
import momentz from 'moment-timezone';
import { defaultStyle } from '../../styles/themes/defaultStyle';

moment.locale('pt-br');

interface RenderItemProps {
  item: eventsProps;
}

export const Home: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const reload_changes = useAppSelector(store => store.Events.reload);
  const { language } = ConsumerMainContext();

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
  const [dataEvents, setDataEvents] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const actualMoment = momentz.tz('America/Manaus');
  const TITLE_DATE_TODAY = GET_TITLE_DATE_TODAY(language);

  const openModalAddEvent = () => {
    setShowModalAddEvent(true);
  };

  const handleNavigationOptions = () => {
    navigate('SettingsScreen');
  };

  const getEventsToday = (resultArraySavedEvents: eventsProps[]) => {
    const dateToday = actualMoment.format('DD/MM/YYYY');
    if (resultArraySavedEvents) {
      const eventsToday = resultArraySavedEvents.filter(
        item => item.date === dateToday,
      );
      setDataEvents(eventsToday);
    }
  };

  const getAsyncStorageEvents = async () => {
    const stringArraySavedEvents = await AsyncStorage.getItem('@ArrayEvents');
    const parsedArraySavedEvents = JSON.parse(stringArraySavedEvents as string);
    if (parsedArraySavedEvents) {
      getEventsToday(parsedArraySavedEvents);
      dispatch(INITIALIZE_APP(parsedArraySavedEvents));
    }

    setLoading(false);
  };

  const reset = () => {
    AsyncStorage.clear();
  };

  useEffect(() => {
    getAsyncStorageEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload_changes]);

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate={TITLE_DATE_TODAY}
          iconLeft="calendar-today"
          iconRight="settings"
          actionLeftButton={() => console.log('pressouuu')}
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
