import styled from 'styled-components/native';

const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
`;

const ModalHeading = styled.Text`
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.theme.colorPalette.black};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING[props.paddingBottom || 'MED']};
`;

const LineWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const RowWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XXXL}
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: column;
`;

const ModalHeadingWrapper = styled.View`
  flex: 0.9;
`;

const ImageWrapper = styled.View`
  flex: 0.1;
`;

export {
  StyledCrossImage,
  ModalHeadingWrapper,
  ImageWrapper,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
};
