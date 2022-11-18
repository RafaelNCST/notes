import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { TextInput } from 'react-native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
interface styledProps {
  border?: boolean;
  heightStyled?: string;
  widthStyled?: string;
  paddingLeft?: boolean;
}

export const InputTexts = styled(TextInput)<styledProps>`
  height: ${({ heightStyled }) => heightStyled || '100%'};
  width: ${({ widthStyled }) => widthStyled || '100%'};
  text-align: justify;
  margin-right: ${responsive.small};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
  border-color: ${defaultStyle.colors.BLACK};
  border-style: solid;
  padding-left: ${({ paddingLeft }) => (paddingLeft ? responsive.medium : 0)};
  padding-right: ${responsive.small};
  color: ${({ theme }) => theme.colors.Text};
  flex-wrap: wrap;
  z-index: -1;
  margin-left: ${responsive.medium};
`;

export const DropDownCircleContainer = styled.View`
  width: 20%;
  height: 40px;
  margin-right: ${responsive.small};
  z-index: 5;
`;
