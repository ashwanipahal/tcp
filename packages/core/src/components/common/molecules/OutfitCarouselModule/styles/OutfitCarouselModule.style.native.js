import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margin, width, slideWidth, paddingHorizontal } = props;
  return {
    ...(margin && { margin }),
    ...(width && { width }),
    ...(slideWidth && { width: slideWidth }),
    ...(paddingHorizontal && { paddingHorizontal }),
  };
};

const Container = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  width: 100%;
  justify-content: center;
`;

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle};
`;

export { Container, ImageTouchableOpacity };
