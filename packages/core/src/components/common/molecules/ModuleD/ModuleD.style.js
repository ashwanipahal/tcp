import { css } from 'styled-components';

export default css`
  a {
    color: ${props => props.theme.colors.TEXT.DARKGRAY};
  }

  .moduleD_button {
    margin: 19px auto 32px;
    padding: 12px 0;
    width: 225px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: 35px auto 48px;
      padding: 16px 0;
      width: 210px;
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
  .moduleD_tile {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .moduleD_link {
    text-align: center;
  }
`;
