import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colorPalette.red['400']};
  margin-bottom: 40px;

  .heading-wrapper {
    padding: 16px 0;

    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding-top: 16px;
      padding-bottom: 24px;
    }
  }

  .stacked-cta-wrapper-class {
    color: ${props =>
      props.theme.isGymboree && props.ctaType === 'stackedCTAButtons'
        ? props.theme.colorPalette.gray['700']
        : props.theme.colorPalette.red['300']};
  }

  .ModuleN_Button a {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 24px;
    }
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
      padding-top: ${props => (props.theme.isGymboree ? '32px' : '16px')};
    }
    .heading,
    .moduleN__promo-banner {
      display: block;
      margin-bottom: 0px;
    }
  }
`;
