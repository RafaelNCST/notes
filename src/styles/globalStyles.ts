import styled from 'styled-components/native';
import responsive from './themes/responsive';

interface PropsImage {
  width: string;
  height: string;
}

export const BodyScreen = styled.View`
  background-color: ${({ theme }) => theme.colors.BackGround};
  flex: 1;
`;

export const TextSuperTitle = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: 'Inter-ExtraBold';
  font-size: ${responsive.G};
  text-align: center;
  line-height: 20px;
`;

export const TextTitle = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: 'Inter-Bold';
  font-size: ${responsive.M};
  text-align: center;
  line-height: 20px;
`;

export const TextSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.PM};
  text-align: center;
  line-height: 20px;
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => (theme.title === 'dark' ? '#fff' : '#000')};
  font-family: 'Inter-Regular';
  font-size: ${responsive.P};
  text-align: center;
  line-height: 20px;
`;

export const Image = styled.Image<PropsImage>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
