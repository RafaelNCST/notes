import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { eventsProps } from '../../../../store/types';
import { TextInput } from 'react-native';
import { ContainerInput, Input, SeparatorText } from './styles';
import { DATA_MASK_MONTH, February } from '../../../../helpers/monthMask';

interface Props {
  separator: string;
  linesNumber: number;
  type: string;
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  clearMaskInputs: boolean;
}

export const MaskInput: React.FC<Props> = ({
  separator,
  linesNumber,
  type,
  arrayEvents,
  setArrayEvents,
  clearMaskInputs,
}) => {
  const [firstInput, setFirstInput] = useState<string>('');
  const [secondInput, setSecondInput] = useState<string>('');
  const [thirdInput, setThirdInput] = useState<string>('');

  const date = new Date();

  const ref_input1 = useRef<TextInput>();
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();

  const handleOneLenght = () => {
    const year = date.getFullYear();
    if (firstInput && firstInput.length === 1) {
      setFirstInput(prev => '0' + prev);
    }
    if (secondInput && secondInput.length === 1) {
      setSecondInput(prev => '0' + prev);
    }
    if (thirdInput && thirdInput.length <= 3) {
      setThirdInput(String(year));
    }
  };

  const handleChangeTimeOne = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setFirstInput(event);
      if (event.length === 2) {
        if (parseInt(event, 10) >= 23) {
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

  const handleChangeDateDay = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setFirstInput(event);
      if (event.length === 2) {
        if (parseInt(event, 10) >= 32) {
          setFirstInput('31');
          ref_input2?.current?.focus();
        } else {
          ref_input2?.current?.focus();
        }
      }
    }
  };

  const handleChangeDateMonth = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setSecondInput(event);
      if (event.length === 0) {
        ref_input1?.current?.focus();
      } else if (event.length === 2) {
        if (parseInt(event, 10) >= 13) {
          setSecondInput(prev => '0' + (prev ? prev[1] : ''));
          ref_input3?.current?.focus();
        } else {
          ref_input3?.current?.focus();
        }

        if (event === '02' && firstInput && parseInt(firstInput, 10) >= 29) {
          setFirstInput('29');
        } else if (firstInput && parseInt(firstInput, 10) === 31) {
          const number = String(event);
          setFirstInput(DATA_MASK_MONTH[number]);
        }
      }
    }
  };

  const handleChangeDateYear = (event: string) => {
    const year = date.getFullYear();
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setThirdInput(event);
      if (event.length === 0) {
        ref_input2?.current?.focus();
      } else if (event.length === 4) {
        if (parseInt(event, 10) < year) {
          setThirdInput(String(year));
        }

        if (secondInput === '02' && firstInput === '29') {
          setFirstInput(February(event));
        }
      }
    }
  };

  const resetInputs = () => {
    setFirstInput('');
    setSecondInput('');
    setThirdInput('');
  };

  useEffect(() => {
    if (type === 'time') {
      setArrayEvents({ ...arrayEvents, time: `${firstInput}:${secondInput}` });
    } else {
      setArrayEvents({
        ...arrayEvents,
        date: `${firstInput}/${secondInput}/${thirdInput}`,
      });
    }

    if (clearMaskInputs) {
      resetInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInput, secondInput, thirdInput, clearMaskInputs]);

  return (
    <ContainerInput width={linesNumber === 2 ? '60px' : '105px'}>
      <Input
        ref={ref_input1}
        maxLength={2}
        onChangeText={(event: string) => {
          if (type === 'time') {
            handleChangeTimeOne(event);
          } else {
            handleChangeDateDay(event);
          }
        }}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={firstInput}
      />
      <SeparatorText>{separator}</SeparatorText>
      <Input
        ref={ref_input2}
        maxLength={2}
        onChangeText={(event: string) => {
          if (type === 'time') {
            handleChangeTimeTwo(event);
          } else {
            handleChangeDateMonth(event);
          }
        }}
        onBlur={handleOneLenght}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={secondInput}
      />
      {linesNumber > 2 && (
        <>
          <SeparatorText>{separator}</SeparatorText>
          <Input
            ref={ref_input3}
            maxLength={4}
            onChangeText={(event: string) => handleChangeDateYear(event)}
            onBlur={handleOneLenght}
            blurOnSubmit={false}
            style={{ width: 35 }}
            keyboardType="numeric"
            value={thirdInput}
          />
        </>
      )}
    </ContainerInput>
  );
};
