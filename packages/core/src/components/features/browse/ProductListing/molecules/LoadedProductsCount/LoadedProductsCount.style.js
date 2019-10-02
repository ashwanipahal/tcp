import { css } from 'styled-components';

export default css`
  text-align: right;
  .count-section {
    position: relative;
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .show-label {
      display: none;
    }
  }

  .items-count-content-number {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
  }

  .items-count-content {
    position: relative;
  }
`;
