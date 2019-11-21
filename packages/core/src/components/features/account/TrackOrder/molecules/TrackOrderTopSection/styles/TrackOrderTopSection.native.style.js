import styled from 'styled-components';

export const TrackOrderTopSectionView = styled.View``;

export const TrackOrderTopHeader = styled.View`
  display: flex;
  flex-direction: row;
`;
export const ModalHeader = styled.View`
  width: 50%;
`;
export const TrackOrderSubHeader = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0 0;
`;
export const ImageWrapper = styled.View`
  width: 50%;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
  padding: 0px 0px ${props => props.theme.spacing.ELEM_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledCrossImage = styled.Image`
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default {
  TrackOrderTopSectionView,
};
