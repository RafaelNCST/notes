import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BodyScreen } from '../../styles/globalStyles';
import { Container, Content } from './styles';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { Events } from './components/events';
import { AddEventModal } from '../AddEventModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlankList } from './components/blankList';
import { RootStackParamList } from '../../routes/types';
import { eventsProps } from '../../store/types';
import { getEventsArrayAsync } from '../../store/eventsReducer/thunk';
import { MONTHS } from '../../helpers/months';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { INITIALIZE_APP } from '../../store/eventsReducer';

export const Home: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
  const [dataEvents, setDataEvents] = useState<object[]>([]);

  const date = new Date();

  const day: string = String(
    String(date.getDate()).length === 1
      ? '0' + String(date.getDate())
      : date.getDate(),
  );
  const month: string = String(
    String(date.getMonth() + 1).length === 1
      ? '0' + String(date.getMonth() + 1)
      : date.getMonth() + 1,
  );
  const year = String(
    String(date.getFullYear()).length === 1
      ? '0' + String(date.getFullYear())
      : date.getFullYear(),
  );

  const { data } = useAppSelector(store => store.Events);

  const openModalAddEvent = () => {
    setShowModalAddEvent(true);
  };

  const closeModalAddEvent = () => {
    setShowModalAddEvent(false);
  };

  const handleNavigationOptions = () => {
    navigate('SettingsScreen');
  };

  const getEventsToday = (resultArraySavedEvents: eventsProps[]) => {
    const dateToday = `${day}/${month}/${year}`;
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
    console.log(parsedArraySavedEvents);
  };

  // const reset = () => {
  //   AsyncStorage.clear();
  // };

  useEffect(() => {
    getAsyncStorageEvents();
    getEventsArrayAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate={`${day} de ${MONTHS[String(date.getMonth())]} de ${year}`}
          iconLeft="calendar-today"
          iconRight="settings"
          actionLeftButton={() => console.log('pressouuu')}
          actionRightButton={handleNavigationOptions}
        />
        <Content>
          <FlatList
            data={dataEvents}
            contentContainerStyle={{
              flex: 1,
            }}
            ListEmptyComponent={<BlankList />}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
              return <Events {...item} />;
            }}
          />
        </Content>

        <AddEventModal
          closeModal={closeModalAddEvent}
          modalState={showModalAddEvent}
          openModal={openModalAddEvent}
        />

        <BottomMenu
          buttonExists={true}
          buttonAction={openModalAddEvent}
          iconButton="add"
        />
      </Container>
    </BodyScreen>
  );
};
