import styled from 'styled-components/native';

export const StyledAnchorWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const AnchorLeftMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const UnderlineStyle = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[600]};
  height: 1px;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
