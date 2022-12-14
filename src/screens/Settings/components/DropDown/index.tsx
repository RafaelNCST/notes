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
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  Data: Array<string>;
  zIndex?: number;
  setChoosedOption: Dispatch<SetStateAction<string>>;
  choosedOption?: string;
  assistFunction?: (item: string) => void;
}

export const DropDown: React.FC<Props> = ({
  Data,
  zIndex,
  choosedOption,
  setChoosedOption,
  assistFunction,
}) => {
  const dataSize: number = Data.length * 40;

  const { t } = useTranslation();

  const movimentMenu = useRef(new Animated.Value(-dataSize)).current;
  const heightMenu = useRef(new Animated.Value(40)).current;
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
    setChoosedOption(item);
    if (assistFunction) {
      assistFunction(item);
    }
    setOpen(false);
  };

  const movimentControl = movimentMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [-dataSize, -1],
  });

  const heightControl = heightMenu.interpolate({
    inputRange: [0, 1],
    outputRange: [40, dataSize],
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
    <DropDownContainer
      zIndex={zIndex}
      dataSize={dataSize}
      style={{ height: heightControl }}>
      <Selected
        accessibilityRole="Button"
        accessibilityLabel="Abrir menu suspenso com categorias de urg??ncia"
        onPress={onClickDropDown}
        underlayColor="#cac8c8">
        <SubContainerSelected>
          <TextSelected color={'#363636'}>
            {t(choosedOption as string)}
          </TextSelected>
          <Icon name="expand-more" size={20} color="#000" />
        </SubContainerSelected>
      </Selected>
      <DropDownSubContainer
        style={{
          transform: [{ translateY: movimentControl }],
        }}>
        {Data.map((item: string, index: number) => {
          if (item === choosedOption) {
            return null;
          }

          return (
            <Option
              accessibilityRole="Button"
              accessibilityLabel={`Op????o com conte??do ${item}`}
              activeOpacity={0.8}
              underlayColor="#cac8c8"
              key={String(index)}
              onPress={() => handleSelectedOption(item as string)}>
              <TextDropDown>{t(item)}</TextDropDown>
            </Option>
          );
        })}
      </DropDownSubContainer>
    </DropDownContainer>
  );
};
