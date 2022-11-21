import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
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
import { CATEGORYS_TYPES, ITEM_TYPES } from '../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  Data: CATEGORYS_TYPES;
  zIndex?: number;
  setArrayEvents: Dispatch<SetStateAction<eventsProps>>;
  arrayEvents?: eventsProps;
  firstRun: boolean;
  setFirstRun: Dispatch<SetStateAction<boolean>>;
}

export const DropDown: React.FC<Props> = ({
  Data,
  zIndex,
  setArrayEvents,
  arrayEvents,
  firstRun,
  setFirstRun,
}) => {
  const { t } = useTranslation();

  const placeholder: string = 'Selecione uma categoria';

  const dataSize: number = Data.length * 30;

  const movimentMenu = useRef(new Animated.Value(-dataSize)).current;
  const heightMenu = useRef(new Animated.Value(30)).current;
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

  const handleSelectedOption = (item: ITEM_TYPES) => {
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
        accessibilityRole="Button"
        accessibilityLabel="Abrir menu suspenso com categorias de urgência"
        onPress={onClickDropDown}
        underlayColor="#cac8c8">
        <SubContainerSelected>
          <TextSelected color={firstRun ? '#9e9d9d' : '#363636'}>
            {firstRun ? t(placeholder) : t(arrayEvents?.category as ITEM_TYPES)}
          </TextSelected>
          <Icon name="expand-more" size={20} color="#000" />
        </SubContainerSelected>
      </Selected>
      <DropDownSubContainer
        style={{
          transform: [{ translateY: movimentControl }],
        }}>
        {Data.map((item: ITEM_TYPES, index: number) => {
          if (item === arrayEvents?.category) {
            return null;
          }

          return (
            <Option
              accessibilityRole="Button"
              accessibilityLabel={`Opção com conteúdo ${item}`}
              activeOpacity={0.8}
              underlayColor="#cac8c8"
              key={String(index)}
              onPress={() => handleSelectedOption(item)}>
              <TextDropDown>{t(item)}</TextDropDown>
            </Option>
          );
        })}
      </DropDownSubContainer>
    </DropDownContainer>
  );
};
