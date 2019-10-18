import { css } from 'styled-components';

const Styles = css`
  .youCanEarnPoints,
  .save30Today,
  .earnDoublePoints,
  .subtotalPointsSection {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .subtotalPointsSection {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .youCanEarnPoints,
  .earnDoublePoints,
  .currentSubtotalText,
  .estimatedSubtotalText {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
  }
  .save30Today {
    font-size: ${props => props.theme.typography.fontSizes.fs18};
  }
  .currentSubtotalVal {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
  .estimatedSubtotalVal {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .youCanEarnPoints,
    .save30Today,
    .earnDoublePoints,
    .subtotalPointsSection {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .subtotalPointsSection {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .youCanEarnPoints,
    .earnDoublePoints {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
    }
    .save30Today,
    .currentSubtotalVal {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .currentSubtotalText,
    .estimatedSubtotalText {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    .estimatedSubtotalVal {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .youCanEarnPoints,
    .save30Today,
    .earnDoublePoints,
    .subtotalPointsSection {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
    .subtotalPointsSection {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
    .youCanEarnPoints,
    .earnDoublePoints,
    .currentSubtotalVal {
      font-size: ${props => props.theme.typography.fontSizes.fs16};
    }
    .save30Today {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
    }
    .currentSubtotalText,
    .estimatedSubtotalText {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .estimatedSubtotalVal {
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
  }

  ${props =>
    props.isProductDetailView
      ? `
    .youCanEarnPoints {
      color: ${
        props.isPlcc
          ? props.theme.colorPalette.userTheme.plcc
          : props.theme.colorPalette.userTheme.mpr
      };
      font-size: ${props.theme.typography.fontSizes.fs20};
      padding-top: ${props.theme.spacing.ELEM_SPACING.SM};
    }
    .save30Today {
      color: ${props.theme.colorPalette.gray[900]};
      font-size: ${props.theme.typography.fontSizes.fs12};
      padding-top: ${props.theme.spacing.ELEM_SPACING.XXS};
    }
    `
      : ``};

  ${props =>
    props.isReviewPage
      ? `
        .youCanEarnPoints {
          color: ${
            props.isPlcc
              ? props.theme.colorPalette.userTheme.plcc
              : props.theme.colorPalette.userTheme.mpr
          };
          font-size: ${props.theme.typography.fontSizes.fs18};
          padding-top: ${props.theme.spacing.ELEM_SPACING.SM};
        }
        .save30Today {
          color: ${props.theme.colorPalette.gray[900]};
          font-size: ${props.theme.typography.fontSizes.fs16};

        }
        .footer{
          display: ${props.isPlcc ? '' : 'none'};
        }
        `
      : ``};
`;

export default Styles;
