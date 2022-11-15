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

export const DetailsEvent = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [textButtonWarningAffirmative, setTextButtonWarningAffirmative] =
    useState<string>('');
  const [textButtonWarningNegative, setTextButtonWarningNegative] =
    useState<string>('');
  const [textWarning, setTextWarning] = useState<string>('');
  const [iconWarning, setIconWarning] = useState<string>('');
  const [showModalEditSucess, setShowModalEditSucess] =
    useState<boolean>(false);
  const [showModalWarningEdit, setShowModalWarningEdit] =
    useState<boolean>(false);
  const [showModalWarningDelete, setShowModalWarningDelete] =
    useState<boolean>(false);
  const [ModalOptionsDropDown, setModalOptionsDropDown] =
    useState<boolean>(false);

  const { goBack, reset } =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const { title, time, description, category, date, circle } =
    useRoute<RouteProp<RootStackParamList>>()?.params || {};
  const [arrayEvents, setArrayEvents] = useState<eventsProps>({
    circle: circle,
    title: title,
    category: category,
    time: time,
    date: date,
    description: description,
  });

  const dateToday = new Date();

  const dispatch = useAppDispatch();

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
  //   setTimeout(() => setClearMaskInputs(false), 500);
  //   closeModalWarning();
  // };

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

  const handleConfirmOrganizationMaskInputs = () => {
    const year = dateToday.getFullYear();
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

  const onClickConfirmEditEvent = () => {
    handleConfirmOrganizationMaskInputs();
    setTextWarning('Tudo feito');
    setIconWarning('done');
    setTextButtonWarningAffirmative('OK');
    setShowModalEditSucess(true);
    //Aqui faz a edição no Async
  };

  const actionConfirmSaveOk = () => {
    setEditMode(false);
    setShowModalEditSucess(false);
    console.log('Salvou com estilo');
  };

  const openOptionsModalDropDown = () => {
    setModalOptionsDropDown(!ModalOptionsDropDown);
  };

  const actionEditOption = () => {
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
    setArrayEvents({
      circle: circle,
      title: title,
      category: category,
      time: time,
      date: date,
      description: description,
    });
    setEditMode(false);
    setShowModalWarningEdit(false);
  };

  const actionSaveChanges = () => {
    handleConfirmOrganizationMaskInputs();
    setEditMode(false);
    setShowModalWarningEdit(false);
    console.log('SALVOUUUU');
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
    console.log('Excluiuuu');
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
          actionNegative={actionDeleteOptionYes}
          actionAffirmative={actionDeleteOptionNo}
        />
      </Modal>

      <Modal visible={showModalEditSucess} transparent animationType="slide">
        <ModalWarning
          iconName={iconWarning}
          text={textWarning}
          textButtonAffirmative={textButtonWarningAffirmative}
          actionAffirmative={actionConfirmSaveOk}
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
          <ViewContent
            title={title}
            time={time}
            description={description}
            category={category}
            date={date}
            circle={circle}
          />
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
