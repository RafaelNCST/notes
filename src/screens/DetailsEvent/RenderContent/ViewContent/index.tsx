import React from 'react';
import {
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  TextRegular,
  TextTitle,
  ContainerTexts,
} from '../../styles';
import { CircleEvent } from '../../../../components';
import { ContentProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

export const ViewContent: React.FC<ContentProps> = ({
  time,
  message,
  category,
  date,
  circle,
}) => {
  return (
    <Content>
      <TopContainer>
        <ContainerTitle>
          <CircleEvent colorEvent={circle} />
        </ContainerTitle>
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Categoria">
            Categoria:{' '}
          </TextRegular>
          <TextTitle>{category}</TextTitle>
        </ContainerTexts>

        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Horário">
            Horário:
          </TextRegular>
          {/* <MaskInput
            separator=":"
            linesNumber={2}
            type="time"
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
            clearMaskInputs={clearMaskInputs}
          /> */}
        </ContainerTexts>
        <ContainerTexts>
          <TextRegular accessibilityRole="Text" accessibilityLabel="Data">
            Data:
          </TextRegular>
          {/* <MaskInput
            separator="/"
            linesNumber={3}
            type="date"
            arrayEvents={arrayEvents}
            setArrayEvents={setArrayEvents}
            clearMaskInputs={clearMaskInputs}
          /> */}
        </ContainerTexts>
      </TopContainer>
      <BottomContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextRegular>{message}</TextRegular>
        </ScrollView>
      </BottomContainer>
    </Content>
  );
};
