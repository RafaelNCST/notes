import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const BodyScreenModalDropDown = styled.Pressable`
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  background-color: transparent;
  margin-top: 50px;
  position: absolute;
  z-index: 5;
`;

export const ContentModalDropDown = styled.View`
  height: 80px;
  width: 100px;
  background-color: ${defaultStyle.colors.WHITE};
  border: 1px solid #000;
  border-bottom-width: 0px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #000;
  border-style: solid;
`;

export const TextRegular = styled.Text`
  color: ${defaultStyle.colors.BLACK};
  font-family: ${defaultStyle.fontFamily.interRegular};
  font-size: ${defaultStyle.fontSize.small};
  line-height: ${defaultStyle.lineHeight.big};
`;

export const ContainerOutItens = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;
