import React from 'react';
import {
  BodyScreen,
  TextRegular,
  TextTitle,
  Image,
} from '../../styles/globalStyles';
import {
  Container,
  TextBottom,
  ButtonContainer,
  ContentContainer,
} from './styles';
import { ArrowNavigation } from '../../components/arrowNavigation';

export const Home: React.FC = () => {
  return (
    <BodyScreen>
      <Container>
        <ContentContainer>
          <Image
            source={require('../../assets/images/Logo.png')}
            width="160px"
            height="160px"
          />
          <TextTitle>Template De Typescript Com React Native</TextTitle>
          <TextBottom>
            <TextRegular>
              Lorem ipsum dolor sit amet. Qui eveniet sunt non harum omnis et
              magnam corporis sed rerum atque. Et dicta natus sit magni facilis
              aut culpa quis ut numquam quia et quidem repudiandae ab Quis
              placeat et quia quibusdam. Et doloribus consequatur quo minima
              consequuntur et labore earum. Ex aspernatur earum et numquam
              consequatur temporibus quisquam ullam officia ut sapiente laborum
              ex quia enim aut voluptate numquam. Non molestiae consequatur aut
              totam suscipit est blanditiis dolorem vel neque nesciunt. Et
              veritatis nostrum aut quas soluta a nesciunt repellat qui
              molestiae cupiditate ex reiciendis deserunt eos earum consequatur
              quo nisi velit. Eum fuga voluptas qui nisi labore ut ratione eum
              odit odio. Est architecto suscipit qui impedit ullam aut
              voluptatibus culpa aut velit illo quo nulla delectus.
            </TextRegular>
          </TextBottom>
        </ContentContainer>
        <ButtonContainer>
          <ArrowNavigation direction="right" route="MultiUtils" />
        </ButtonContainer>
      </Container>
    </BodyScreen>
  );
};
