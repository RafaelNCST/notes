import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';
import { Animated } from 'react-native';

interface StyledProps {
  sizeBorderRadius?: string;
  color?: string;
  zIndex?: number;
}

export const DropDownContainer = styled.View<StyledProps>`
  width: 80%;
  background-color: white;
  position: relative;
  z-index: ${({ zIndex }) => zIndex};
`;

export const DropDownSubContainer = styled(Animated.View)<StyledProps>`
  position: absolute;
  background-color: white;
  top: 49px;
  width: 100%;
  border: 1px solid #000;
  border-top-width: 0px;
`;

export const Selected = styled.TouchableHighlight`
  height: 50px;
  background-color: white;
  padding: ${responsive.EP};
  border: 1px solid #000;
  border-bottom-width: 0px;
  justify-content: center;
`;

export const TextSelected = styled.Text<StyledProps>`
  color: ${({ color }) => color};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.PM};
  text-align: center;
  line-height: 20px;
`;

export const Option = styled.TouchableHighlight<StyledProps>`
  height: 50px;
  border-bottom-left-radius: ${({ sizeBorderRadius }) => sizeBorderRadius};
  border-bottom-right-radius: ${({ sizeBorderRadius }) => sizeBorderRadius};
  padding: ${responsive.P};
`;

export const TextDropDown = styled.Text`
  color: #000;
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.PM};
  text-align: center;
  line-height: 20px;
`;
