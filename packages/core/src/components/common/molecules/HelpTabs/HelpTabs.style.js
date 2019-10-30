import { css, styled } from 'styled-components';
import { Button } from '../../atoms';

export const TabButton = styled(Button)`
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  color: ${props => props.theme.colorPalette.gray['900']};
  padding: 0;
  letter-spacing: normal;
`;
export default css``;
