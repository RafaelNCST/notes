import React from 'react';
import { TextRegular } from '../../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../routes/types';
import { CircleEvent } from '../../../../components/CircleEvent';
import { ButtonLine, ContainerText } from './styles';

interface Props {
  time: string;
  message: string;
  colorEvent: string;
}

export const Events: React.FC<Props> = ({ time, message, colorEvent }) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const detailsEvent = () => {
    navigate('DetailsEvent', { time, message, colorEvent });
  };

  return (
    <ButtonLine onPress={detailsEvent}>
      <CircleEvent colorEvent={colorEvent} />
      <ContainerText>
        <TextRegular> {time} </TextRegular>
        <TextRegular> {message} </TextRegular>
      </ContainerText>
    </ButtonLine>
  );
};
