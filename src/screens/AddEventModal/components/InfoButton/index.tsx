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
            {t('Regrinhas!')}
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
            Text="O Círculo colorido é apenas ilustrativo, mas obrigatório viu!"
          />
          <LineIconsInfo
            IconName="title"
            Text="Um título para seu evento com limite de 35 caracteres."
          />
          <LineIconsInfo
            IconName="warning"
            Text="Não coloque título, data e horário iguais, pega muito mal, ok?"
          />
          <LineIconsInfo
            IconName="schedule"
            Text="O horário por padrão é em formato 24 horas, mas você pode mudar nas configurações."
          />
          <LineIconsInfo
            IconName="calendar-today"
            Text="Descreva uma data que seja acima da data atual em! Afinal, não podemos marcar eventos para o passado, ou podemos?"
          />
        </ContentWords>
      </ContentInfoStyled>
    </BodyScreenModal>
  );
};
