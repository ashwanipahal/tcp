import styled from 'styled-components/native';

export const RichTextWrapper = styled.View`
  width: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  min-height: 600px;
  overflow: hidden;
`;

export const PointsClaimWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
