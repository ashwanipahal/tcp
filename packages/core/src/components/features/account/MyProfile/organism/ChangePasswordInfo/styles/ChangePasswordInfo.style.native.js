import styled from 'styled-components/native';

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  height: 600px;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default ModalViewWrapper;
