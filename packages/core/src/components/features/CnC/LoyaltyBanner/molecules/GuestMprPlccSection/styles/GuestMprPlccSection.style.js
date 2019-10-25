import { css } from 'styled-components';
import CHECKOUT_STAGES, {
  ADDED_TO_BAG_PAGE,
} from '../../../../../../../../../web/src/pages/App.constants';

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
const paddingLeftXxs = props => `
    padding-left: ${props.theme.spacing.LAYOUT_SPACING.XXS};
`;
const paddingRightXxs = props => `
    padding-right: ${props.theme.spacing.LAYOUT_SPACING.XXS};
`;
const paddingLeftMed = props => `
    padding-left: ${props.theme.spacing.LAYOUT_SPACING.MED};
`;
const paddingRightMed = props => `
    padding-right: ${props.theme.spacing.LAYOUT_SPACING.MED};
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
    ${props => colorTheme(props)}
  }
  .heading-val {
    ${props => paddingTopSm(props)}
    ${alignCenter()}
    ${props => {
      if (props.isPlcc) {
        return `${fontSize16(props)}${colorTheme(props)}${paddingLeftMed(props)}${paddingRightMed(
          props
        )}`;
      }
      return fontSize12(props);
    }};

    @media ${props => props.theme.mediaQuery.medium} {
        ${props =>
          props.isPlcc
            ? `${fontSize14(props)}${paddingLeftXxs(props)}${paddingRightXxs(props)}`
            : fontSize10(props)};
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => paddingTopMed(props)}
        ${props =>
          props.isPlcc
            ? `${fontSize18(props)}${paddingLeftMed(props)}${paddingRightMed(props)}`
            : fontSize16(props)};
    }
  }
  .subheading-val {
    ${alignCenter()}
    ${props => colorTheme(props)}
    ${props => paddingTopSm(props)}
    ${props => fontSize18(props)}

    .section-symbol{
      vertical-align: super;
      ${alignCenter}
      ${fontSize12}
    }

    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize14(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => paddingTopMed(props)}
        ${props => fontSize20(props)}
    }
  }
  .description-val {
    ${alignCenter()}
    ${props => paddingTopSm(props)}
    ${props => fontSize12(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize10(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => paddingTopMed(props)}
        ${props => fontSize16(props)}
    }
  }
  .remaining-val {
    ${alignCenter()}
    ${props => paddingTopSm(props)}
    ${props => fontSize12(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize10(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => paddingTopMed(props)}
        ${props => fontSize16(props)}
    }
  }
  .subtotal-section {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[300]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    ${props => paddingTopSm(props)}
    @media ${props => props.theme.mediaQuery.large} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
        ${props => paddingTopMed(props)}
    }
  }
  .current-subtotal-val-col,
  .estimated-subtotal-val-col {
    text-align: right;
  }
  .current-subtotal-text {
    color: ${props => props.theme.colorPalette.gray[800]};
    ${props => fontSize12(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize12(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => fontSize14(props)}
    }
  }
  .current-subtotal-val {
    ${props => fontSize14(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize14(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => fontSize16(props)}
    }
  }
  .estimated-subtotal-text {
    color: ${props => props.theme.colorPalette.gray[800]};
    ${props => fontSize12(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize12(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => fontSize14(props)}
    }
  }
  .estimated-subtotal-val {
    ${props => fontSize16(props)}
    @media ${props => props.theme.mediaQuery.medium} {
        ${props => fontSize16(props)}
    }
    @media ${props => props.theme.mediaQuery.large} {
        ${props => fontSize18(props)}
    }
  }

  ${props =>
    props.pageCategory === CHECKOUT_STAGES.REVIEW
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
    props.pageCategory === CHECKOUT_STAGES.CONFIRMATION
      ? `
        .heading-val {
          ${paddingTopSm(props)}
          ${fontSize16(props)}
          ${
            props.earnedRewardAvailable
              ? colorTheme(props)
              : `color: ${props.theme.colorPalette.gray[900]};`
          }
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
    props.pageCategory === ADDED_TO_BAG_PAGE
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
