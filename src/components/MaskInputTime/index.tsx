import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { ConsumerMainContext } from '../../contexts/consumer';
import { eventsProps } from '../../store/types';
import { TextInput } from 'react-native';
import { ContainerInput, Input, SeparatorText } from './styles';

interface Props {
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  clearMaskInputs?: boolean;
  disabled?: boolean;
}

export const MaskInputTime: React.FC<Props> = ({
  arrayEvents,
  setArrayEvents,
  clearMaskInputs,
  disabled,
}) => {
  const firstInputEdit = arrayEvents?.time?.split(':')[0];
  const secondInputEdit = arrayEvents?.time?.split(':')[1];

  const [firstInput, setFirstInput] = useState<string>(firstInputEdit || '');
  const [secondInput, setSecondInput] = useState<string>(secondInputEdit || '');

  const { timeformat } = ConsumerMainContext();

  const ref_input1 = useRef<TextInput>();
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();

  const limitTimeInput = timeformat === '24 HORAS' ? 24 : 13;

  const handleOneLenght = () => {
    if (firstInput && firstInput.length === 1) {
      setFirstInput(prev => '0' + prev);
    }
    if (secondInput && secondInput.length === 1) {
      setSecondInput(prev => '0' + prev);
    }
  };

  const handleChangeTimeOne = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setFirstInput(event);
      if (event.length === 2) {
        if (parseInt(event, 10) >= limitTimeInput) {
          setFirstInput(prev => '0' + (prev ? prev[1] : ''));
          ref_input2?.current?.focus();
        } else {
          ref_input2?.current?.focus();
        }
      }
    }
  };

  const handleChangeTimeTwo = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setSecondInput(event);
      if (event.length === 0) {
        ref_input1?.current?.focus();
      } else if (event.length === 2) {
        if (parseInt(event[0], 10) >= 6) {
          setSecondInput(prev => '0' + (prev ? prev[1] : ''));
          ref_input3?.current?.focus();
        } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
          setSecondInput(prev => (prev ? prev[0] : null) + '0');
          ref_input3?.current?.focus();
        } else {
          ref_input3?.current?.focus();
        }
      }
    }
  };

  const resetInputs = () => {
    setFirstInput('');
    setSecondInput('');
  };

  useEffect(() => {
    setArrayEvents({ ...arrayEvents, time: `${firstInput}:${secondInput}` });

    if (clearMaskInputs) {
      resetInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInput, secondInput, clearMaskInputs]);

  return (
    <ContainerInput width={'60px'}>
      <Input
        disabled={disabled}
        ref={ref_input1}
        maxLength={2}
        onChangeText={(event: string) => handleChangeTimeOne(event)}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={firstInput}
      />
      <SeparatorText>:</SeparatorText>
      <Input
        disabled={disabled}
        ref={ref_input2}
        maxLength={2}
        onChangeText={(event: string) => handleChangeTimeTwo(event)}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={secondInput}
      />
    </ContainerInput>
  );
};
