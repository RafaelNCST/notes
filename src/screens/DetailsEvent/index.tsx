import React, { useState } from 'react';
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
import { ModalWarning } from '../../components';
import { HeaderMenu } from '../../components';
import { EDIT_EVENT } from '../../store/eventsReducer';
import { confirmUniqueTitleName } from '../../helpers/Add_Event_Functions';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { handleConfirmOrganizationMaskInputs } from '../../helpers/Add_Event_Functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DetailsEvent = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [textButtonWarningAffirmative, setTextButtonWarningAffirmative] =
    useState<string>('');
  const [textButtonWarningNegative, setTextButtonWarningNegative] =
    useState<string>('');
  const [textWarning, setTextWarning] = useState<string>('');
  const [iconWarning, setIconWarning] = useState<string>('');
  const [showModalEditOk, setShowModalEditOk] = useState<boolean>(false);
  const [showModalWarningEdit, setShowModalWarningEdit] =
    useState<boolean>(false);
  const [showModalWarningDelete, setShowModalWarningDelete] =
    useState<boolean>(false);
  const [ModalOptionsDropDown, setModalOptionsDropDown] =
    useState<boolean>(false);

  const { goBack, reset } =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const { title, time, description, category, date, circle, id } =
    useRoute<RouteProp<RootStackParamList>>()?.params || {};

  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    id: id,
    circle: circle,
    title: title,
    category: category,
    time: time,
    date: date,
    description: description,
  });

  const [actualArrayEvents, setActualArrayEvents] =
    useState<eventsProps>(arrayEvents);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.Events);

  const handleConfirmModification = () => {
    if (
      arrayEvents.circle !== circle ||
      arrayEvents.category !== category ||
      arrayEvents.date !== date ||
      arrayEvents.time !== time ||
      arrayEvents.title !== title ||
      arrayEvents.description !== description
    ) {
      setIconWarning('warning');
      setTextWarning('Você tem modificações não salvas, o que deseja fazer?');
      setTextButtonWarningAffirmative('Salvar');
      setTextButtonWarningNegative('Descartar');
      return true;
    } else {
      return false;
    }
  };

  const addEventInArray = async () => {
    const limitQuantity = 2;
    if (confirmUniqueTitleName(arrayEvents.title, data, limitQuantity)) {
      setTextWarning(
        'Ei, fica de olho que tem um título em algum evento seu igualzinho ao que você quer colocar (❁´◡`❁) (NOTE QUE ISSO É APENAS UM AVISO)',
      );
      setTextButtonWarningAffirmative('ENTENDI!');
      setIconWarning('warning');
      setShowModalEditOk(true);
    } else {
      const stringArraySavedEvents = await AsyncStorage.getItem('@ArrayEvents');
      const parsedArraySavedEvents = JSON.parse(
        stringArraySavedEvents as string,
      );
      if (parsedArraySavedEvents) {
        const newArray = parsedArraySavedEvents.map((item: eventsProps) => {
          if (item.id === id) {
            item = arrayEvents;
          }
          return item;
        });
        dispatch(EDIT_EVENT(newArray));
      }
    }
  };

  const onClickConfirmEditEvent = () => {
    handleConfirmOrganizationMaskInputs(arrayEvents, setArrayEvents);
    setTextWarning('Tudo feito');
    setIconWarning('done');
    setTextButtonWarningAffirmative('OK');
    setShowModalEditOk(true);
    addEventInArray();
  };

  const actionConfirmSaveOk = () => {
    setEditMode(false);
    setShowModalEditOk(false);
  };

  const actionConfirmErrorOk = () => {
    setShowModalEditOk(false);
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
    handleConfirmOrganizationMaskInputs(arrayEvents, setArrayEvents);
    setEditMode(false);
    setShowModalWarningEdit(false);
    addEventInArray();
  };

  const actionDeleteOption = () => {
    setIconWarning('cancel');
    setTextWarning('Você deseja mesmo excluir esse evento?');
    setTextButtonWarningAffirmative('Sim');
    setTextButtonWarningNegative('Não');
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

  return (
    <BodyScreen>
      <Modal visible={showModalWarningEdit} transparent animationType="slide">
        <ModalWarning
          iconName={iconWarning}
          text={textWarning}
          textButtonAffirmative={textButtonWarningAffirmative}
          textButtonNegative={textButtonWarningNegative}
          actionNegative={actionDiscardChanges}
          actionAffirmative={actionSaveChanges}
        />
      </Modal>

      <Modal visible={showModalWarningDelete} transparent animationType="slide">
        <ModalWarning
          iconName={iconWarning}
          text={textWarning}
          textButtonAffirmative={textButtonWarningAffirmative}
          textButtonNegative={textButtonWarningNegative}
          actionNegative={actionDeleteOptionNo}
          actionAffirmative={actionDeleteOptionYes}
        />
      </Modal>

      <Modal visible={showModalEditOk} transparent animationType="slide">
        <ModalWarning
          iconName={iconWarning}
          text={textWarning}
          textButtonAffirmative={textButtonWarningAffirmative}
          actionAffirmative={
            iconWarning === 'warning'
              ? actionConfirmErrorOk
              : actionConfirmSaveOk
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
          textDate="22 de julho de 2022"
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
