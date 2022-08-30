import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colorPalette.red['400']};
  margin-bottom: 40px;

  .heading-wrapper {
    padding-top: 32px;

    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: 24px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
    }
  }

  .button-list-wrapper {
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .stacked-button-list-wrapper {
    @media ${props => props.theme.mediaQuery.smallMax} {
      padding-bottom: 0px;
    }
  }

  .text_normal {
    margin-top: 0px;
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: -14px;
    }
  }

  .stacked-cta-wrapper-class {
    padding-top: 16px;
    padding-right: 20px;
    padding-bottom: 16px;
    padding-left: 20px;
    color: ${props =>
      props.theme.isGymboree &&
      props.ctaType === 'stackedCTAButtons' &&
      props.theme.colorPalette.red['300']};
  }

  .dropdown-button {
    margin-top: 32px;
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 48px;
    }
  }

  h3.link-text {
    margin: 0;
    margin-bottom: 5px;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline;
      margin-bottom: 0;
    }
  }

  .percentage_inline_promo {
    @media ${props => props.theme.mediaQuery.large} {
      margin-left: 10px;
    }
  }

  .promo-link {
    color: ${props => props.theme.colorPalette.white};
  }

  .moduleN-heading-wrapper {
    display: inline-block;
    margin-top: 14px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 17px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 46px 6px 0 0;
    }
  }

  .ModuleN-heading {
    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .heading-wrapper {
      text-align: center;
      display: ${props => (props.halfWidth ? 'block' : 'flex')};
      align-items: center;
      justify-content: center;
      padding-bottom: 0px;
      padding-top: 24px;
    }
    .heading,
    .moduleN__promo-banner {
      display: block;
      margin-bottom: 0px;
    }
  }
  .ModuleN_Button .link-button-wrapper-class {
    border-bottom-color: ${props => props.theme.colorPalette.white};
  }
`;
