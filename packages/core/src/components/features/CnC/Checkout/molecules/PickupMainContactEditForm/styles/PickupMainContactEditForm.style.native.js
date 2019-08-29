import styled, { css } from 'styled-components/native';

const Style = css`
  width: 100%;
`;

const ModalHeading = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export { Style, ModalHeading };
