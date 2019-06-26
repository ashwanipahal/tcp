import { css } from 'styled-components';

export default css`
  font-size: 12px;
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  padding: 24px 0 12px;
  color: ${props => props.theme.colors.WHITE};

  @media ${props => props.theme.mediaQuery.large} {
    color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  }

  p {
    margin: 0;
  }
`;
