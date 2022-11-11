import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import {
  Container,
  ContainerButtonLeft,
  ContainerButtonRight,
  TextSubTitle,
} from './styles';

interface Props {
  textDate: string;
  iconLeft?: string;
  iconRight?: string;
  actionLeftButton?: () => void;
  actionRightButton?: () => void;
}

export const HeaderMenu: React.FC<Props> = ({
  textDate,
  iconLeft,
  iconRight,
  actionLeftButton,
  actionRightButton,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <ContainerButtonLeft
        onPress={actionLeftButton}
        accessibilityRole="Button"
        accessibilityLabel="Botão de ação da esquerda">
        {iconLeft && (
          <Icon name={iconLeft} size={20} color={theme.colors.Text} />
        )}
      </ContainerButtonLeft>
      <TextSubTitle accessibilityRole="Text" accessibilityLabel={textDate}>
        {textDate}
      </TextSubTitle>
      <ContainerButtonRight
        onPress={actionRightButton}
        accessibilityRole="Button"
        accessibilityLabel="Botão de ação da direita">
        {iconRight && (
          <Icon name={iconRight} size={20} color={theme.colors.Text} />
        )}
      </ContainerButtonRight>
    </Container>
  );
};
