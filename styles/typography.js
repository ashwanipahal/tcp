import { css } from 'styled-components';
import { rem } from 'polished';
import * as theme from './theme';
import utils from './utils';

const {
  colors,
  fonts,
  fonts: {
    fontSize: { heading, body, link },
    fontWeight,
  },
  mediaQuery,
} = theme.default;

export default css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  .h7 {
    margin: 0 0 20px 0;
    color: ${colors.BLACK};

    &.-dark {
      color: ${colors.BLACK};
    }

    &.-light {
      color: ${colors.WHITE};
    }
  }

  h1,
  .h1 {
    font: ${rem(heading.small.h1)} / ${rem(heading.small.h1)} ${fonts.primaryFontFamily};
    letter-spacing: 1px;
    line-height: 1.3;
    font-weight: ${fontWeight.black};

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h1)};
      line-height: 1.12;
    }

    &.-underline {
      ${utils.underlineText(colors.BLACK, 2, 8)};
    }
  }

  h2,
  .h2 {
    font: ${rem(heading.small.h2)} / ${rem(heading.small.h2)} ${fonts.primaryFontFamily};
    letter-spacing: 1px;
    line-height: 1.25;

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h2)};
    }
  }

  h3,
  .h3 {
    font: ${rem(heading.small.h3)} / ${rem(heading.small.h3)} ${fonts.primaryFontFamily};
    letter-spacing: 1px;
    line-height: 2;

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h3)};
      line-height: ${rem(54)};
    }

    ${utils.underlineText(colors.BLACK, 2, 8)};

    &.-secondary {
      margin-bottom: 10px;

      @media ${mediaQuery.medium} {
        line-height: ${rem(34)};
      }

      span {
        padding: 0;
        background: none;
      }
    }

    &.-light {
      ${utils.underlineText(colors.WHITE, 2, 8)};
    }
  }

  h4,
  .h4 {
    font: ${rem(heading.small.h4)} / ${rem(heading.small.h4)} ${fonts.primaryFontFamily};
    letter-spacing: 1px;
    line-height: 1.42;
    margin-bottom: 25px;

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h4)};
      line-height: 1.25;
    }

    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 12px;
      margin-top: 15px;
      background-color: ${colors.BLACK};
    }

    &.-secondary {
      margin-bottom: 10px;

      &::after {
        content: none;
      }
    }

    &.-tertiary {
      &::after {
        content: none;
      }

      @media ${mediaQuery.small} {
        &::after {
          content: '';
        }
      }
    }
  }

  h5,
  .h5 {
    font: ${rem(heading.small.h5)} / ${rem(heading.small.h5)} ${fonts.primaryFontFamily};
    font-weight: ${fontWeight.medium};
    letter-spacing: 2px;
    line-height: 1.5;
    text-transform: uppercase;
    margin-bottom: 10px;

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h5)};
      line-height: 1.66;
      letter-spacing: 2px;
    }
  }

  h6,
  .h6 {
    font: ${rem(heading.small.h6)} / ${rem(heading.small.h6)} ${fonts.primaryFontFamily};
    font-weight: ${fontWeight.medium};
    letter-spacing: 2px;
    line-height: 1.5;
    text-transform: uppercase;
    margin-bottom: 15px;

    @media ${mediaQuery.medium} {
      font-size: ${rem(heading.large.h6)};
      line-height: 1.66;
    }
  }

  p {
    font-size: ${rem(body.small.primary)};
    line-height: 1.625;
    letter-spacing: 0.4px;
    color: ${colors.TEXT.GRAY};
    margin: 0;
    white-space: pre-wrap;

    @media ${mediaQuery.medium} {
      font-size: ${rem(body.large.primary)};
    }

    & + p {
      margin-top: 15px;
    }

    & + .a-anchorButton {
      margin-top: 25px;
    }

    &.-download {
      font-size: ${rem(link.small.primary)};
      line-height: 1;
      color: ${colors.BLACK};
      font-weight: ${fontWeight.medium};

      & + p {
        margin-top: 5px;
      }
    }

    &.-secondary {
      font-size: ${rem(body.small.secondary)};
      line-height: 1.3;
      color: ${colors.BLACK};

      @media ${mediaQuery.medium} {
        font-size: ${rem(body.large.secondary)};
      }
    }

    &.-tertiary {
      font-size: ${rem(body.small.tertiary)};
      line-height: 1.42;

      @media ${mediaQuery.medium} {
        font-size: ${rem(body.large.tertiary)};
      }
    }

    &.-quaternary {
      font-size: ${rem(body.small.quaternary)};
      line-height: 1.33;
      font-weight: ${fontWeight.medium};
      color: ${colors.BLACK};

      @media ${mediaQuery.medium} {
        font-size: ${rem(body.large.quaternary)};
      }
    }

    &.-quinary {
      font-size: ${rem(body.small.quinary)};
      line-height: 1.33;

      & + p {
        margin-top: 8px;
      }

      @media ${mediaQuery.medium} {
        font-size: ${rem(body.large.quinary)};

        & + p {
          margin-top: 15px;
        }
      }
    }

    &.-senary {
      font-size: ${rem(body.small.senary)};
      line-height: 1.33;
      color: ${colors.BLACK};

      @media ${mediaQuery.medium} {
        font-size: ${rem(body.large.senary)};
      }
    }

    &.-dark {
      color: ${colors.BLACK};
    }

    &.-light {
      color: ${colors.WHITE};
    }

    &.-bold {
      font-weight: ${fontWeight.medium};
    }
  }

  small {
    &.-primary {
      font-size: ${rem(body.small.primary)};
      font-weight: ${fontWeight.normal};
      letter-spacing: 0.04em;
      line-height: 1.3;
      color: ${colors.TEXT.GRAY};
    }

    &.-secondary {
      font-size: ${rem(body.small.secondary)};
      font-weight: ${fontWeight.bold};
      line-height: 1;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: ${colors.TEXT.GRAY};
    }
  }

  a {
    &.-link {
      &.-primary {
        font-size: ${rem(link.small.primary)};

        @media ${mediaQuery.small} {
          font-size: ${rem(link.large.primary)};
          line-height: 1.15;
          letter-spacing: 1px;
        }
      }

      &.-secondary {
        font-size: ${rem(link.small.primary)};
        text-decoration: none;

        @media ${mediaQuery.small} {
          font-size: ${rem(link.large.primary)};
          line-height: 1.15;
          letter-spacing: 1px;
        }
      }
    }

    &.-underline {
      display: inline-block;
      ${utils.underlineText(colors.TEXT.GRAY, 1, 8)};
    }

    &.-small {
      font-size: ${rem(link.small.primary)};

      &.-underline {
        ${utils.underlineText(colors.TEXT.GRAY, 1, 4)};
      }
    }
  }

  &.-notify {
    margin-bottom: 20px;
    display: inline-block;
  }

  a,
  button {
    &.-cta {
      font-family: ${fonts.primaryFontFamily};
      font-size: ${rem(link.small.primary)};
      line-height: 1.15;
      letter-spacing: 2px;
    }
  }
`;
