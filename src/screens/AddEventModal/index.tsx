import React, { useEffect, useState } from 'react';
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
import {
  DATA_CATEGORY,
  DATA_CIRCLE,
  MODAL_MESSAGES,
  MODAL_TEXT_BUTTONS,
} from '../../utils';
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
  checkWarnings,
  checkErrors,
} from '../../helpers';
import { WARNING_TYPES } from './types';
import { ADD_EVENT } from '../../store/eventsReducer';

interface Props {
  modalState: boolean;
}

const limityQuantity = 1;

export const AddEventModal: React.FC<Props> = ({ modalState }) => {
  const [focusTitle, setFocusTitle] = useState<boolean>(false);
  const [focusDescription, setFocusDescription] = useState<boolean>(false);
  const [showModalInfo, setShowModalInfo] = useState<boolean>(false);
  const [showModalSucess, setShowModalSucess] = useState<boolean>(false);
  const [showModalWarningAndError, setShowModalWarningAndError] =
    useState<boolean>(false);
  const [clearMaskInputs, setClearMaskInputs] = useState<boolean>(false);
  const [clearDropDown, setClearDropDown] = useState<boolean>(true);
  const [textButtonMessageAffirmative, setTextButtonMessageAffirmative] =
    useState<string>('');
  const [textButtonMessageNegative, setTextButtonMessageNegative] =
    useState<string>('');
  const [textMessage, setTextMessage] = useState<string>('');
  const [arrayBlankError, setArrayBlankError] = useState<string[]>([]);
  const [iconMessage, setIconMessage] = useState<string>('');
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<WARNING_TYPES>('');
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
  const { data } = useAppSelector(store => store.Events);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const theme = useTheme();

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

  const actionCloseModalButton = () => {
    if (messageType === MODAL_MESSAGES.ERROR.TYPE) {
      setShowModalWarningAndError(false);
    } else if (messageType === MODAL_MESSAGES.WARNING.TYPE) {
      setShowModalWarningAndError(true);
      sucessAddId();
    }
  };

  const sucessAddId = () => {
    setArrayBlankError([]);
    setArrayEvents(prevState => ({
      ...prevState,
      id: `${arrayEvents.title}-${arrayEvents.date}-${arrayEvents.time}`,
    }));
  };

  const onClickConfirmAddEvent = () => {
    if (checkErrors(arrayEvents, setArrayBlankError)) {
      setIconMessage(MODAL_MESSAGES.ERROR.ICON);
      setTextMessage(MODAL_MESSAGES.ERROR.BLANK);
      setMessageType(MODAL_MESSAGES.ERROR.TYPE);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.OK);
      setShowModalWarningAndError(true);
    } else if (checkWarnings(arrayEvents, data, limityQuantity)) {
      setIconMessage(MODAL_MESSAGES.WARNING.ICON);
      setMessageType(MODAL_MESSAGES.WARNING.TYPE);
      setTextMessage(MODAL_MESSAGES.WARNING.DUPLICATED);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.ENTENDI);
      setShowModalWarningAndError(true);
    } else {
      sucessAddId();
    }
  };

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

        <Container>
          <HeaderMenu
            textDate="Adicionar Evento"
            iconRight="close"
            actionRightButton={actionButtonBackToHome}
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
            buttonAction={onClickConfirmAddEvent}
            iconButton="check"
          />
        </Container>
      </BodyScreen>
    </Modal>
  );
};
