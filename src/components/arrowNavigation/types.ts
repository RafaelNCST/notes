import { NavigatorScreenParams } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type StackParamList = {
  Home: string;
  Profile: { userId: string };
};

type ArrowNavigationTypeProp = CompositeNavigationProp<
  StackNavigationProp<StackParamList, 'HomeScreen'>
>;
