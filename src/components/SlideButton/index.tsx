import React, { useRef, Dispatch, SetStateAction } from 'react';
import { Container, Switch, ContainerPosition } from './styles';
import { Animated } from 'react-native';
interface Props {
  ImageOne?: () => SVGRectElement;
  ImageTwo?: () => SVGRectElement;
  setEvent?: Dispatch<SetStateAction<boolean>>;
}

export const SlideButton: React.FC<Props> = ({
  ImageOne,
  ImageTwo,
  setEvent,
}) => {
  const positionSwitch = useRef(new Animated.Value(0)).current;

  const startAnimation = (toValue: number) => {
    if (setEvent) {
      setEvent(toValue === 0 ? false : true);
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
