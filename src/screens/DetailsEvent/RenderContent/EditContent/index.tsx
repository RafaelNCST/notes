import React, { useState } from 'react';
import {
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  TextRegular,
  ContainerTexts,
  ContainerDropDown,
} from '../../styles';
import { DropDownCircleContainer, InputTexts } from './styles';
import { ContentEditProps } from '../types';
import {
  DropDown,
  DropDownCircle,
  MaskInputTime,
  MaskInputDate,
} from '../../../../components';
import { useTheme } from 'styled-components';
import { DATA_CATEGORY, DATA_CIRCLE } from '../../../../utils';
import { useTranslation } from 'react-i18next';
import { DropDownExtra } from '../../../AddEventModal/components/DropDown';
import { ScrollView } from 'react-native-gesture-handler';

const DATA_FORMAT_AMPM = ['AM', 'PM'];

export const EditContent: React.FC<ContentEditProps> = ({
  arrayEvents,
  setArrayEvents,
}) => {
  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [firstRunCircleDrop, setFirstRunCircleDrop] = useState<boolean>(false);
  const [indicatorTimeFormat, setIndicatorTimeFormat] = useState<string>('AM');
  const [firstRunDropDown, setFirstRunDropDown] = useState<boolean>(false);

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Content>
      <TopContainer>
        <ContainerTitle>
          <DropDownCircleContainer
            accessibilityRole="Button"
            accessibilityLabel="Menu suspenso com os círculos de urgência">
            <DropDownCircle
              Data={DATA_CIRCLE}
              zIndex={5}
              setArrayEvents={setArrayEvents}
              arrayEvents={arrayEvents}
              firstRun={firstRunCircleDrop}
              setFirstRun={setFirstRunCircleDrop}
            />
          </DropDownCircleContainer>
          <InputTexts
            heightStyled="40px"
            widthStyled="75%"
            value={arrayEvents.title}
            placeholder="Um título para se lembrar!"
            placeholderTextColor={focusTitle ? '#777676' : theme.colors.Text}
            onChangeText={(event: string) =>
              setArrayEvents(prevState => ({
                ...prevState,
                title: event,
              }))
            }
            onFocus={() => setFocusTitle(true)}
            onBlur={() => setFocusTitle(false)}
            border={true}
            maxLength={35}
          />
        </ContainerTitle>

        <ContainerDropDown>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Categoria">
            {t('Categoria')}:{' '}
          </TextRegular>
          <DropDown
            Data={DATA_CATEGORY}
            zIndex={5}
            setArrayEvents={setArrayEvents}
            arrayEvents={arrayEvents}
            firstRun={firstRunDropDown}
            setFirstRun={setFirstRunDropDown}
          />
        </ContainerDropDown>
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Horário">
            {t('Horário')}:
          </TextRegular>
          <MaskInputTime
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
          />
          {arrayEvents.assistTimeFormat ? (
            <DropDownExtra
              Data={DATA_FORMAT_AMPM}
              zIndex={5}
              choosedOption={indicatorTimeFormat}
              setChoosedOption={setIndicatorTimeFormat}
            />
          ) : null}
        </ContainerTexts>
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Data">
            {t('Data')}:
          </TextRegular>
          <MaskInputDate
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
          />
        </ContainerTexts>
      </TopContainer>
      <BottomContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputTexts
            value={arrayEvents.description}
            placeholder={t('Descreve seu compromisso ai cara!') as string}
            placeholderTextColor={
              focusDescription ? '#777676' : theme.colors.Text
            }
            onChangeText={(event: string) =>
              setArrayEvents(prevState => ({
                ...prevState,
                description: event,
              }))
            }
            onFocus={() => setFocusDescription(true)}
            onBlur={() => setFocusDescription(false)}
            multiline={true}
            border={false}
          />
        </ScrollView>
      </BottomContainer>
    </Content>
  );
};
