import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';
import { Animated } from 'react-native';

interface StyledProps {
  color?: string;
  zIndex?: number;
}

export const DropDownContainer = styled.View<StyledProps>`
  width: 50%;
  height: auto;
  z-index: ${({ zIndex }) => zIndex};
  overflow: hidden;
`;

export const DropDownSubContainer = styled(Animated.View)`
  background-color: white;
  width: 100%;
  border: 1px solid #000;
  border-top-width: 0px;
  z-index: 1;
`;

export const Selected = styled.TouchableHighlight`
  border: 1px solid #000;
  border-bottom-width: 0px;
  z-index: 2;
`;

export const SubContainerSelected = styled.View`
  height: 25px;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${responsive.EP};
  padding-right: ${responsive.EP};
`;

export const TextSelected = styled.Text<StyledProps>`
  color: ${({ color }) => color};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.EP};
  text-align: center;
  line-height: 20px;
`;

export const Option = styled.TouchableHighlight`
  height: 25px;
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
