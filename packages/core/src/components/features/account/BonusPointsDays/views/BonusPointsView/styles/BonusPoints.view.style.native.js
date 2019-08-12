import styled from 'styled-components/native';

const RichTextWrapper = styled.View`
  height: 100%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;
export default RichTextWrapper;
