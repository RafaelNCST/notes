import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

interface StyledProps {
  sizeBorderRadius?: string;
  color?: string;
  zIndex?: number;
}

export const DropDownContainer = styled.View<StyledProps>`
  width: 30%;
  background-color: white;
  position: relative;
  z-index: ${({ zIndex }) => zIndex};
`;

export const DropDownSubContainer = styled.View<StyledProps>`
  background-color: white;
  width: 100%;
  border: 1px solid #000;
  border-top-width: 0px;
  overflow: hidden;
`;

export const Selected = styled.TouchableHighlight`
  height: 20px;
  background-color: white;
  border: 1px solid #000;
  border-bottom-width: 0px;
  justify-content: center;
`;

export const TextSelected = styled.Text<StyledProps>`
  color: ${({ color }) => color};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.EP};
  text-align: center;
  line-height: 20px;
`;

export const Option = styled.TouchableHighlight<StyledProps>`
  height: 20px;
  border-bottom-left-radius: ${({ sizeBorderRadius }) => sizeBorderRadius};
  border-bottom-right-radius: ${({ sizeBorderRadius }) => sizeBorderRadius};
`;

export const TextDropDown = styled.Text`
  color: #000;
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.EP};
  text-align: center;
  line-height: 20px;
`;
