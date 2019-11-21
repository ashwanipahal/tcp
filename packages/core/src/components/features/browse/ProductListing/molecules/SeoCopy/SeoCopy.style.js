import { css } from 'styled-components';

export default css`
  .title {
    text-align: center;
    padding-bottom: 14px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    color: ${props => props.theme.colorPalette.gray[900]};
  }

  &.seo-text {
    padding-bottom: 24px;
    padding-left: 14px;
    padding-right: 14px;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: 35px;
      padding-left: 19px;
      padding-right: 15px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-bottom: 24px;
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  .body-copy {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    text-align: left;

    p {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }

    a {
      color: ${props => props.theme.colorPalette.gray[900]};
    }
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
