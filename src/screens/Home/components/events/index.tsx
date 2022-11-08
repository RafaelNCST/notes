import React from 'react';
import { TextRegular } from '../../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../routes/types';
import { CircleEvent } from '../../../../components/CircleEvent';
import { eventsProps } from '../../../../store/types';
import { ButtonLine, ContainerText } from './styles';

export const Events: React.FC<eventsProps> = ({
  circle,
  title,
  category,
  time,
  date,
  description,
}) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const detailsEvent = () => {
    navigate('DetailsEvent', { time, description, circle });
  };

  return (
    <ButtonLine onPress={detailsEvent}>
      <CircleEvent colorEvent={circle} />
      <ContainerText>
        <TextRegular> {time} </TextRegular>
        <TextRegular numberOfLines={1}> {title} </TextRegular>
      </ContainerText>
    </ButtonLine>
  );
};
