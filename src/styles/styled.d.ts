import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      Primary: string;
      Secundary: string;

      BackGround: string;
      Inverted: string;
      Text: string;

      Color_Afirmative: string;
      Color_Negative: string;
    };
  }
}
