import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineIconsInfo } from '../LineIconsInfo';

import {
  TextModalTitle,
  BodyScreenModal,
} from '../../../../styles/globalStyles';
import {
  Container,
  ContentInfoStyled,
  TopContent,
  CloseButton,
  ContentWords,
} from './styles';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const InfoButton: React.FC<Props> = ({ setOpen }) => {
  return (
    <Container onPress={() => setOpen(true)}>
      <Icon name="help" size={15} color="#fff" />
    </Container>
  );
};

export const ContentInfo: React.FC<Props> = ({ setOpen }) => {
  return (
    <BodyScreenModal>
      <ContentInfoStyled>
        <TopContent>
          <TextModalTitle>Obrigatórios *</TextModalTitle>
          <CloseButton onPress={() => setOpen(false)}>
            <Icon name="close" size={15} color="#000" />
          </CloseButton>
        </TopContent>
        <ContentWords>
          <LineIconsInfo
            IconName="radio-button-unchecked"
            Text="Descreva com um círculo seu nível de emergência, quanto mais perto de preto pior é. *"
          />
          <LineIconsInfo
            IconName="title"
            Text="Um título para seu evento com limite de 35 caracteres. *"
          />
          <LineIconsInfo
            IconName="warning"
            Text="Na seção categoria, descreva com palavras seu nível de importância. *"
          />
          <LineIconsInfo
            IconName="schedule"
            Text="Coloque o horário do evento. (Formato brasileiro) *"
          />
          <LineIconsInfo
            IconName="calendar-today"
            Text="Descreva uma data que seja acima da data atual. (Formato brasileiro) *"
          />
        </ContentWords>
      </ContentInfoStyled>
    </BodyScreenModal>
  );
};
