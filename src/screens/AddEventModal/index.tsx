import React, { useEffect, useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Modal } from 'react-native';
import {
  BottomMenu,
  HeaderMenu,
  DropDownCircle,
  DropDown,
  MaskInputDate,
  MaskInputTime,
} from '../../components';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { ModalMessage } from '../../components/ModalMessage';
import { InfoButton } from './components/InfoButton';
import { useNavigation } from '@react-navigation/native';
import { ContentInfo } from './components/InfoButton';
import { RootStackParamList } from '../../routes/types';
import { ConsumerMainContext } from '../../contexts/consumer';
import {
  DATA_CATEGORY,
  DATA_CIRCLE,
  MODAL_MESSAGES,
  MODAL_TEXT_BUTTONS,
  DATE_LOCAL_LIST,
} from '../../utils';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import momentz from 'moment';
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
  ContainerDropDown,
} from './styles';
import { eventsProps } from '../../store/types';
import {
  handleConfirmOrganizationMaskInputs,
  checkWarnings,
  checkErrors,
} from '../../helpers';
import { WARNING_TYPES } from './types';
import { DropDownExtra } from './components/DropDown';
import { ADD_EVENT } from '../../store/eventsReducer';

interface Props {
  modalState: boolean;
}

const DATA_FORMAT_AMPM = ['AM', 'PM'];

export type typeError = 'BLANK' | 'DUPLICATED_ID' | '';
export type typeWarning = 'DUPLICATED_TITLE' | 'DUPLICATED_TIME_DATE' | '';

