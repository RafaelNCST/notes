import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
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
  z-index: -1;
  flex: 1;
  padding: ${responsive.small};
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
  z-index: -1;
`;

export const ContainerTexts = styled.View`
  margin-bottom: ${responsive.medium};
  flex-direction: row;
  padding: 0px;
  height: 20px;
  z-index: -1;
`;

export const ContainerDropDown = styled.View`
  margin-bottom: ${responsive.medium};
  flex-direction: row;
  padding: 0px;
  height: 20px;
`;
