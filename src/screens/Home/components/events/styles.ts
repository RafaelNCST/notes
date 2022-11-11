import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const ButtonLine = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-left: ${responsive.small};
  padding-right: ${responsive.small};
`;

export const ContainerText = styled.View`
  flex-direction: row;
  margin-left: ${responsive.small};
  width: 85%;
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interRegular};
  font-size: ${defaultStyle.fontSize.small};
  text-align: justify;
  line-height: ${defaultStyle.lineHeight.big};
`;
