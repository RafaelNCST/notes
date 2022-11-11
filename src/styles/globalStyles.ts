import styled from 'styled-components/native';

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

// export const Text = styled.Text`
//   color: ${({ theme }) => theme.colors.Text};
//   font-family: ${defaultStyle.fontFamily.interBold};
//   font-size: ${defaultStyle.fontSize.enormous};
//   text-align: center;
//   line-height: ${defaultStyle.lineHeight.small};
// `;

export const Image = styled.Image<PropsImage>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
