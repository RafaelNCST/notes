import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
import responsive from '../../../../styles/themes/responsive';

export const SubContainerWords = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
`;

export const ContainerIcon = styled.View`
  border-radius: 50px;
  height: 25px;
  width: 25px;
  background-color: ${defaultStyle.colors.BLUE_DARK};
  justify-content: center;
  align-items: center;
  margin-right: ${responsive.small};
`;

export const TextModalRegular = styled.Text`
  color: ${defaultStyle.colors.BLACK};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  line-height: ${defaultStyle.lineHeight.big};
  text-align: justify;
  flex: 1;
`;
