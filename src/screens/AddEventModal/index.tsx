import React, { useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Modal } from 'react-native';
import { BottomMenu, HeaderMenu, DropDownCircle } from '../../components';
import { MaskInput } from '../../components/MaskInput';
import { DropDown } from '../../components/DropDown';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { ModalWarning } from '../../components/ModalWarning';
import { InfoButton } from './components/InfoButton';
import { useNavigation } from '@react-navigation/native';
import { ContentInfo } from './components/InfoButton';
import { RootStackParamList } from '../../routes/types';
import { DATA_CATEGORY, DATA_CIRCLE } from '../../utils';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  ContainerTexts,
  DropDownCircleContainer,
  InputTexts,
  TextRegular,
} from './styles';
import { eventsProps } from '../../store/types';
import { ADD_EVENT } from '../../store/eventsReducer';

interface Props {
  closeModal: () => void;
  modalState: boolean;
}

export const AddEventModal: React.FC<Props> = ({ closeModal, modalState }) => {
  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [showModalWarningSucess, setShowModalWarningSucess] =
    useState<boolean>(false);
  const [showModalWarningError, setShowModalWarningError] =
    useState<boolean>(false);
  const [clearMaskInputs, setClearMaskInputs] = useState<boolean>(false);
  const [clearDropDown, setClearDropDown] = useState<boolean>(true);
  const [textButtonWarningAffirmative, setTextButtonWarningAffirmative] =
    useState<string>('');
  const [textButtonWarningNegative, setTextButtonWarningNegative] =
    useState<string>('');
  const [textWarning, setTextWarning] = useState<string>('');
  const [arrayBlankWarning, setArrayBlankWarning] = useState<string[]>([]);
  const [iconWarning, setIconWarning] = useState<string>('');
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    circle: 'white',
    title: '',
    category: '',
    time: '',
    date: '',
    description: '',
  });

  const { reset } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const date = new Date();

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleModalWarningBackHome = () => {
    reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  const handleModalWarningAddNewEvent = () => {
    setArrayEvents({
      circle: 'white',
      title: '',
      category: '',
      time: '',
      date: '',
      description: '',
    });
    setClearMaskInputs(true);
    setTimeout(() => setClearMaskInputs(false), 500);
    setShowModalWarningSucess(false);
    setClearDropDown(true);
  };

  const actionModalErrorButton = () => {
    setShowModalWarningError(false);
  };

  const handleConfirmBlankInputs = () => {
    setArrayBlankWarning([]);
    if (
      arrayEvents.circle === 'white' ||
      arrayEvents.category === '' ||
      arrayEvents.date === '' ||
      arrayEvents.time === '' ||
      arrayEvents.title === ''
    ) {
      setIconWarning('warning');
      setTextWarning('Os campos a seguir estão vazios: ');
      if (arrayEvents.circle === 'white') {
        setArrayBlankWarning(['Círculo de importância']);
      }

      if (arrayEvents.category === '') {
        setArrayBlankWarning(prev => [...prev, 'Categoria']);
      }

      if (arrayEvents.date === '' || arrayEvents.date === '//') {
        setArrayBlankWarning(prev => [...prev, 'Data']);
      }

      if (arrayEvents.time === '' || arrayEvents.time === ':') {
        setArrayBlankWarning(prev => [...prev, 'Horário']);
      }

      if (arrayEvents.title === '') {
        setArrayBlankWarning(prev => [...prev, 'Título']);
      }
      setTextButtonWarningAffirmative('OK');
      return true;
    } else {
      return false;
    }
  };

  const handleConfirmOrganizationMaskInputs = () => {
    const year = date.getFullYear();
    const inputDate = arrayEvents.date?.split('/');
    const [inputDay, inputMonth, inputYear] = inputDate || [];
    const inputTime = arrayEvents.time?.split(':');
    const [inputHour, inputSeconds] = inputTime || [];

    if (
      inputDay.length === 1 ||
      inputMonth.length === 1 ||
      inputYear.length === 1
    ) {
      setArrayEvents(prevState => ({
        ...prevState,
        date: `${inputDay.length === 1 ? '0' + inputDay : inputDay}/${
          inputMonth.length === 1 ? '0' + inputMonth : inputMonth
        }/${inputYear.length <= 3 ? year : inputYear}`,
      }));
    }

    if (inputHour.length === 1 || inputSeconds.length === 1) {
      setArrayEvents(prevState => ({
        ...prevState,
        time: `${inputHour.length === 1 ? '0' + inputHour : inputHour}:${
          inputSeconds.length === 1 ? '0' + inputSeconds : inputSeconds
        }`,
      }));
    }
  };

  const handleConfirmCamps = () => {
    setArrayBlankWarning([]);
    handleConfirmOrganizationMaskInputs();
    setTextWarning(
      'Você adicionou um evento com sucesso! Deseja voltar ao menu principal ou continuar a adicionar?',
    );
    setIconWarning('done');
    setTextButtonWarningAffirmative('CONTINUAR');
    setTextButtonWarningNegative('VOLTAR');
    setShowModalWarningSucess(true);
    dispatch(ADD_EVENT(arrayEvents));
  };

  const onClickConfirmEvent = () => {
    if (handleConfirmBlankInputs()) {
      setShowModalWarningError(true);
    } else {
      handleConfirmCamps();
    }
  };

  return (
    <Modal visible={modalState} animationType="slide">
      <BodyScreen>
        <Modal visible={showModalInfo} transparent animationType="fade">
          <ContentInfo setOpen={setShowModalInfo} />
        </Modal>

        <Modal
          visible={showModalWarningSucess}
          transparent
          animationType="fade">
          <ModalWarning
            actionNegative={handleModalWarningBackHome}
            actionAffirmative={handleModalWarningAddNewEvent}
            text={textWarning}
            iconName={iconWarning}
            textButtonAffirmative={textButtonWarningAffirmative}
            textButtonNegative={textButtonWarningNegative}
          />
        </Modal>

        <Modal visible={showModalWarningError} transparent animationType="fade">
          <ModalWarning
            actionAffirmative={actionModalErrorButton}
            text={textWarning}
            iconName={iconWarning}
            arrayBlankWarnings={arrayBlankWarning}
            textButtonAffirmative={textButtonWarningAffirmative}
          />
        </Modal>

        <Container>
          <HeaderMenu
            textDate="Adicionar Evento"
            iconRight="close"
            actionRightButton={closeModal}
          />
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
                    firstRun={firstRun}
                    setFirstRun={setFirstRun}
                  />
                </DropDownCircleContainer>
                <InputTexts
                  heightStyled="40px"
                  widthStyled="75%"
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

              <InfoButton setOpen={setShowModalInfo} />
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
          <BottomMenu
            buttonExists={true}
            buttonAction={onClickConfirmEvent}
            iconButton="check"
          />
        </Container>
      </BodyScreen>
    </Modal>
  );
};
