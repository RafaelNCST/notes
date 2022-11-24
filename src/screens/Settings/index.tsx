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
import { DATA_DROPDOWN_LANGUAGES, DATA_DATE_LOCAL } from '../../utils';
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
    dateTypeLocal,
    setDateTypeLocal,
    saveDateTypeLocal,
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
          <SubContainer zIndexContainer={7}>
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
          <SubContainer zIndexContainer={6}>
            <DropDown
              Data={DATA_DATE_LOCAL}
              choosedOption={dateTypeLocal}
              setChoosedOption={setDateTypeLocal}
              zIndex={5}
              assistFunction={saveDateTypeLocal}
            />
            <TextRegular
              accessibilityRole="Text"
              accessibilityLabel="Linguagem Escolhida">
              {t(SETTINGS_ITENS.DATE_TYPE_TEXT)}
            </TextRegular>
          </SubContainer>
          <SubContainer zIndexContainer={4}>
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
              {t(SETTINGS_ITENS.TIMEZONE_TEXT)}
            </TextRegular>
          </SubContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
