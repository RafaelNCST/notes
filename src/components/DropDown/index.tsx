import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  DropDownContainer,
  DropDownSubContainer,
  Selected,
  Option,
  TextSelected,
  TextDropDown,
} from './styles';

interface PropsData {
  name: string;
}

interface Props {
  Data: Array<PropsData>;
  zIndex?: number;
}

export const DropDown: React.FC<Props> = ({ Data, zIndex }) => {
  const placeholder: string = 'Selecione algo ai poh pra começar';

  const sizeDropDown = useRef(new Animated.Value(0)).current;
  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [dataSize, setDataSize] = useState(Data.length);

  const handleDropDrown = (value: boolean) => {
    const toValue = !value ? 0 : 1;
    Animated.timing(sizeDropDown, {
      toValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const handleOptionsNumberDropDown = () => {
    setDataSize(prev => prev - 1);
  };

  const handleSelectedOption = (item: string) => {
    setSelected(item);
    setFirstRun(false);
    setOpen(false);
    handleOptionsNumberDropDown();
  };

  const sizeInterpolate = sizeDropDown.interpolate({
    inputRange: [0, 1],
    outputRange: [0, dataSize < 4 ? 150 : 200],
  });

  useEffect(() => {
    handleDropDrown(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <DropDownContainer zIndex={zIndex}>
      <Selected
        onPress={() => setOpen(prev => !prev)}
        activeOpacity={0.8}
        underlayColor="#cac8c8">
        <TextSelected color={firstRun ? '#9e9d9d' : '#363636'}>
          {firstRun ? placeholder : selected}
        </TextSelected>
      </Selected>
      <DropDownSubContainer style={{ height: sizeInterpolate }}>
        <FlatList
          data={Data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (item.name === selected) {
              return null;
            }

            return (
              <Option
                activeOpacity={0.8}
                underlayColor="#cac8c8"
                sizeBorderRadius={index === Data.length - 1 ? '12px' : '0px'}
                key={index}
                onPress={() => handleSelectedOption(item.name)}>
                <TextDropDown>{item.name}</TextDropDown>
              </Option>
            );
          }}
        />
      </DropDownSubContainer>
    </DropDownContainer>
  );
};
