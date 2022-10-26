import React from 'react';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { BodyScreen } from '../../styles/globalStyles';
import { Container, Content } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

export const Settings = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="Configurações"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        <Content></Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
