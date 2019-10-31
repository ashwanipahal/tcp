import styled, { css } from 'styled-components';
import { Button } from '../../atoms';

export const TabButton = styled(Button)`
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  color: ${props => props.theme.colorPalette.gray['900']};
  padding: 0;
  line-height: normal;
  letter-spacing: normal;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
  @media ${props => props.theme.mediaQuery.large} {
    width: 330px;
    height: 107px;
  }
`;
export default css``;
