import styled, { css } from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margin, width } = props;
  return {
    ...(margin && { margin }),
    ...(width && { width }),
  };
};

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

const RowContainer = styled.View`
  flex-direction: row;
  ${getAdditionalStyle}
`;

const EmptyView = styled.View`
  ${getAdditionalStyle};
`;

const styles = css``;

export {
  styles,
  Container,
  RowContainer,
  ReviewAndRatingContainer,
  BazarVoiceContainer,
  ImageTouchableOpacity,
  EmptyView,
};
