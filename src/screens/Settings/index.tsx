import React, { useState } from 'react';
import { BottomMenu, HeaderMenu } from '../../components';
import { BodyScreen } from '../../styles/globalStyles';
import {
  Container,
  Content,
  SubContainer,
  SquareMarker,
  Marker,
  TextRegular,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SlideButton } from '../../components/SlideButton';
import { RootStackParamList } from '../../routes/types';
import { ConsumerMainContext } from '../../contexts/consumer';

export const Settings = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [eraseEvents, setEraseEvents] = useState(false);
  const { setTheme } = ConsumerMainContext();

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="Configurações"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        <Content>
          <SubContainer>
            <SlideButton setEvent={setTheme} />
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Dark Mode/Light Mode">
              Dark Mode/Light Mode
            </TextRegular>
          </SubContainer>
          <SubContainer>
            <SquareMarker onPress={() => setEraseEvents(prev => !prev)}>
              {eraseEvents ? <Marker /> : null}
            </SquareMarker>
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Ligar/Desligar Apagamento Automático de eventos passados">
              Ligar/Desligar Apagamento Automático
            </TextRegular>
          </SubContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
