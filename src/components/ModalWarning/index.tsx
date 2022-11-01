import React, { Dispatch, SetStateAction } from 'react';
import { BodyScreenModal, TextModalRegular } from '../../styles/globalStyles';
import { Content, ContainerText, ButtonOk } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalWarning: React.FC<Props> = ({ setOpen }) => {
  return (
    <BodyScreenModal>
      <Content>
        <Icon name="dangerous" color="#313131" size={60} />
        <ContainerText>
          <TextModalRegular>
            Houve um erro em sua data, tente escrever uma data válida que seja a
            partir de hoje
          </TextModalRegular>
        </ContainerText>
        <ButtonOk>
          <TextModalRegular>OK</TextModalRegular>
        </ButtonOk>
      </Content>
    </BodyScreenModal>
  );
};
