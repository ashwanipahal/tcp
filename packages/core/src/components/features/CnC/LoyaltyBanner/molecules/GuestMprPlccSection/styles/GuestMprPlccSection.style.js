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
`;

export default Styles;
