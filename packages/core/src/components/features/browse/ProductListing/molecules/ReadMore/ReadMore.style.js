import { css } from 'styled-components';

export default css`
  .body-copy {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};

    h1 {
      font-size: ${props => props.theme.typography.fontSizes.fs22};
      font-weight: ${props => props.theme.typography.fontWeights.black};
    }
  }

  .read-more-state {
    display: none;
  }

  .read-more-target {
    max-height: 0;
    font-size: 0;
    transition: 0.25s ease;
  }

  .read-more-state:checked ~ .body-copy .read-more-target {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    max-height: 999em;
  }

  .read-more-trigger:before {
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }
  .read-more-state ~ .read-more-trigger:before {
    content: 'Read More+';
  }

  .read-more-state:checked ~ .read-more-trigger:before {
    content: 'Read Less-';
  }

  .read-more-trigger {
    cursor: pointer;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .body-copy {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .body-copy {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
`;
