import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ContainerButtonLeft,
  ContainerButtonRight,
  TextSubTitle,
} from './styles';

interface Props {
  textDate: string | undefined;
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
  const { t } = useTranslation();

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
        {textDate ? t(textDate) : null}
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
