import { css } from 'styled-components';

export default css`
  .title {
    text-align: center;
    margin-bottom: 14px;
  }

  &.seo-text {
    padding: 24px 14px 0px 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      padding: 24px 15px 0px 19px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: 24px 40px 0px 50px;
    }
  }

  .body-copy {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    text-align: left;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .read-more-state {
    display: none;
  }

  .read-less {
    display: none;
  }
  .read-more-target {
    display: none;
  }

  &.read-more-expanded .read-more-target {
    display: block;
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
  }

  .read-more-trigger {
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    cursor: pointer;
  }

  .read-more-state:checked ~ .read-more {
    display: none;
  }

  .read-more-state:checked ~ .read-less {
    display: block;
  }
`;
