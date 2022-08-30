import styled from 'styled-components/native';

export const RichTextWrapper = styled.View`
  min-height: 170px;
  overflow: hidden;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export default RichTextWrapper;