export const AddEventModal: React.FC<Props> = ({ modalState }) => {
  const { dateTypeLocal, timeformat } = ConsumerMainContext();

  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [showModalSucess, setShowModalSucess] = useState<boolean>(false);
  const [showModalWarningAndError, setShowModalWarningAndError] =
    useState<boolean>(false);
  const [
    showModalConfirmCloseModalAddEvent,
    setShowModalConfirmCloseModalAddEvent,
  ] = useState<boolean>(false);
  const [clearMaskInputs, setClearMaskInputs] = useState<boolean>(false);
  const [clearDropDown, setClearDropDown] = useState<boolean>(true);
  const [textButtonMessageAffirmative, setTextButtonMessageAffirmative] =
    useState<string>('');
  const [textButtonMessageNegative, setTextButtonMessageNegative] =
    useState<string>('');
  const [textMessage, setTextMessage] = useState<string>('');
  const [error, setError] = useState<typeError>('');
  const [arrayBlankError, setArrayBlankError] = useState<string[]>([]);
  const [iconMessage, setIconMessage] = useState<string>('');
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [warning, setWarning] = useState<typeWarning>('');
  const [messageType, setMessageType] = useState<WARNING_TYPES>('');
  const [indicatorTimeFormat, setIndicatorTimeFormat] = useState<string>('AM');
  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    id: '',
    circle: 'white',
    title: '',
    category: '',
    time: '',
    date: '',
    description: '',
  });

  moment.locale(DATE_LOCAL_LIST[dateTypeLocal]);

  const { reset } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data } = useAppSelector(store => store.Events);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const actualMoment = momentz.tz('America/Manaus');

  const closeTheScreen = () => {
    if (
      arrayEvents.circle === 'white' &&
      arrayEvents.category === '' &&
      (arrayEvents.date === '' || arrayEvents.date === '//') &&
      (arrayEvents.time === '' || arrayEvents.time === ':') &&
      arrayEvents.title === ''
    ) {
      actionButtonBackToHome();
    } else {
      setIconMessage(MODAL_MESSAGES.WARNING.ICON);
      setTextMessage(MODAL_MESSAGES.WARNING.CONFIRM_CHANGES_ADD_EVENT);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.SIM);
      setTextButtonMessageNegative(MODAL_TEXT_BUTTONS.NAO);
      setShowModalConfirmCloseModalAddEvent(true);
    }
  };

  const actionButtonCloseModalWarningCloseScreen = () => {
    setShowModalConfirmCloseModalAddEvent(false);
  };

  const actionButtonBackToHome = () => {
    reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  const actionButtonContinueAddEvent = () => {
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
    setShowModalSucess(false);
    setClearDropDown(true);
  };

  const sucessAddId = () => {
    setArrayBlankError([]);
    setArrayEvents(prevState => ({
      ...prevState,
      id: `${actualMoment.format('L')}-${actualMoment.format(
        'LTS',
      )}-${Math.floor(Math.random() * 10000)}`,
    }));
  };

  const actionCloseModalButton = () => {
    if (messageType === MODAL_MESSAGES.ERROR.TYPE) {
      setShowModalWarningAndError(false);
      setError('');
    } else if (messageType === MODAL_MESSAGES.WARNING.TYPE) {
      setShowModalWarningAndError(false);
      setWarning('');
      sucessAddId();
    }
  };

  const onClickConfirmAddEvent = () => {
    if (checkErrors(arrayEvents, setArrayBlankError, data, setError)) {
      setIconMessage(MODAL_MESSAGES.ERROR.ICON);
      setMessageType(MODAL_MESSAGES.ERROR.TYPE);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.OK);
    } else if (checkWarnings(arrayEvents, data, setWarning)) {
      setIconMessage(MODAL_MESSAGES.WARNING.ICON);
      setMessageType(MODAL_MESSAGES.WARNING.TYPE);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.ENTENDI);
    } else {
      sucessAddId();
    }
  };

  //SUCESSOOOOOOO
  useEffect(() => {
    if (arrayEvents.id) {
      handleConfirmOrganizationMaskInputs(arrayEvents, setArrayEvents);
      setTextMessage(MODAL_MESSAGES.SUCESS.ADD_SUCESS);
      setIconMessage(MODAL_MESSAGES.SUCESS.ICON);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.CONTINUAR);
      setTextButtonMessageNegative(MODAL_TEXT_BUTTONS.VOLTAR);
      setShowModalSucess(true);
      dispatch(ADD_EVENT(arrayEvents));
    }
  }, [arrayEvents.id, arrayEvents, dispatch]);

  //Verificar o Texto de error.
  useEffect(() => {
    if (error) {
      switch (error) {
        case 'BLANK':
          setTextMessage(MODAL_MESSAGES.ERROR.BLANK);
          break;
        case 'DUPLICATED_ID':
          setTextMessage(MODAL_MESSAGES.ERROR.DUPLICATED_ID);
          break;
      }
      setShowModalWarningAndError(true);
    }
  }, [error]);

  //Verificar o Texto de warning.
  useEffect(() => {
    if (warning) {
      switch (warning) {
        case 'DUPLICATED_TIME_DATE':
          setTextMessage(MODAL_MESSAGES.WARNING.DUPLICATED_TIME_AND_DATE);
          break;
        case 'DUPLICATED_TITLE':
          setTextMessage(MODAL_MESSAGES.WARNING.DUPLICATED_TITLE);
          break;
      }
      setShowModalWarningAndError(true);
    }
  }, [warning]);

  return (
    <Modal visible={modalState} animationType="slide" transparent>
      <BodyScreen>
        <Modal visible={showModalInfo} transparent animationType="fade">
          <ContentInfo setOpen={setShowModalInfo} />
        </Modal>

        <Modal visible={showModalSucess} transparent animationType="fade">
          <ModalMessage
            actionNegative={actionButtonBackToHome}
            actionAffirmative={actionButtonContinueAddEvent}
            text={textMessage}
            iconName={iconMessage}
            textButtonAffirmative={textButtonMessageAffirmative}
            textButtonNegative={textButtonMessageNegative}
          />
        </Modal>

        <Modal
          visible={showModalWarningAndError}
          transparent
          animationType="fade">
          <ModalMessage
            actionAffirmative={actionCloseModalButton}
            text={textMessage}
            iconName={iconMessage}
            arrayBlankError={arrayBlankError}
            textButtonAffirmative={textButtonMessageAffirmative}
          />
        </Modal>

        <Modal
          visible={showModalConfirmCloseModalAddEvent}
          transparent
          animationType="fade">
          <ModalMessage
            actionAffirmative={actionButtonBackToHome}
            actionNegative={actionButtonCloseModalWarningCloseScreen}
            text={textMessage}
            iconName={iconMessage}
            textButtonAffirmative={textButtonMessageAffirmative}
            textButtonNegative={textButtonMessageNegative}
          />
        </Modal>

        <Container>
          <HeaderMenu
            textDate="Adicionar Evento"
            iconRight="close"
            actionRightButton={closeTheScreen}
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

              <ContainerDropDown>
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
              </ContainerDropDown>
              <ContainerTexts>
                <TextRegular
                  accessibilityRole="Text"
                  accessibilityLabel="Horário">
                  {t('Horário')}:
                </TextRegular>
                <MaskInputTime
                  arrayEvents={arrayEvents}
                  setArrayEvents={setArrayEvents}
                  clearMaskInputs={clearMaskInputs}
                />
                {timeformat === 'AM/PM' ? (
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
            buttonAction={onClickConfirmAddEvent}
            iconButton="check"
          />
        </Container>
      </BodyScreen>
    </Modal>
  );
};
