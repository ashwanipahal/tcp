import { css } from 'styled-components';

export default css`
  .hide {
    display: none;
  }

  .no-flex {
    display: block;
  }

  #tcp-get-candid-image-container {
    max-width: 1056px;
    margin: 0 auto;
  }

  @media ${props => props.theme.mediaQuery.xlarge} {
    #tcp-get-candid-image-container {
      max-width: 1280px;
      margin: 0 auto;
    }
  }

  .get-candid-main-heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .get-candid-heading-desc {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  div.get-candid-button-container {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    margin: 17px auto 32px;
  }

  .gellary-button-right {
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 164px;
      margin-left: 7px;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
      margin-left: 6px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
      margin-left: 6px;
    }
  }

  .gallery-button-left {
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: 164px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      width: 162px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 210px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;
