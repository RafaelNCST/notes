import React from 'react';
import { Container, Content, ContainerDetailsDay } from './styles';
import { HeaderMenu, BottomMenu } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { Calendar } from './components/Calendar';
import { BodyScreen } from '../../styles/globalStyles';

export const CalendarScreen = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu iconLeft="arrow-back-ios" actionLeftButton={goBack} />
        <Content>
          <Calendar />
          <ContainerDetailsDay></ContainerDetailsDay>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
