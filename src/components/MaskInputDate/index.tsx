import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { eventsProps } from '../../store/types';
import { TextInput } from 'react-native';
import { ContainerInput, Input, SeparatorText } from './styles';
import { ConsumerMainContext } from '../../contexts/consumer';
import Momentz from 'moment-timezone';
import { DATA_MASK_MONTH, February } from '../../helpers';

interface Props {
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  clearMaskInputs?: boolean;
  disabled?: boolean;
}

export const MaskInputDate: React.FC<Props> = ({
  arrayEvents,
  setArrayEvents,
  clearMaskInputs,
  disabled,
}) => {
  const firstInputEdit = arrayEvents?.date?.split('/')[0];
  const secondInputEdit = arrayEvents?.date?.split('/')[1];
  const thirdInputEdit = arrayEvents?.date?.split('/')[2];
  const { dateTypeLocal } = ConsumerMainContext();

  const actualMoment = Momentz.tz('America/Manaus');

  const [firstInput, setFirstInput] = useState<string>(firstInputEdit || '');
  const [secondInput, setSecondInput] = useState<string>(secondInputEdit || '');
  const [yearInput, setYearInput] = useState<string>(thirdInputEdit || '');

  const ref_input1 = useRef<TextInput>();
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();

  const handleOneLenght = () => {
    const year = actualMoment.year();
    if (firstInput && firstInput.length === 1) {
      setFirstInput(prev => '0' + prev);
    }
    if (secondInput && secondInput.length === 1) {
      setSecondInput(prev => '0' + prev);
    }
    if (yearInput && yearInput.length <= 3) {
      setYearInput(String(year));
    }
  };

  const handleChangeDateDay = (
    event: string,
    setChange: Dispatch<SetStateAction<string>>,
    Nextposition: React.RefObject<any>,
    BackPosition: React.RefObject<any> | null,
  ) => {
    if (/[a-zA-Z]/.test(event)) {
      setChange('');
    } else {
      setChange(event);
      if (event.length === 0 && BackPosition !== null) {
        BackPosition?.current?.focus();
      } else if (event.length === 2) {
        if (parseInt(event, 10) >= 32) {
          setChange('31');
          Nextposition?.current?.focus();
        } else {
          Nextposition?.current?.focus();
        }
      }
    }
  };

  const handleChangeDateMonth = (
    event: string,
    setChange: Dispatch<SetStateAction<string>>,
    Nextposition: React.RefObject<any>,
    BackPosition: React.RefObject<any>,
  ) => {
    if (/[a-zA-Z]/.test(event)) {
      setChange('');
    } else {
      setChange(event);
      if (event.length === 0) {
        BackPosition?.current?.focus();
      } else if (event.length === 2) {
        if (parseInt(event, 10) >= 13) {
          setChange(prev => '0' + (prev ? prev[1] : ''));
          Nextposition?.current?.focus();
        } else {
          Nextposition?.current?.focus();
        }

        if (event === '02' && firstInput && parseInt(firstInput, 10) >= 29) {
          setChange('29');
        } else if (firstInput && parseInt(firstInput, 10) === 31) {
          const number = String(event);
          setChange(DATA_MASK_MONTH[number]);
        }
      }
    }
  };

  const onChangeTextYear = (event: string) => {
    const year = actualMoment.year();
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setYearInput(event);
      if (event.length === 0) {
        ref_input2?.current?.focus();
      } else if (event.length === 4) {
        if (parseInt(event, 10) < year) {
          setYearInput(String(year));
        }

        if (secondInput === '02' && firstInput === '29') {
          setFirstInput(February(event));
        }
      }
    }
  };

  const onChangeTextInputOne = (event: string) => {
    if (dateTypeLocal === 'EUA(mês-dia-ano)') {
      handleChangeDateMonth(event, setFirstInput, ref_input2, ref_input1);
    } else if (dateTypeLocal === 'Brasil(dia-mês-ano)') {
      handleChangeDateDay(event, setFirstInput, ref_input2, null);
    }
  };

  const onChangeTextInputTwo = (event: string) => {
    if (dateTypeLocal === 'EUA(mês-dia-ano)') {
      handleChangeDateDay(event, setSecondInput, ref_input3, ref_input1);
    } else if (dateTypeLocal === 'Brasil(dia-mês-ano)') {
      handleChangeDateMonth(event, setSecondInput, ref_input3, ref_input1);
    }
  };

  const resetInputs = () => {
    setFirstInput('');
    setSecondInput('');
    setYearInput('');
  };

  useEffect(() => {
    setArrayEvents({
      ...arrayEvents,
      date: `${firstInput}/${secondInput}/${yearInput}`,
    });

    if (clearMaskInputs) {
      resetInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInput, secondInput, yearInput, clearMaskInputs]);

  return (
    <ContainerInput width={'105px'}>
      <Input
        disabled={disabled}
        ref={ref_input1}
        maxLength={2}
        onChangeText={(event: string) => onChangeTextInputOne(event)}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={firstInput}
      />
      <SeparatorText>/</SeparatorText>
      <Input
        disabled={disabled}
        ref={ref_input2}
        maxLength={2}
        onChangeText={(event: string) => onChangeTextInputTwo(event)}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={secondInput}
      />
      <SeparatorText>/</SeparatorText>
      <Input
        disabled={disabled}
        ref={ref_input3}
        maxLength={4}
        onChangeText={(event: string) => onChangeTextYear(event)}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        style={{ width: 35 }}
        keyboardType="numeric"
        value={yearInput}
      />
    </ContainerInput>
  );
};
