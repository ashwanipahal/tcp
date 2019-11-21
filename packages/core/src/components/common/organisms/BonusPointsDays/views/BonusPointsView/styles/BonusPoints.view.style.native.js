import styled from 'styled-components/native';

export const RichTextWrapper = styled.View`
  height: 100%;
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
export const contentHeight = { minHeight: 600 };
