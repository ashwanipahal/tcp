import { css } from 'styled-components';

export default css`
  .body-copy {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    text-align: left;

    p {
      margin-bottom: 10px;
    }

    a {
      color: ${props => props.theme.colorPalette.gray[900]};
    }

    h1 {
      font-size: ${props => props.theme.typography.fontSizes.fs22};
      font-weight: ${props => props.theme.typography.fontWeights.black};
      text-align: center;
    }
  }

  .read-more-state {
    display: none;
  }

  .read-less {
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

  .read-more-trigger {
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    cursor: pointer;
  }

  .read-more-state:checked ~ .read-more-trigger {
    .read-more {
      display: none;
    }
    .read-less {
      display: block;
    }
  }
`;
