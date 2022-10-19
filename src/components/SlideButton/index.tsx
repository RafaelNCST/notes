import React, { useRef } from 'react';
import { Container, Switch, ContainerPosition } from './styles';
import { ConsumerMainContext } from '../../contexts/consumer';
import { Animated } from 'react-native';
interface Props {
  ImageOne?: () => SVGRectElement;
  ImageTwo?: () => SVGRectElement;
}

export const SlideButton: React.FC<Props> = ({ ImageOne, ImageTwo }) => {
  const positionSwitch = useRef(new Animated.Value(0)).current;
  const { setTheme } = ConsumerMainContext();

  const startAnimation = (toValue: number) => {
    setTheme(toValue === 0 ? false : true);
    Animated.timing(positionSwitch, {
      toValue,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const left = positionSwitch.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 28],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <Switch style={{ transform: [{ translateX: left }] }} />
      <ContainerPosition onPress={() => startAnimation(0)}>
        {ImageOne && ImageOne()}
      </ContainerPosition>
      <ContainerPosition onPress={() => startAnimation(1)}>
        {ImageTwo && ImageTwo()}
      </ContainerPosition>
    </Container>
  );
};
