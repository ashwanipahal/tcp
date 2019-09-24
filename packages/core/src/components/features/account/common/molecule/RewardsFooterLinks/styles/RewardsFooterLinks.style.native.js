import styled from 'styled-components/native';

export const StyledAnchorWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const AnchorLeftMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;
