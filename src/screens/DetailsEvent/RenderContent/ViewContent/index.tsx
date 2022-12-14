import React from 'react';
import {
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  ContainerTexts,
} from '../../styles';
import { TextTitle, TextRegular, TextDescription } from './styles';
import { CircleEvent } from '../../../../components';
import { ContentProps } from '../types';
import { useTranslation } from 'react-i18next';
import { ITEM_TYPES } from '../../../../utils/DATA_CATEGORY';
import { BLANK_DESCRIPTION_TEXTS } from './dataBlankDescriptions';
import { ScrollView } from 'react-native-gesture-handler';

export const ViewContent: React.FC<ContentProps> = ({
  title,
  time,
  description,
  category,
  date,
  circle,
  assistTimeFormat,
}) => {
  const { t } = useTranslation();

  return (
    <Content>
      <TopContainer>
        <ContainerTitle>
          <CircleEvent colorEvent={circle} />
          <TextTitle marginLeft={true}>{title}</TextTitle>
        </ContainerTitle>
        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Categoria">
            {t('Categoria')}:{' '}
          </TextTitle>
          <TextRegular>{t(category as ITEM_TYPES)}</TextRegular>
        </ContainerTexts>

        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Horário">
            {t('Horário')}:
          </TextTitle>
          <TextRegular>
            {time} {assistTimeFormat ? assistTimeFormat : null}
          </TextRegular>
        </ContainerTexts>
        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Data">
            {t('Data')}:
          </TextTitle>
          <TextRegular>{date}</TextRegular>
        </ContainerTexts>
      </TopContainer>
      <BottomContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextDescription>
            {t(description || BLANK_DESCRIPTION_TEXTS[0])}
          </TextDescription>
        </ScrollView>
      </BottomContainer>
    </Content>
  );
};
