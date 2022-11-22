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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SlideButton } from '../../components/SlideButton';
import { RootStackParamList } from '../../routes/types';
import { DropDown, CheckMark } from './components';
import { useTranslation } from 'react-i18next';
import { DATA_DROPDOWN_LANGUAGES } from '../../utils';
import { SETTINGS_ITENS } from './data';
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

  const toggleMarkerEraseEventsPastDays = () => {
    setAutomaticEraseEventsPastDays(prev => !prev);
  };

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
              {t(SETTINGS_ITENS.THEME_TEXT)}
            </TextRegular>
          </SubContainer>
          <SubContainer>
            <SquareMarker onPress={toggleMarkerEraseEventsPastDays}>
              {automaticEraseEventsPastDays ? <CheckMark /> : null}
            </SquareMarker>
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Apagar Automaticamente dias passados">
              {t(SETTINGS_ITENS.AUTOMATIC_ERASE_PAST_DAYS_TEXT)}
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
              {t(SETTINGS_ITENS.LANGUAGE_TEXT)}
            </TextRegular>
          </SubContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
