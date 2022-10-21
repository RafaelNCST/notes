import React from 'react';
import { TextSubTitle } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ContainerButton } from './styles';

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
  return (
    <Container>
      <ContainerButton onPress={actionLeftButton}>
        {iconLeft && <Icon name={iconLeft} size={20} color="#fff" />}
      </ContainerButton>
      <TextSubTitle>{textDate}</TextSubTitle>
      <ContainerButton onPress={actionRightButton}>
        {iconRight && <Icon name={iconRight} size={20} color="#fff" />}
      </ContainerButton>
    </Container>
  );
};
