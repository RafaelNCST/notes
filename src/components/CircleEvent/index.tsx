import React from 'react';
import { StyledCircleEvent } from './styles';

interface Props {
  colorEvent?: string | null;
}

export const CircleEvent: React.FC<Props> = ({ colorEvent }) => {
  return <StyledCircleEvent colorEvent={colorEvent} />;
};
