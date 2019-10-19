import { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const alignCenter = () => `
    text-align: center;
`;
const paddingTopSm = props => `
    padding-top: ${props.theme.spacing.ELEM_SPACING.SM};
`;
const paddingTopMed = props => `
    padding-top: ${props.theme.spacing.ELEM_SPACING.MED};
`;
const fontSize10 = props => `
    font-size: ${props.theme.typography.fontSizes.fs10};
`;
const fontSize12 = props => `
    font-size: ${props.theme.typography.fontSizes.fs12};
`;
const fontSize14 = props => `
    font-size: ${props.theme.typography.fontSizes.fs14};
`;
const fontSize16 = props => `
    font-size: ${props.theme.typography.fontSizes.fs16};
`;
const fontSize18 = props => `
    font-size: ${props.theme.typography.fontSizes.fs18};
`;
const fontSize20 = props => `
    font-size: ${props.theme.typography.fontSizes.fs20};
`;
const fontSize24 = props => `
    font-size: ${props.theme.typography.fontSizes.fs24};
`;
const colorTheme = props => `
    color: ${plccMpr(props)};
`;

const Styles = css`
  .mpr-plcc-theme {
    ${colorTheme}
  }
  .heading-val {
    ${paddingTopSm}
    ${alignCenter}
    ${props => {
      if (props.isPlcc) {
        return `${fontSize16(props)}${colorTheme(props)}`;
      }
      return fontSize12;
    }};

    @media ${props => props.theme.mediaQuery.medium} {
        ${props => (props.isPlcc ? fontSize14 : fontSize10)};
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${paddingTopMed}
        ${props => (props.isPlcc ? fontSize18 : fontSize16)};
    }
  }
  .subheading-val {
    ${alignCenter}
    ${colorTheme}
    ${paddingTopSm}
    ${fontSize18}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize14}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${paddingTopMed}
        ${fontSize20}
    }
  }
  .description-val {
    ${alignCenter}
    ${paddingTopSm}
    ${fontSize12}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize10}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${paddingTopMed}
        ${fontSize16}
    }
  }
  .remaining-val {
    ${alignCenter}
    ${paddingTopSm}
    ${fontSize12}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize10}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${paddingTopMed}
        ${fontSize16}
    }
  }
  .subtotal-section {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[300]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    ${paddingTopSm}
    @media ${props => props.theme.mediaQuery.large} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
        ${paddingTopMed}
    }
  }
  .current-subtotal-val-col,
  .estimated-subtotal-val-col {
    text-align: right;
  }
  .current-subtotal-text {
    color: ${props => props.theme.colorPalette.gray[800]};
    ${fontSize12}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize12}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${fontSize14}
    }
  }
  .current-subtotal-val {
    ${fontSize14}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize14}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${fontSize16}
    }
  }
  .estimated-subtotal-text {
    color: ${props => props.theme.colorPalette.gray[800]};
    ${fontSize12}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize12}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${fontSize14}
    }
  }
  .estimated-subtotal-val {
    ${fontSize16}
    @media ${props => props.theme.mediaQuery.medium} {
        ${fontSize16}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${fontSize18}
    }
  }

  ${props =>
    props.isReviewPage
      ? `
        .heading-val {
          ${paddingTopSm(props)}
          ${fontSize16(props)}
          ${colorTheme(props)}
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize14(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize18(props)}
          }
        }
        .subheading-val {
          ${paddingTopSm(props)}
          ${fontSize12(props)}
          color: ${props.theme.colorPalette.gray[900]};
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize10(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize16(props)}
          }
        }
      `
      : ``};

  ${props =>
    props.isConfirmationPage
      ? `
        .heading-val {
          ${paddingTopSm(props)}
          ${fontSize16(props)}
          ${colorTheme(props)}
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize14(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize24(props)}
          }
        }
        .subheading-val {
          ${paddingTopSm(props)}
          ${fontSize12(props)}
          color: ${props.theme.colorPalette.gray[900]};
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize10(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize16(props)}
          }
        }
      `
      : ``};
  ${props =>
    props.isAddedToBagPage
      ? `
        .heading-val {
          ${paddingTopSm(props)}
          ${fontSize16(props)}
          ${colorTheme(props)}
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize16(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize16(props)}
          }
        }
        .subheading-val {
          ${paddingTopSm(props)}
          ${fontSize12(props)}
          color: ${props.theme.colorPalette.gray[900]};
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize12(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize12(props)}
          }
        }
        .description-val {
          ${paddingTopSm(props)}
          ${fontSize12(props)}
          @media ${props.theme.mediaQuery.medium} {
            ${fontSize12(props)}
          }
          @media ${props.theme.mediaQuery.large} {
            ${fontSize12(props)}
          }
        }
      `
      : ``};
`;

// ${props => (props.pageCategory ? `` : ``)};
export default Styles;
