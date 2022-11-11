import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineIconsInfo } from '../LineIconsInfo';

import { BodyScreenModal } from '../../../../styles/globalStyles';
import {
  Container,
  ContentInfoStyled,
  TopContent,
  CloseButton,
  ContentWords,
  TextModalTitle,
} from './styles';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const InfoButton: React.FC<Props> = ({ setOpen }) => {
  return (
    <Container
      onPress={() => setOpen(true)}
      accessibilityRole="Button"
      accessibilityLabel="Botão com modal que demonstra detalhes adicionais dos campos">
      <Icon name="help" size={15} color="#fff" />
    </Container>
  );
};

export const ContentInfo: React.FC<Props> = ({ setOpen }) => {
  return (
    <BodyScreenModal>
      <ContentInfoStyled>
        <TopContent>
          <TextModalTitle
            accessibilityRole="Text"
            accessibilityLabel="Obrigatórios">
            Obrigatórios
          </TextModalTitle>
          <CloseButton
            onPress={() => setOpen(false)}
            accessibilityRole="Button"
            accessibilityLabel="Fechar Modal">
            <Icon name="close" size={15} color="#000" />
          </CloseButton>
        </TopContent>
        <ContentWords>
          <LineIconsInfo
            IconName="radio-button-unchecked"
            Text="Escolha um círculo colorido apenas ilustrativo para demonstrar a urgência do evento"
          />
          <LineIconsInfo
            IconName="title"
            Text="Um título para seu evento com limite de 35 caracteres"
          />
          <LineIconsInfo
            IconName="warning"
            Text="Na seção categoria, descreva com palavras seu nível de importância"
          />
          <LineIconsInfo
            IconName="schedule"
            Text="Coloque o horário do evento. (Formato brasileiro)"
          />
          <LineIconsInfo
            IconName="calendar-today"
            Text="Descreva uma data que seja acima da data atual. (Formato brasileiro)"
          />
        </ContentWords>
      </ContentInfoStyled>
    </BodyScreenModal>
  );
};
