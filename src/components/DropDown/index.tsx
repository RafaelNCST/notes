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
  TextSelected,
  TextDropDown,
  SubContainerSelected,
} from './styles';
import { eventsProps } from '../../store/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  Data: Array<string>;
  zIndex?: number;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  arrayEvents?: eventsProps;
}

export const DropDown: React.FC<Props> = ({
  Data,
  zIndex,
  setArrayEvents,
  arrayEvents,
}) => {
  const placeholder: string = 'Selecione uma categoria';

  const dataSize: number = Data.length * 30;

  const movimentMenu = useRef(new Animated.Value(-dataSize)).current;
  const heightMenu = useRef(new Animated.Value(30)).current;
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
    setArrayEvents({ ...arrayEvents, category: item });
    setFirstRun(false);
    setOpen(false);
  };

  const movimentControl = movimentMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [-dataSize, -1],
  });

  const heightControl = heightMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [30, dataSize + 3],
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
        onPress={onClickDropDown}
        activeOpacity={0.5}
        underlayColor="#cac8c8">
        <SubContainerSelected>
          <TextSelected color={firstRun ? '#9e9d9d' : '#363636'}>
            {firstRun ? placeholder : arrayEvents?.category}
          </TextSelected>
          <Icon name="expand-more" size={20} color="#000" />
        </SubContainerSelected>
      </Selected>
      <DropDownSubContainer
        style={{
          transform: [{ translateY: movimentControl }],
        }}>
        {Data.map((item, index) => {
          if (item === arrayEvents?.category) {
            return null;
          }

          return (
            <Option
              activeOpacity={0.8}
              underlayColor="#cac8c8"
              key={String(index)}
              onPress={() => handleSelectedOption(item)}>
              <TextDropDown>{item}</TextDropDown>
            </Option>
          );
        })}
      </DropDownSubContainer>
    </DropDownContainer>
  );
};
