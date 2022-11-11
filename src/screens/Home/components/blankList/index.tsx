import React from 'react';
import { Container, TextSubTitle } from './styles';

export const BlankList = () => {
  return (
    <Container>
      <TextSubTitle
        accessibilityRole="Text"
        accessibilityLabel="Não há eventos adicionados para hoje :)">
        {'Não há eventos adicionados para hoje :)'}
      </TextSubTitle>
    </Container>
  );
};
