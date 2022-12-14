import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  border?: boolean;
  heightStyled?: string;
  widthStyled?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const DropDownCircleContainer = styled.View`
  width: 20%;
  height: 40px;
  margin-right: ${responsive.small};
`;

export const InputTexts = styled.TextInput<styledProps>`
  height: ${({ heightStyled }) => heightStyled || '100%'};
  width: ${({ widthStyled }) => widthStyled || '100%'};
  margin-right: ${responsive.small};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
  border-color: ${defaultStyle.colors.BLACK};
  border-style: solid;
  padding-left: ${responsive.small};
  padding-right: ${responsive.small};
  color: ${({ theme }) => theme.colors.Text};
  flex-wrap: wrap;
  z-index: -1;
`;

export const TopContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-color: ${defaultStyle.colors.BLACK};
  border-style: solid;
  padding: ${responsive.small};
  justify-content: center;
`;

export const ContainerTitle = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${responsive.small};
  align-items: center;
`;

export const BottomContainer = styled.View`
  flex: 1;
  padding: ${responsive.small};
  z-index: -1;
`;

export const ContainerTexts = styled.View<styledProps>`
  margin-bottom: ${responsive.medium};
  flex-direction: row;
  padding: 0px;
  height: 20px;
  z-index: -1;
`;

export const ContainerDropDown = styled.View<styledProps>`
  margin-bottom: ${responsive.medium};
  flex-direction: row;
  padding: 0px;
  height: 20px;
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
  z-index: -1;
`;
