import React from 'react';
import { Container } from './styles';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CheckMark = () => {
  return (
    <Container>
      <Icon
        name="done"
        size={30}
        color={defaultStyle.colors.GREEN_AFIRMATIVE}
      />
    </Container>
  );
};
