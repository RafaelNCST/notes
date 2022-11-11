import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';

export const Container = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: black;
  border-style: solid;
`;

export const ContainerButtonLeft = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
`;

export const TextSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.medium};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const ContainerButtonRight = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
`;
