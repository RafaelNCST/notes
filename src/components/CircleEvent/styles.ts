import styled from 'styled-components/native';

interface styledProps {
  colorEvent: string;
}

export const StyledCircleEvent = styled.View<styledProps>`
  height: 20px;
  width: 20px;
  background-color: ${({ colorEvent }) => colorEvent};
  border-radius: 30px;
`;
