import { css } from 'styled-components';

export default css`
  .count-section {
    position: relative;
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
    position: absolute;
    right: 15px;
  }
`;
