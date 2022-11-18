import React from 'react';
import {
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  TextRegular,
  ContainerTexts,
} from '../../styles';
import { TextTitle } from './styles';
import { CircleEvent } from '../../../../components';
import { ContentProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

const blankDescription = 'Sem descrição por aqui  ಥ_ಥ';

export const ViewContent: React.FC<ContentProps> = ({
  title,
  time,
  description,
  category,
  date,
  circle,
}) => {
  return (
    <Content>
      <TopContainer>
        <ContainerTitle>
          <CircleEvent colorEvent={circle} />
          <TextTitle marginLeft={true}>{title}</TextTitle>
        </ContainerTitle>
        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Categoria">
            Categoria:{' '}
          </TextTitle>
          <TextRegular>{category}</TextRegular>
        </ContainerTexts>

        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Horário">
            Horário:
          </TextTitle>
          <TextRegular>{time}</TextRegular>
        </ContainerTexts>
        <ContainerTexts>
          <TextTitle accessibilityRole="Text" accessibilityLabel="Data">
            Data:
          </TextTitle>
          <TextRegular>{date}</TextRegular>
        </ContainerTexts>
      </TopContainer>
      <BottomContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextRegular>{description || blankDescription}</TextRegular>
        </ScrollView>
      </BottomContainer>
    </Content>
  );
};
