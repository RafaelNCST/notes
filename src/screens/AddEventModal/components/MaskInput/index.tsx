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
import { DATA_MASK_MONTH } from '../../../../helpers/monthMask';

interface Props {
  separator: string;
  linesNumber: number;
  type: string;
  arrayEvents: eventsProps;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
}

export const MaskInput: React.FC<Props> = ({
  separator,
  linesNumber,
  type,
  arrayEvents,
  setArrayEvents,
}) => {
  const [firstInput, setFirstInput] = useState<string | null>(null);
  const [secondInput, setSecondInput] = useState<string | null>(null);
  const [thirdInput, setThirdInput] = useState<string | null>(null);

  const date = new Date();

  const ref_input1 = useRef<TextInput>();
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();

  const handleChangeTimeOne = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setFirstInput(event);
      if (event.length === 2) {
        if (parseInt(event, 10) >= 23) {
          setFirstInput(prev => '0' + (prev ? prev[1] : null));
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
          setSecondInput(prev => '0' + (prev ? prev[1] : null));
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
          setSecondInput(prev => '0' + (prev ? prev[1] : null));
          ref_input3?.current?.focus();
        } else {
          ref_input3?.current?.focus();
        }

        if (event === '02' && parseInt(firstInput, 10) >= 29) {
          setFirstInput(prev => prev);
        } else if (parseInt(firstInput, 10) === 31) {
          setFirstInput(DATA_MASK_MONTH[String(event)]);
        }
      }
    }
  };

  const handleChangeDateYear = (event: string) => {
    if (/[a-zA-Z]/.test(event)) {
      setSecondInput('');
    } else {
      setThirdInput(event);
      if (event.length === 0) {
        ref_input2?.current?.focus();
      } else if (event.length === 4) {
        if (parseInt(event, 10) < date.getFullYear()) {
          setThirdInput('2022');
        }

        if (secondInput === '02' && firstInput === '29') {
          setFirstInput(DATA_MASK_MONTH['02'](event));
        }
      }
    }
  };

  useEffect(() => {
    if (firstInput || secondInput) {
      setArrayEvents({ ...arrayEvents, time: `${firstInput}:${secondInput}` });
    }

    if (thirdInput) {
      setArrayEvents({
        ...arrayEvents,
        date: `${firstInput}/${secondInput}/${thirdInput}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInput, secondInput, thirdInput]);

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
