import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import { CircleEvent } from '..';
import { eventsProps } from '../../store/types';
import { ButtonLine, ContainerText, TextRegular } from './styles';

export const Events: React.FC<eventsProps> = ({
  id,
  circle,
  title,
  category,
  time,
  date,
  description,
  assistTimeFormat,
}) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const detailsEvent = () => {
    navigate('DetailsEvent', {
      id,
      title,
      time,
      description,
      circle,
      category,
      date,
      assistTimeFormat,
    });
  };

  return (
    <ButtonLine
      onPress={detailsEvent}
      accessibilityRole="Button"
      accessibilityLabel="Navega para tela de detalhes de eventos">
      <CircleEvent colorEvent={circle} />
      <ContainerText>
        <TextRegular accessibilityRole="Text" accessibilityLabel={time}>
          {' '}
          {time}{' '}
        </TextRegular>
        <TextRegular
          accessibilityRole="Text"
          accessibilityLabel={title}
          numberOfLines={1}>
          {' '}
          {title}{' '}
        </TextRegular>
      </ContainerText>
    </ButtonLine>
  );
};
