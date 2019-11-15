import styled from 'styled-components/native';

const SkeletonWrapperView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
  border: 1px solid ${props => props.theme.colorPalette.gray[700]};
`;

const SkeletonSpacingView = styled.View`
  margin-bottom: 20px;
`;

export { SkeletonWrapperView, SkeletonSpacingView };
