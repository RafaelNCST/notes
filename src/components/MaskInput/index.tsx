import React from 'react';
import { TextRegular } from '../../styles/globalStyles';
import { ContainerInput, Input } from './styles';

interface Props {
  separator: string;
  linesNumber: number;
}

export const MaskInput: React.FC<Props> = ({ separator, linesNumber }) => {
  return (
    <ContainerInput>
      {Array(3)
        .fill(0)
        .map((_, index) => index + 1)
        .map((_, index) => {
          if (linesNumber === index) return null;
          return (
            <React.Fragment key={index}>
              <Input />
              <TextRegular>{separator}</TextRegular>
            </React.Fragment>
          );
        })}
    </ContainerInput>
  );
};
