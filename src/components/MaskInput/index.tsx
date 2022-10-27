import React from 'react';
import { ContainerInput, Input, SeparatorText } from './styles';

interface Props {
  separator: string;
  linesNumber: number;
}

export const MaskInput: React.FC<Props> = ({ separator, linesNumber }) => {
  return (
    <ContainerInput width={linesNumber === 2 ? '60px' : '105px'}>
      {Array(linesNumber)
        .fill(0)
        .map((_, index) => index + 1)
        .map((_, index) => {
          return (
            <React.Fragment key={index}>
              <Input maxLength={index === 2 ? 4 : 2} />
              {linesNumber - 1 !== index && (
                <SeparatorText>{separator}</SeparatorText>
              )}
            </React.Fragment>
          );
        })}
    </ContainerInput>
  );
};
