import styled from 'styled-components/native';

const getAdditionalStyle = props => {
  const { margin, width, itemMargin, itemPadding, itemBackgroundColor } = props;
  return {
    ...(margin && { margin }),
    ...(width && { width }),
    ...(itemMargin && { margin: itemMargin }),
    ...(itemPadding && { padding: itemPadding }),
    ...(itemBackgroundColor && { background: itemBackgroundColor }),
  };
};

const Container = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle}
`;

export { Container, ImageTouchableOpacity };
