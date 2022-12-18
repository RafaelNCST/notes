import React from 'react';
import { Events } from '../../../../components/events';
import { eventsProps } from '../../../../store/types';
import { BlankList } from '../../../Home/components';
import { ListInfoEvents } from './styles';

interface EventsInfoProps {
  Data: eventsProps[];
}

interface RenderItemProps {
  item: eventsProps;
}

export const EventsInfo: React.FC<EventsInfoProps> = ({ Data }) => {
  console.log(Data);

  return (
    <ListInfoEvents
      data={Data}
      ListEmptyComponent={() => <BlankList />}
      keyExtractor={(item: eventsProps) => String(item.id)}
      renderItem={({ item }: RenderItemProps) => {
        return <Events {...item} />;
      }}
    />
  );
};
