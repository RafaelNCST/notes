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
import { useTranslation } from 'react-i18next';
import { DATA_DROPDOWN_LANGUAGES } from '../../utils';
import { ConsumerMainContext } from '../../contexts/consumer';

export const Settings = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    theme,
    setTheme,
    setAutomaticEraseEventsPastDays,
    setLanguage,
    language,
    automaticEraseEventsPastDays,
    saveLanguage,
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
              accessibilityLabel="Modo escuro/Modo claro">
              {t('Modo escuro/Modo claro')}
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
              {t('Apagar automaticamente dias passados')}
            </TextRegular>
          </SubContainer>
          <SubContainer zIndexContainer={6}>
            <DropDown
              Data={DATA_DROPDOWN_LANGUAGES}
              choosedOption={language}
              setChoosedOption={setLanguage}
              zIndex={5}
              assistFunction={saveLanguage}
            />
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Linguagem Escolhida">
              {t('Linguagem Escolhida')}
            </TextRegular>
          </SubContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
