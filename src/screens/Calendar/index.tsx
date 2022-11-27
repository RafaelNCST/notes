import React from 'react';
import { Container, Content } from './styles';
import { HeaderMenu, BottomMenu } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { BodyScreen } from '../../styles/globalStyles';

export const Calendar = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="Calendar"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        <Content></Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
