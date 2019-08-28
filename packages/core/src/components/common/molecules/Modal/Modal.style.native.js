import styled from 'styled-components/native';
import { Platform } from 'react-native';

const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ModalHeading = styled.Text`
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 80%;
`;

const LineWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

const RowWrapper = styled.View`
  margin: ${Platform.OS === 'ios'
      ? props => props.theme.spacing.ELEM_SPACING.XXXL
      : props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  flex-direction: row;
`;

const ImageWrapper = styled.View`
  width: 20%;
`;

export {
  StyledCrossImage,
  ImageWrapper,
  StyledTouchableOpacity,
  ModalHeading,
  LineWrapper,
  RowWrapper,
};
