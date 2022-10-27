import { LayoutAnimation } from 'react-native';

export const toggleAnimation = {
  duration: 400,
  update: {
    duration: 400,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 400,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};
