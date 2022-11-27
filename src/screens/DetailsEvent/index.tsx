import React, { useState, useEffect } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { Container } from './styles';
import { BottomMenu } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useRoute } from '@react-navigation/native';
import { EditContent, ViewContent } from './RenderContent';
import { eventsProps } from '../../store/types';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { DropDownModal } from './components/DropDownModal';
import { Modal } from 'react-native';
import { ModalMessage } from '../../components';
import { HeaderMenu } from '../../components';
import { EDIT_EVENT } from '../../store/eventsReducer';
import { MODAL_MESSAGES, MODAL_TEXT_BUTTONS } from '../../utils';
import { typeWarning, typeError } from '../AddEventModal';
import {
  handleConfirmOrganizationMaskInputs,
  checkErrors,
  checkWarnings,
} from '../../helpers';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { WARNING_TYPES } from '../AddEventModal/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DetailsEvent = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [textButtonMessageAffirmative, setTextButtonMessageAffirmative] =
    useState<string>('');
  const [controlModal, setControlModal] = useState<boolean>(false);
  const [error, setError] = useState<typeError>('');
  const [warning, setWarning] = useState<typeWarning>('');
  const [textButtonMessageNegative, setTextButtonMessageNegative] =
    useState<string>('');
  const [textMessage, setTextMessage] = useState<string>('');
  const [arrayBlankError, setArrayBlankError] = useState<string[]>([]);
  const [iconMessage, setIconMessage] = useState<string>('');
  const [showModalEditOk, setShowModalEditOk] = useState<boolean>(false);
  const [showModalWarningEdit, setShowModalWarningEdit] =
    useState<boolean>(false);
  const [messageType, setMessageType] = useState<WARNING_TYPES>('');
  const [showModalWarningDelete, setShowModalWarningDelete] =
    useState<boolean>(false);
  const [ModalOptionsDropDown, setModalOptionsDropDown] =
    useState<boolean>(false);

  const { goBack, reset } =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    title,
    time,
    description,
    category,
    date,
    circle,
    id,
    assistTimeFormat,
  } = useRoute<RouteProp<RootStackParamList>>()?.params || {};

  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    id: id,
    circle: circle,
    title: title,
    category: category,
    time: time,
    date: date,
    description: description,
    assistTimeFormat: assistTimeFormat,
  });

  const [actualArrayEvents, setActualArrayEvents] =
    useState<eventsProps>(arrayEvents);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.Events);

  const actionConfirmSaveOk = () => {
    setEditMode(false);
    setShowModalEditOk(false);
    setError('');
    setWarning('');
    setControlModal(false);
  };

  const actionConfirmErrorOk = () => {
    setShowModalEditOk(false);
    setError('');
    setWarning('');
    setControlModal(false);
  };

  const openOptionsModalDropDown = () => {
    setModalOptionsDropDown(!ModalOptionsDropDown);
  };

  const actionEditOption = () => {
    setActualArrayEvents(arrayEvents);
    setEditMode(true);
    setModalOptionsDropDown(false);
  };

  const cancelEditMode = () => {
    if (handleConfirmModification()) {
      setShowModalWarningEdit(true);
    } else {
      setEditMode(false);
    }
  };

  const actionDiscardChanges = () => {
    setEditMode(false);
    setShowModalWarningEdit(false);
    setArrayEvents(actualArrayEvents);
  };

  const actionSaveChanges = () => {
    setShowModalWarningEdit(false);
    setControlModal(true);
  };

  const actionDeleteOption = () => {
    setIconMessage(MODAL_MESSAGES.WARNING.ICON);
    setTextMessage(MODAL_MESSAGES.WARNING.CONFIRM_DELETED);
    setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.SIM);
    setTextButtonMessageNegative(MODAL_TEXT_BUTTONS.NAO);
    setModalOptionsDropDown(false);
    setShowModalWarningDelete(true);
  };

  const actionDeleteOptionYes = () => {
    const newArray = data.filter(item => item.id !== id);
    dispatch(EDIT_EVENT(newArray));
    setShowModalWarningDelete(false);
    reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  const actionDeleteOptionNo = () => {
    setShowModalWarningDelete(false);
  };

  const handleConfirmModification = () => {
    if (
      arrayEvents.circle !== circle ||
      arrayEvents.category !== category ||
      arrayEvents.date !== date ||
      arrayEvents.time !== time ||
      arrayEvents.title !== title ||
      arrayEvents.description !== description
    ) {
      setIconMessage(MODAL_MESSAGES.WARNING.ICON);
      setTextMessage(MODAL_MESSAGES.WARNING.CONFIRM_CHANGES);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.SALVAR);
      setTextButtonMessageNegative(MODAL_TEXT_BUTTONS.DESCARTAR);
      return true;
    } else {
      return false;
    }
  };

  const addEventInArray = async () => {
    const stringArraySavedEvents = await AsyncStorage.getItem('@ArrayEvents');
    const parsedArraySavedEvents = JSON.parse(stringArraySavedEvents as string);
    if (parsedArraySavedEvents) {
      const newArray = parsedArraySavedEvents.map((item: eventsProps) => {
        if (item.id === id) {
          item = arrayEvents;
        }
        return item;
      });
      dispatch(EDIT_EVENT(newArray));
    }
  };

  const onClickConfirmEditEvent = () => {
    if (checkErrors(arrayEvents, setArrayBlankError, data, setError)) {
      setIconMessage(MODAL_MESSAGES.ERROR.ICON);
      setMessageType(MODAL_MESSAGES.ERROR.TYPE);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.OK);
    } else if (checkWarnings(arrayEvents, data, setWarning)) {
      setIconMessage(MODAL_MESSAGES.WARNING.ICON);
      setMessageType(MODAL_MESSAGES.WARNING.TYPE);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.ENTENDI);
    } else {
      handleConfirmOrganizationMaskInputs(arrayEvents, setArrayEvents);
      setTextMessage(MODAL_MESSAGES.SUCESS.EDIT_SUCESS);
      setIconMessage(MODAL_MESSAGES.SUCESS.ICON);
      setTextButtonMessageAffirmative(MODAL_TEXT_BUTTONS.OK);
      setShowModalEditOk(true);
      addEventInArray();
    }
  };

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
      setShowModalEditOk(true);
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
      setShowModalEditOk(true);
    }
  }, [warning]);

  useEffect(() => {
    if (controlModal) {
      onClickConfirmEditEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlModal]);

  return (
    <BodyScreen>
      <Modal visible={showModalWarningEdit} transparent animationType="slide">
        <ModalMessage
          iconName={iconMessage}
          text={textMessage}
          textButtonAffirmative={textButtonMessageAffirmative}
          textButtonNegative={textButtonMessageNegative}
          actionNegative={actionDiscardChanges}
          actionAffirmative={actionSaveChanges}
        />
      </Modal>

      <Modal visible={showModalWarningDelete} transparent animationType="slide">
        <ModalMessage
          iconName={iconMessage}
          text={textMessage}
          textButtonAffirmative={textButtonMessageAffirmative}
          textButtonNegative={textButtonMessageNegative}
          actionNegative={actionDeleteOptionNo}
          actionAffirmative={actionDeleteOptionYes}
        />
      </Modal>

      <Modal visible={showModalEditOk} transparent animationType="slide">
        <ModalMessage
          iconName={iconMessage}
          text={textMessage}
          textButtonAffirmative={textButtonMessageAffirmative}
          arrayBlankError={arrayBlankError}
          actionAffirmative={
            messageType === 'error' ? actionConfirmErrorOk : actionConfirmSaveOk
          }
        />
      </Modal>

      <Container>
        <DropDownModal
          open={ModalOptionsDropDown}
          setOpen={setModalOptionsDropDown}
          actionEditOption={actionEditOption}
          actionDeleteOption={actionDeleteOption}
        />

        <HeaderMenu
          textDate="Detalhes do evento"
          iconLeft="arrow-back-ios"
          iconRight={editMode ? 'cancel' : 'more-horiz'}
          actionRightButton={
            editMode ? cancelEditMode : openOptionsModalDropDown
          }
          actionLeftButton={goBack}
        />
        {editMode ? (
          <EditContent
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
          />
        ) : (
          <ViewContent {...arrayEvents} />
        )}
        <BottomMenu
          buttonExists={editMode ? true : false}
          buttonAction={editMode ? onClickConfirmEditEvent : undefined}
          iconButton={editMode ? 'check' : undefined}
        />
      </Container>
    </BodyScreen>
  );
};
