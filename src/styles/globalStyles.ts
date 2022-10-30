import styled from 'styled-components/native';
import responsive from './themes/responsive';

interface PropsImage {
  width: string;
  height: string;
}

export const BodyScreen = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.BackGround};
  flex: 1;
`;

export const BodyScreenModal = styled.SafeAreaView`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.Text};
  font-family: 'Inter-Regular';
  font-size: ${responsive.P};
  text-align: justify;
  line-height: 20px;
`;

export const TextModalTitle = styled.Text`
  color: #000;
  font-family: 'Inter-Bold';
  font-size: ${responsive.PM};
  text-align: justify;
  line-height: 20px;
`;

export const TextModalRegular = styled.Text`
  color: #000;
  font-family: 'Inter-Regular';
  font-size: ${responsive.P};
  text-align: justify;
  line-height: 15px;
`;

export const Image = styled.Image<PropsImage>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
