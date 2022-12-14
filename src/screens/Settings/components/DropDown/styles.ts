import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
import { Animated } from 'react-native';

interface StyledProps {
  color?: string;
  zIndex?: number;
  dataSize?: number;
}

export const DropDownContainer = styled(Animated.View)<StyledProps>`
  width: 50%;
  z-index: ${({ zIndex }) => zIndex};
  overflow: hidden;
  max-height: ${({ dataSize }) => dataSize}px;
  align-self: flex-start;
`;

export const DropDownSubContainer = styled(Animated.View)`
  background-color: white;
  width: 100%;
  border: 1px solid #000;
  border-top-width: 0px;
  z-index: 1;
`;

export const Selected = styled.TouchableHighlight`
  z-index: 2;
  border: 1px solid #000;
`;

export const SubContainerSelected = styled.View`
  height: 35px;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${responsive.extraSmall};
  padding-right: ${responsive.extraSmall};
`;

export const TextSelected = styled.Text<StyledProps>`
  color: ${({ color }) => color};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.extraSmall};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const Option = styled.TouchableHighlight`
  height: 35px;
  justify-content: center;
  align-items: center;
`;

export const TextDropDown = styled.Text`
  color: #000;
  font-family: ${defaultStyle.fontFamily.interSemiBold};
  font-size: ${defaultStyle.fontSize.extraSmall};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;
