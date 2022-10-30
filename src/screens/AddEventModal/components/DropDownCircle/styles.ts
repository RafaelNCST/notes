import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { Animated } from 'react-native';

interface StyledProps {
  color?: string;
  zIndex?: number;
}

export const DropDownContainer = styled(Animated.View)<StyledProps>`
  width: 100%;
  height: auto;
  z-index: ${({ zIndex }) => zIndex};
  overflow: hidden;
`;

export const DropDownSubContainer = styled(Animated.View)`
  width: 72%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.BackGround};
  border: 1px solid #000;
  border-top-width: 0px;
`;

export const ContainerIcon = styled.View`
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-color: #000;
  border-style: solid;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CircleContainer = styled.View`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #000;
  border-style: solid;
`;

export const Selected = styled.TouchableHighlight`
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.BackGround};
  border: 1px solid #000;
  border-bottom-width: 0px;
`;

export const SubContainerSelected = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TextSelected = styled.Text<StyledProps>`
  color: ${({ color }) => color};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.EP};
  text-align: center;
  line-height: 20px;
`;

export const Option = styled.TouchableHighlight`
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const TextDropDown = styled.Text`
  color: #000;
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.EP};
  text-align: center;
  line-height: 20px;
`;
