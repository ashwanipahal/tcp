import styled from 'styled-components/native';

export const RichTextWrapper = styled.View`
  width: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  min-height: 600px;
  overflow: hidden;
`;

export const contentHeight = { minHeight: 600 };

export const StyledAnchorWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const AnchorLeftMargin = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;
