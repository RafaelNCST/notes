import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 30px;
  width: 60px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.Inverted};
  justify-content: center;
  padding: 5px;
  justify-content: center;
  flex-direction: row;
`;

export const Switch = styled(Animated.View)`
  width: 42%;
  height: 20px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.BackGround};
  position: absolute;
  z-index: 2;
  left: 5px;
  align-self: center;
`;
export const ContainerPosition = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ItemSlider = styled.Image`
  width: 5%;
  height: 5%;
`;
