import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ContainerButton } from './styles';

interface Props {
  buttonExists: boolean;
  buttonAction?: () => void;
  iconButton?: string;
}

export const BottomMenu: React.FC<Props> = ({
  buttonExists,
  buttonAction,
  iconButton,
}) => {
  return (
    <Container>
      {buttonExists && (
        <ContainerButton
          accessibilityRole="Button"
          accessibilityLabel="Botão de ação da barra de baixo"
          activeOpacity={0.8}
          underlayColor="#525050"
          onPress={buttonAction}>
          {iconButton && <Icon name={iconButton} size={40} color="#00990F" />}
        </ContainerButton>
      )}
    </Container>
  );
};
