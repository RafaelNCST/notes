import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { ContainerInput, Input, SeparatorText } from './styles';

interface Props {
  separator: string;
  linesNumber: number;
  type: string;
}

export const MaskInput: React.FC<Props> = ({
  separator,
  linesNumber,
  type,
}) => {
  const [firstInput, setFirstInput] = useState<string>();
  const [secondInput, setSecondInput] = useState<string>();

  const ref_input1 = useRef<TextInput>();
  const ref_input2 = useRef<TextInput>();
  const ref_input3 = useRef<TextInput>();

  const handleChangeTimeOne = (event: string) => {
    setFirstInput(event);
    if (event.length === 2) {
      if (parseInt(event[0], 10) >= 3) {
        setFirstInput(prev => '0' + prev[1]);
        ref_input2?.current?.focus();
      } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
        setFirstInput(prev => prev[0] + '0');
        ref_input2?.current?.focus();
      } else {
        ref_input2?.current?.focus();
      }
    }
  };

  const handleChangeTimeTwo = (event: string) => {
    setSecondInput(event);
    if (event.length === 0) {
      ref_input1?.current?.focus();
    } else if (event.length === 2) {
      if (parseInt(event[0], 10) >= 6) {
        setSecondInput(prev => '0' + prev[1]);
        ref_input3?.current?.focus();
      } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
        setSecondInput(prev => prev[0] + '0');
        ref_input3?.current?.focus();
      } else {
        ref_input3?.current?.focus();
      }
    }
  };

  // const handleChangeDateDay = (event: string) => {
  //   setFirstInput(event);
  //   if (event.length === 2) {
  //     if (parseInt(event[0], 10) >= 32) {
  //       setFirstInput(prev => '0' + prev[1]);
  //       ref_input2?.current?.focus();
  //     } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
  //       setFirstInput(prev => prev[0] + '0');
  //       ref_input2?.current?.focus();
  //     } else {
  //       ref_input2?.current?.focus();
  //     }
  //   }
  // };

  // const handleChangeDateMonth = (event: string) => {
  //   setSecondInput(event);
  //   if (event.length === 0) {
  //     ref_input1?.current?.focus();
  //   } else if (event.length === 2) {
  //     if (parseInt(event[0], 10) >= 6) {
  //       setSecondInput(prev => '0' + prev[1]);
  //       ref_input3?.current?.focus();
  //     } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
  //       setSecondInput(prev => prev[0] + '0');
  //       ref_input3?.current?.focus();
  //     } else {
  //       ref_input3?.current?.focus();
  //     }
  //   }
  // };

  // const handleChangeDateYear = (event: string) => {
  //   setSecondInput(event);
  //   if (event.length === 0) {
  //     ref_input1?.current?.focus();
  //   } else if (event.length === 2) {
  //     if (parseInt(event[0], 10) >= 6) {
  //       setSecondInput(prev => '0' + prev[1]);
  //       ref_input3?.current?.focus();
  //     } else if (event[0] === '2' && parseInt(event[1], 10) >= 4) {
  //       setSecondInput(prev => prev[0] + '0');
  //       ref_input3?.current?.focus();
  //     } else {
  //       ref_input3?.current?.focus();
  //     }
  //   }
  // };

  const handleBackInEraseLast = (event: string) => {
    if (event.length === 0) {
      ref_input2?.current?.focus();
    }
  };

  return (
    <ContainerInput width={linesNumber === 2 ? '60px' : '105px'}>
      <Input
        ref={ref_input1}
        maxLength={2}
        onChangeText={(event: string) => handleChangeTimeOne(event)}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={firstInput}
      />
      <SeparatorText>{separator}</SeparatorText>
      <Input
        ref={ref_input2}
        maxLength={2}
        onChangeText={(event: string) => {
          handleChangeTimeTwo(event);
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
            onChangeText={(event: string) => handleBackInEraseLast(event)}
            blurOnSubmit={false}
            style={{ width: 35 }}
            keyboardType="numeric"
          />
        </>
      )}
    </ContainerInput>
  );
};
