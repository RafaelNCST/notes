import React from 'react';
import { TextSubTitle } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ContainerButtonLeft, ContainerButtonRight } from './styles';

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
      <ContainerButtonLeft onPress={actionLeftButton}>
        {iconLeft && <Icon name={iconLeft} size={20} color="#fff" />}
      </ContainerButtonLeft>
      <TextSubTitle>{textDate}</TextSubTitle>
      <ContainerButtonRight onPress={actionRightButton}>
        {iconRight && <Icon name={iconRight} size={20} color="#fff" />}
      </ContainerButtonRight>
    </Container>
  );
};
