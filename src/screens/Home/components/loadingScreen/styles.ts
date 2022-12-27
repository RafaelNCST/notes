import styled from 'styled-components/native';

export const BackgroundView = styled.View`
  background-color: ${({ theme }) => theme.colors.BackGround};
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
