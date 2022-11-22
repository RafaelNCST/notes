import React, { useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Modal } from 'react-native';
import { BottomMenu, HeaderMenu, DropDownCircle } from '../../components';
import { MaskInput } from '../../components/MaskInput';
import { DropDown } from '../../components/DropDown';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { ModalMessage } from '../../components/ModalMessage';
import { InfoButton } from './components/InfoButton';
import { useNavigation } from '@react-navigation/native';
import { ContentInfo } from './components/InfoButton';
import { RootStackParamList } from '../../routes/types';
import { DATA_CATEGORY, DATA_CIRCLE } from '../../utils';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
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
import {
  handleConfirmOrganizationMaskInputs,
  confirmUniqueTitleName,
} from '../../helpers';
import { WARNING_TYPES } from './types';
import { ADD_EVENT } from '../../store/eventsReducer';

interface Props {
  modalState: boolean;
}

export const AddEventModal: React.FC<Props> = ({ modalState }) => {
  const { t } = useTranslation();

  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [showModalWarningSucess, setShowModalWarningSucess] =
    useState<boolean>(false);
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
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [warningType, setWarningType] = useState<WARNING_TYPES>('');
  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    id: '',
    circle: 'white',
    title: '',
    category: '',
    time: '',
    date: '',
    description: '',
  });

  const { reset } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.Events);

  const theme = useTheme();

  const backToHome = () => {
    reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  const handleModalWarningAddNewEvent = () => {
    setArrayEvents({
      id: '',
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

  const actionCloseModalButton = () => {
    switch (warningType) {
      case 'error':
        setShowModalWarning(false);
        break;
      case 'warning':
        if (handleConfirmBlankInputs()) {
          setShowModalWarning(true);
        } else {
          sucessAddEvent();
        }
    }
  };

  const handleConfirmBlankInputs = () => {
    setArrayBlankWarning([]);
    if (
      arrayEvents.circle === 'white' ||
      arrayEvents.category === '' ||
      arrayEvents.date === '' ||
      arrayEvents.date === '//' ||
      arrayEvents.time === '' ||
      arrayEvents.time === ':' ||
      arrayEvents.title === ''
    ) {
      setIconWarning('warning');
      setTextWarning('Os campos a seguir estão vazios:');
      if (arrayEvents.circle === 'white') {
        setArrayBlankWarning(['Círculo de urgência']);
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
      setWarningType('error');
      setTextButtonWarningAffirmative('OK');
      return true;
    } else {
      return false;
    }
  };

  const sucessAddEvent = () => {
    setArrayBlankWarning([]);
    setArrayEvents(prevState => ({
      ...prevState,
      id: `${arrayEvents.title}-${arrayEvents.date}-${arrayEvents.time}`,
    }));
    if (arrayEvents.id) {
      handleConfirmOrganizationMaskInputs(arrayEvents, setArrayEvents);
      setTextWarning(
        'Você adicionou um evento com sucesso! Deseja voltar ao menu principal ou continuar a adicionar?',
      );
      setIconWarning('done');
      setTextButtonWarningAffirmative('CONTINUAR');
      setTextButtonWarningNegative('VOLTAR');
      setShowModalWarningSucess(true);
      dispatch(ADD_EVENT(arrayEvents));
    }
  };

  const warningsShow = () => {
    const limityQuantity = 1;
    if (confirmUniqueTitleName(arrayEvents.title, data, limityQuantity)) {
      setIconWarning('warning');
      setWarningType('warning');
      setTextWarning(
        'Ei, fica de olho que tem um título em algum evento seu igualzinho ao que você quer colocar (❁´◡`❁) (NOTE QUE ISSO É APENAS UM AVISO)',
      );
      setTextButtonWarningAffirmative('ENTENDI');
      return true;
    } else {
      return false;
    }
  };

  const onClickConfirmEvent = () => {
    setIconWarning('');
    setTextButtonWarningAffirmative('');
    setTextButtonWarningNegative('');
    setTextWarning('');
    setArrayBlankWarning([]);
    if (warningsShow()) {
      setShowModalWarning(true);
    } else {
      if (handleConfirmBlankInputs()) {
        setShowModalWarning(true);
      } else {
        sucessAddEvent();
      }
    }
  };

  return (
    <Modal visible={modalState} animationType="slide" transparent>
      <BodyScreen>
        <Modal visible={showModalInfo} transparent animationType="fade">
          <ContentInfo setOpen={setShowModalInfo} />
        </Modal>

        <Modal
          visible={showModalWarningSucess}
          transparent
          animationType="fade">
          <ModalMessage
            actionNegative={backToHome}
            actionAffirmative={handleModalWarningAddNewEvent}
            text={textWarning}
            iconName={iconWarning}
            textButtonAffirmative={textButtonWarningAffirmative}
            textButtonNegative={textButtonWarningNegative}
          />
        </Modal>

        <Modal visible={showModalWarning} transparent animationType="fade">
          <ModalMessage
            actionAffirmative={actionCloseModalButton}
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
            actionRightButton={backToHome}
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
                  placeholder={t('Um título para se lembrar!')}
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
                  {t('Categoria')}:{' '}
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
                  {t('Horário')}:
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
                  {t('Data')}:
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
                  placeholder={t('Descreve seu compromisso ai cara!')}
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
