import styled from 'styled-components';

export const TrackOrderTopSectionView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const ModalHeader = styled.Text`
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy7}px;
`;

export default { TrackOrderTopSectionView, ModalHeader };
