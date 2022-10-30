import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';

export const ButtonLine = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-left: ${responsive.P};
  padding-right: ${responsive.P};
`;

export const ContainerText = styled.View`
  flex-direction: row;
  margin-left: ${responsive.P};
`;
