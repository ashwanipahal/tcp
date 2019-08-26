import styled from 'styled-components/native';

const ModalHeading = styled.Text`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  height: 600px;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export { ModalHeading, ModalViewWrapper, LineWrapper };
