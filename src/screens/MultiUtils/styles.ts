import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  /* margin: ${responsive.G}; */
  padding-bottom: ${responsive.UEG};
`;

export const TextBottom = styled.View`
  margin-top: ${responsive.EG};
  margin-left: ${responsive.UEG};
  margin-right: ${responsive.UEG};
`;

export const ButtonContainer = styled.View`
  width: 85%;
  align-items: flex-start;
  margin-top: 20px;
`;
