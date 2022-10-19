import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
  margin-left: ${responsive.UEG};
  margin-right: ${responsive.UEG};
`;

export const TextBottom = styled.View`
  margin-top: ${responsive.EG};
  justify-content: center;
`;

export const ButtonContainer = styled.View`
  width: 85%;
  margin-bottom: ${responsive.EG};
  align-items: flex-end;
`;
