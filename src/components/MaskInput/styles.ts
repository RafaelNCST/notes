import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  width?: string;
}

export const ContainerInput = styled.View<styledProps>`
  flex-direction: row;
  margin-left: ${responsive.medium};
  height: 80%;
  width: ${({ width }) => width};
  justify-content: center;
  z-index: -1;
`;

export const Input = styled.TextInput`
  font-size: ${defaultStyle.fontSize.small};
  color: ${({ theme }) => theme.colors.Text};
  padding: 0px;
  text-align: center;
  font-family: 'inter-Bold';
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.Text};
  border-style: solid;
`;

export const SeparatorText = styled.Text`
  font-size: ${defaultStyle.fontSize.small};
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  font-family: 'inter-Bold';
  color: ${({ theme }) => theme.colors.Text};
`;
