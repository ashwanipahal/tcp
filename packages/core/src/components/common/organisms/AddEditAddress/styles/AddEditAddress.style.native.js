import styled from 'styled-components/native';

const ModalHeading = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const LineWrapper = styled.View`
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export { ModalHeading, LineWrapper };
