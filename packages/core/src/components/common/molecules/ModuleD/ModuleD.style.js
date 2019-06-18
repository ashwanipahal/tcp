import { css } from 'styled-components';

export default css`
  border: 1px solid ${props => props.theme.colors.BUTTON.BORDER};

  a {
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
  }

  .moduleD_button {
    margin: 19px auto 32px;
    padding: 12px 45px;

    @media ${props => props.theme.mediaQuery.large} {
      margin: 35px auto 48px;
      padding: 16px 65px;
    }
  }

  .moduleD_header {
    font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    text-transform: uppercase;
    text-align: center;

    @media ${props => props.theme.mediaQuery.smallMax} {
      font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
    }
  }
`;
