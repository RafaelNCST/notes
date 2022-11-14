import React, { useState } from 'react';
import {
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  TextRegular,
  DropDownCircleContainer,
  InputTexts,
  ContainerTexts,
} from '../../styles';
import { ContentProps } from '../types';
import { DropDown, DropDownCircle, MaskInput } from '../../../../components';
import { useTheme } from 'styled-components';
import { DATA_CATEGORY, DATA_CIRCLE } from '../../../../utils';
import { eventsProps } from '../../../../store/types';
// import { useAppDispatch } from '../../../../store/hooks/useAppDispatch';
// import { EDIT_EVENT } from '../../../../store/eventsReducer';
import { ScrollView } from 'react-native-gesture-handler';

export const EditContent: React.FC<ContentProps> = ({
  time,
  message,
  category,
  date,
  circle,
}) => {
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

  // const { reset } = useNavigation<StackNavigationProp<RootStackParamList>>();

  // const dateToday = new Date();

  // const dispatch = useAppDispatch();

  const theme = useTheme();

  // const handleModalWarningBackHome = () => {
  //   reset({
  //     index: 0,
  //     routes: [{ name: 'HomeScreen' }],
  //   });
  // };

  // const closeModalWarning = () => {
  //   setShowModalWarning(false);
  // };

  // const handleModalWarningAddNewEvent = () => {
  //   setArrayEvents({
  //     circle: 'white',
  //     title: '',
  //     category: '',
  //     time: '',
  //     date: '',
  //     description: '',
  //   });
  //   setClearMaskInputs(true);
  //   setTimeout(() => setClearMaskInputs(false), 500);
  //   closeModalWarning();
  //   setClearDropDown(true);
  // };

  // const handleConfirmBlankInputs = () => {
  //   setArrayBlankWarning([]);
  //   if (
  //     arrayEvents.circle === 'white' ||
  //     arrayEvents.category === '' ||
  //     arrayEvents.date === '' ||
  //     arrayEvents.time === '' ||
  //     arrayEvents.title === ''
  //   ) {
  //     setIconWarning('warning');
  //     setTextWarning('Os campos a seguir estão vazios: ');
  //     if (arrayEvents.circle === 'white') {
  //       setArrayBlankWarning(['Círculo de importância']);
  //     }

  //     if (arrayEvents.category === '') {
  //       setArrayBlankWarning(prev => [...prev, 'Categoria']);
  //     }

  //     if (arrayEvents.date === '' || arrayEvents.date === '//') {
  //       setArrayBlankWarning(prev => [...prev, 'Data']);
  //     }

  //     if (arrayEvents.time === '' || arrayEvents.time === ':') {
  //       setArrayBlankWarning(prev => [...prev, 'Horário']);
  //     }

  //     if (arrayEvents.title === '') {
  //       setArrayBlankWarning(prev => [...prev, 'Título']);
  //     }
  //     setTextButtonWarningAffirmative('OK');
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const handleConfirmOrganizationMaskInputs = () => {
  //   const year = dateToday.getFullYear();
  //   const inputDate = arrayEvents.date?.split('/');
  //   const [inputDay, inputMonth, inputYear] = inputDate || [];
  //   const inputTime = arrayEvents.time?.split(':');
  //   const [inputHour, inputSeconds] = inputTime || [];

  //   if (
  //     inputDay.length === 1 ||
  //     inputMonth.length === 1 ||
  //     inputYear.length === 1
  //   ) {
  //     setArrayEvents(prevState => ({
  //       ...prevState,
  //       date: `${inputDay.length === 1 ? '0' + inputDay : inputDay}/${
  //         inputMonth.length === 1 ? '0' + inputMonth : inputMonth
  //       }/${inputYear.length <= 3 ? year : inputYear}`,
  //     }));
  //   }

  //   if (inputHour.length === 1 || inputSeconds.length === 1) {
  //     setArrayEvents(prevState => ({
  //       ...prevState,
  //       time: `${inputHour.length === 1 ? '0' + inputHour : inputHour}:${
  //         inputSeconds.length === 1 ? '0' + inputSeconds : inputSeconds
  //       }`,
  //     }));
  //   }
  // };

  // const handleConfirmCamps = () => {
  //   setArrayBlankWarning([]);
  //   handleConfirmOrganizationMaskInputs();
  //   setTextWarning(
  //     'Você adicionou um evento com sucesso! Deseja voltar ao menu principal ou continuar a adicionar?',
  //   );
  //   setIconWarning('done');
  //   setTextButtonWarningAffirmative('CONTINUAR');
  //   setTextButtonWarningNegative('VOLTAR');
  //   setShowModalWarning(true);
  // };

  // const onClickConfirmEvent = () => {
  //   if (handleConfirmBlankInputs()) {
  //     setShowModalWarning(true);
  //   } else {
  //     handleConfirmCamps();
  //   }
  // };

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
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Categoria">
            Categoria:{' '}
          </TextRegular>
          <DropDown
            Data={DATA_CATEGORY}
            zIndex={5}
            setArrayEvents={setArrayEvents}
            arrayEvents={arrayEvents}
            firstRun={clearDropDown}
            setFirstRun={setClearDropDown}
          />
        </ContainerTexts>
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Horário">
            Horário:
          </TextRegular>
          <MaskInput
            separator=":"
            linesNumber={2}
            type="time"
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
            clearMaskInputs={clearMaskInputs}
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
          />
        </ContainerTexts>
      </TopContainer>
      <BottomContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputTexts
            placeholder="Descreve seu compromisso ai cara!"
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
  );
};
