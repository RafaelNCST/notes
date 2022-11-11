import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      BackGround: string;
      Inverted: string;
      Text: string;
      TextInverted: string;
    };
  }
}
