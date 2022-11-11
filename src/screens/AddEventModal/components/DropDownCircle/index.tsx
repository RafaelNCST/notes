import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Animated } from 'react-native';
import {
  DropDownContainer,
  DropDownSubContainer,
  Selected,
  Option,
  ContainerIcon,
  CircleContainer,
  SubContainerSelected,
} from './styles';
import { CircleEvent } from '../../../../components';
import { eventsProps } from '../../../../store/types';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  Data: Array<string>;
  zIndex?: number;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  arrayEvents?: eventsProps;
}

export const DropDownCircle: React.FC<Props> = ({
  Data,
  zIndex,
  setArrayEvents,
  arrayEvents,
}) => {
  const dataSize: number = Data.length * 45;

  const movimentMenu = useRef(new Animated.Value(-dataSize)).current;
  const heightMenu = useRef(new Animated.Value(45)).current;
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const handleDropDrown = () => {
    Animated.timing(movimentMenu, {
      toValue: open ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleDropDrownHeight = () => {
    Animated.timing(heightMenu, {
      toValue: open ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleSelectedOption = (item: string) => {
    setArrayEvents({
      ...arrayEvents,
      circle: item,
    });
    setFirstRun(false);
    setOpen(false);
  };

  const movimentControl = movimentMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [-dataSize, -1],
  });

  const heightControl = heightMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [45, dataSize + 25],
  });

  const onClickDropDown = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    handleDropDrown();
    handleDropDrownHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <DropDownContainer zIndex={zIndex} style={{ height: heightControl }}>
      <Selected
        accessibilityRole="Button"
        accessibilityLabel="Abrir Menu suspenso"
        onPress={onClickDropDown}
        activeOpacity={0.5}
        underlayColor="#cac8c8">
        <SubContainerSelected>
          <CircleContainer>
            <CircleEvent
              colorEvent={firstRun ? 'white' : arrayEvents?.circle}
            />
          </CircleContainer>
          <ContainerIcon>
            <Icon name="expand-more" size={20} color="#000" />
          </ContainerIcon>
        </SubContainerSelected>
      </Selected>
      <DropDownSubContainer
        style={{
          transform: [{ translateY: movimentControl }],
        }}>
        {Data.map((item, index: number) => {
          if (item === arrayEvents?.circle) {
            return null;
          }

          return (
            <Option
              accessibilityRole="Button"
              accessibilityLabel={`Opção com bola ${item}`}
              activeOpacity={0.8}
              underlayColor="#cac8c8"
              key={String(index)}
              onPress={() => handleSelectedOption(item)}>
              <CircleEvent colorEvent={item} />
            </Option>
          );
        })}
      </DropDownSubContainer>
    </DropDownContainer>
  );
};
