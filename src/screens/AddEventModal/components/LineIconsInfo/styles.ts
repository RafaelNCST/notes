import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const SubContainerWords = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
  align-items: center;
`;

export const ContainerIcon = styled.View`
  margin-right: 10px;
  border-radius: 30px;
  height: 25px;
  width: 25px;
  background-color: ${defaultStyle.colors.BLUE_DARK};
  justify-content: center;
  align-items: center;
`;

export const TextModalRegular = styled.Text`
  color: ${defaultStyle.colors.BLACK};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;
