import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineIconsInfo } from '../LineIconsInfo';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <BodyScreenModal>
      <ContentInfoStyled>
        <TopContent>
          <TextModalTitle
            accessibilityRole="Text"
            accessibilityLabel="Obrigatórios">
            {t('Obrigatórios')}
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
            Text="Coloque o horário do evento de acordo com o formato escolhido nas configurações"
          />
          <LineIconsInfo
            IconName="calendar-today"
            Text="Descreva uma data que seja acima da data atual de acordo com o formato escolhido nas configurações"
          />
        </ContentWords>
      </ContentInfoStyled>
    </BodyScreenModal>
  );
};
