import styled from 'styled-components';

const TrackOrderViewNative = styled.View`
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const GenericErrorView = styled.View`
  display: flex;
  flex-direction: row;
`;

const AnchorView = styled.View`
  padding: 0 3px;
  font-weight: 800;
`;

export { TrackOrderViewNative, GenericErrorView, AnchorView };
