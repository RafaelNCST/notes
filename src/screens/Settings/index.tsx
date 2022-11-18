import React from 'react';
import { BottomMenu, HeaderMenu } from '../../components';
import { BodyScreen } from '../../styles/globalStyles';
import {
  Container,
  Content,
  SubContainer,
  SquareMarker,
  TextRegular,
} from './styles';
import { CheckMark } from './components/CheckMark';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SlideButton } from '../../components/SlideButton';
import { RootStackParamList } from '../../routes/types';
import { DropDown } from './components/DropDown';
import { ConsumerMainContext } from '../../contexts/consumer';

const data = ['English', 'Português(BR)'];

export const Settings = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    theme,
    setTheme,
    setAutomaticEraseEventsPastDays,
    setLanguage,
    language,
    automaticEraseEventsPastDays,
  } = ConsumerMainContext();

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
            <SlideButton event={theme} setEvent={setTheme} />
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Dark Mode/Light Mode">
              Dark Mode/Light Mode
            </TextRegular>
          </SubContainer>
          <SubContainer>
            <SquareMarker
              onPress={() => setAutomaticEraseEventsPastDays(prev => !prev)}>
              {automaticEraseEventsPastDays ? <CheckMark /> : null}
            </SquareMarker>
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Apagar Automaticamente dias passados">
              Apagar Automaticamente dias passados
            </TextRegular>
          </SubContainer>
          <SubContainer zIndexContainer={6}>
            <DropDown
              Data={data}
              choosedOption={language}
              setChoosedOption={setLanguage}
              zIndex={5}
            />
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Linguagem Escolhida">
              Linguagem Escolhida
            </TextRegular>
          </SubContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
