import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { BodyScreen } from '../../styles/globalStyles';
import { Container, Content } from './styles';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { Events } from './components/events';
import { AddEventModal } from '../AddEventModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

const DATA = [
  { time: '07:00', message: 'Hoje eu Caguei', colorEvent: 'yellow' },
  { time: '05:00', message: 'Hoje eu LARQUIEI', colorEvent: 'green' },
  { time: '10:00', message: 'Hoje eu Viajei', colorEvent: 'red' },
];

export const Home: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);

  const openModalAddEvent = () => {
    setShowModalAddEvent(true);
  };

  const closeModalAddEvent = () => {
    setShowModalAddEvent(false);
  };

  const handleNavigationOptions = () => {
    navigate('SettingsScreen');
  };

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="22 de Julho de 2022"
          iconLeft="calendar-today"
          iconRight="settings"
          actionLeftButton={() => console.log('pressou')}
          actionRightButton={handleNavigationOptions}
        />
        <Content>
          <FlatList
            data={DATA}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
              return <Events {...item} />;
            }}
          />
        </Content>

        <AddEventModal
          closeModal={closeModalAddEvent}
          modalState={showModalAddEvent}
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
