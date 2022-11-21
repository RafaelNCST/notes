import React from 'react';
import { Container, TextSubTitle } from './styles';
import { useTranslation } from 'react-i18next';

export const BlankList = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <TextSubTitle
        accessibilityRole="Text"
        accessibilityLabel="Não há eventos planejados para hoje :)">
        {t('Não há eventos adicionados para hoje :)')}
      </TextSubTitle>
    </Container>
  );
};
