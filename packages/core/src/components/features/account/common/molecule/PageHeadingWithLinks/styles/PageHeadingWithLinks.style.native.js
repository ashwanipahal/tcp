import styled from 'styled-components/native';

const StyledAnchorWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const AnchorLeftMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export { StyledAnchorWrapper, AnchorLeftMargin };
