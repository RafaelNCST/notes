import React, { useRef } from 'react';
import { ContainerInput, Input, SeparatorText } from './styles';

interface Props {
  separator: string;
  linesNumber: number;
}

export const MaskInput: React.FC<Props> = ({ separator, linesNumber }) => {
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  return (
    <ContainerInput width={linesNumber === 2 ? '60px' : '105px'}>
      <Input
        ref={ref_input1}
        maxLength={2}
        returnKeyType="next"
        onSubmitEditing={() => ref_input?.current?.focus()}
        blurOnSubmit={false}
      />
      <SeparatorText>{separator}</SeparatorText>
      <Input
        ref={ref_input2}
        maxLength={2}
        returnKeyType="next"
        onSubmitEditing={() => ref_input?.current?.focus()}
        blurOnSubmit={false}
      />
      {linesNumber > 2 && (
        <>
          <SeparatorText>{separator}</SeparatorText>
          <Input
            ref={ref_input3}
            maxLength={4}
            returnKeyType="next"
            blurOnSubmit={false}
            widthInput="20px"
          />
        </>
      )}
    </ContainerInput>
  );
};
