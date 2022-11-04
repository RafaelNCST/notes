import React from 'react';
import { TextSubTitle } from '../../../../styles/globalStyles';
import { Container } from './styles';

export const BlankList = () => {
  return (
    <Container>
      <TextSubTitle>{'Não há eventos adicionados ainda. :('}</TextSubTitle>
    </Container>
  );
};
