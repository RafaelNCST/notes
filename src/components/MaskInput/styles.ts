import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

export const ContainerInput = styled.View`
  flex-direction: row;
  margin-left: ${responsive.M};
`;
export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-color: white;
  border-style: solid;
`;
