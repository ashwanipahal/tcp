import styled, { css } from 'styled-components/native';

const ImageTouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
`;

const Container = styled.View`
  justify-content: center;
`;

const BazarVoiceContainer = styled.View`
  flex-direction: row;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

const ReviewAndRatingContainer = styled.View`
  flex-direction: row;
`;

const OfferPriceAndBadge3Container = styled.View`
  flex-direction: row;
`;

const styles = css``;

export {
  styles,
  Container,
  ReviewAndRatingContainer,
  BazarVoiceContainer,
  OfferPriceAndBadge3Container,
  ImageTouchableOpacity,
};
