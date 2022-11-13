import React, { useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  TextRegular,
  TextTitle,
  DropDownCircleContainer,
  InputTexts,
  ContainerTexts,
} from './styles';
import {
  BottomMenu,
  HeaderMenu,
  CircleEvent,
  DropDown,
  DropDownCircle,
  MaskInput,
} from '../../components';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DATA_CATEGORY, DATA_CIRCLE } from '../../utils';
import { RootStackParamList } from '../../routes/types';
import { useRoute } from '@react-navigation/native';
import { eventsProps } from '../../store/types';
import { ScrollView } from 'react-native-gesture-handler';

export const DetailsEvent = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { time, message, category, date, circle } =
    useRoute<RouteProp<RootStackParamList>>()?.params || {};

  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [showModalWarning, setShowModalWarning] = useState<boolean>(false);
  const [clearMaskInputs, setClearMaskInputs] = useState<boolean>(false);
  const [clearDropDown, setClearDropDown] = useState<boolean>(true);
  const [textButtonWarningAffirmative, setTextButtonWarningAffirmative] =
    useState<string>('');
  const [textButtonWarningNegative, setTextButtonWarningNegative] =
    useState<string>('');
  const [textWarning, setTextWarning] = useState<string>('');
  const [arrayBlankWarning, setArrayBlankWarning] = useState<string[]>([]);
  const [iconWarning, setIconWarning] = useState<string>('');
  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    circle: 'white',
    title: '',
    category: '',
    time: '',
    date: '',
    description: '',
  });

  const theme = useTheme();

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="22 de julho de 2022"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        <Content>
          <TopContainer>
            <ContainerTitle>
              {editMode ? (
                <DropDownCircleContainer
                  accessibilityRole="Button"
                  accessibilityLabel="Menu suspenso com os círculos de urgência">
                  <DropDownCircle
                    Data={DATA_CIRCLE}
                    zIndex={5}
                    setArrayEvents={setArrayEvents}
                    arrayEvents={arrayEvents}
                  />
                </DropDownCircleContainer>
              ) : (
                <CircleEvent colorEvent={circle} />
              )}
              <InputTexts
                heightStyled="40px"
                widthStyled="75%"
                disabled={!editMode ? true : false}
                value={arrayEvents.title}
                placeholder="Um título para se lembrar!"
                placeholderTextColor={
                  focusTitle ? '#777676' : theme.colors.Text
                }
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
            <ContainerTexts>
              <TextRegular
                accessibilityRole="Text"
                accessibilityLabel="Categoria">
                Categoria:{' '}
              </TextRegular>
              {editMode ? (
                <DropDown
                  Data={DATA_CATEGORY}
                  zIndex={5}
                  setArrayEvents={setArrayEvents}
                  arrayEvents={arrayEvents}
                  firstRun={clearDropDown}
                  setFirstRun={setClearDropDown}
                />
              ) : (
                <TextTitle>{category}</TextTitle>
              )}
            </ContainerTexts>

            <ContainerTexts>
              <TextRegular
                accessibilityRole="Text"
                accessibilityLabel="Horário">
                Horário:
              </TextRegular>
              <MaskInput
                separator=":"
                linesNumber={2}
                type="time"
                arrayEvents={arrayEvents}
                setArrayEvents={setArrayEvents}
                clearMaskInputs={clearMaskInputs}
                disabled={!editMode ? true : false}
              />
            </ContainerTexts>
            <ContainerTexts>
              <TextRegular accessibilityRole="Text" accessibilityLabel="Data">
                Data:
              </TextRegular>
              <MaskInput
                separator="/"
                linesNumber={3}
                type="date"
                arrayEvents={arrayEvents}
                setArrayEvents={setArrayEvents}
                clearMaskInputs={clearMaskInputs}
                disabled={!editMode ? true : false}
              />
            </ContainerTexts>
          </TopContainer>
          <BottomContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              <InputTexts
                placeholder="Descreve seu compromisso ai cara!"
                disabled={!editMode ? true : false}
                value={arrayEvents.description}
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
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
