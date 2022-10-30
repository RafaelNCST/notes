import styled from 'styled-components/native';

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
  background-color: ${({ theme }) => theme.colors.Primary};
  justify-content: center;
  align-items: center;
`;
