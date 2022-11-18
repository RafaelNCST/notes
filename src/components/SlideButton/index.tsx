import React, { useRef, Dispatch, SetStateAction } from 'react';
import { Container, Switch, ContainerPosition } from './styles';
import { Animated } from 'react-native';
interface Props {
  event: number;
  ImageOne?: () => SVGRectElement;
  ImageTwo?: () => SVGRectElement;
  setEvent?: Dispatch<SetStateAction<number>>;
}

export const SlideButton: React.FC<Props> = ({
  ImageOne,
  ImageTwo,
  setEvent,
  event,
}) => {
  const positionSwitch = useRef(new Animated.Value(event)).current;

  const startAnimation = (toValue: number) => {
    if (setEvent) {
      setEvent(toValue === 0 ? -2 : 22);
    }
    Animated.timing(positionSwitch, {
      toValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const left = positionSwitch.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 22],
    extrapolate: 'clamp',
  });

  return (
    <Container
      accessibilityRole="Button"
      accessibilityLabel="Botão para trocar o tema do App entre night e day">
      <Switch style={{ transform: [{ translateX: left }] }} />
      <ContainerPosition onPress={() => startAnimation(0)}>
        {ImageOne ? ImageOne() : null}
      </ContainerPosition>
      <ContainerPosition onPress={() => startAnimation(1)}>
        {ImageTwo ? ImageTwo() : null}
      </ContainerPosition>
    </Container>
  );
};
