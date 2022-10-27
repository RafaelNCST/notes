import React, { useState, useRef, useEffect } from 'react';
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

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  Data: Array<string>;
  zIndex?: number;
}

export const DropDown: React.FC<Props> = ({ Data, zIndex }) => {
  const placeholder: string = 'Selecione uma categoria';

  const dataSize: number = Data.length * 25;

  const movimentMenu = useRef(new Animated.Value(-dataSize)).current;
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleDropDrown = () => {
    Animated.timing(movimentMenu, {
      toValue: open ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSelectedOption = (item: string) => {
    setSelected(item);
    setFirstRun(false);
  };

  const movimentControl = movimentMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [-dataSize, -1],
  });

  const onClickDropDown = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    handleDropDrown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <DropDownContainer
      zIndex={open ? zIndex : 0}
      style={{ height: dataSize + 25 }}>
      <Selected
        onPress={onClickDropDown}
        activeOpacity={0.5}
        underlayColor="#cac8c8">
        <SubContainerSelected>
          <TextSelected color={firstRun ? '#9e9d9d' : '#363636'}>
            {firstRun ? placeholder : selected}
          </TextSelected>
          <Icon name="expand-more" size={20} color="#000" />
        </SubContainerSelected>
      </Selected>
      <DropDownSubContainer
        style={{
          transform: [{ translateY: movimentControl }],
        }}>
        {Data.map((item, index) => {
          if (item === selected) {
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
