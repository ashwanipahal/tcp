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
    font-size: 12px;
  }
  .save30Today {
    font-size: 18px;
  }
  .currentSubtotalVal {
    font-size: 14px;
  }
  .estimatedSubtotalVal {
    font-size: 16px;
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
      font-size: 10px;
    }
    .save30Today,
    .currentSubtotalVal {
      font-size: 14px;
    }
    .currentSubtotalText,
    .estimatedSubtotalText {
      font-size: 12px;
    }
    .estimatedSubtotalVal {
      font-size: 16px;
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
      font-size: 16px;
    }
    .save30Today {
      font-size: 20px;
    }
    .currentSubtotalText,
    .estimatedSubtotalText {
      font-size: 14px;
    }
    .estimatedSubtotalVal {
      font-size: 18px;
    }
  }
`;

export default Styles;
