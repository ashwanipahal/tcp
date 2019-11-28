import { css } from 'styled-components';

const stylesGridPromo = css`
  &.promo-div {
    height: 100%;
    text-align: center;
    background: url(https://test1.theplace.com/image/upload${props => props.promoObj && props.promoObj.mediaWrapper && props.promoObj.mediaWrapper[0] && props.promoObj.mediaWrapper[0].url});
    display: flex;
    flex-direction: column;
    justify-content: center;

    .highlighted-text {
      background: linear-gradient(to top, yellow 70%, transparent 70%);
      padding: 0 15px;
      @media ${props => props.theme.mediaQuery.smallOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs28};
      }
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs32};
      }
    }
    .headline-wrapper {
      padding-bottom: 12px;
    }
    .middle-text-wrapper {
      padding-bottom: 30px;
    }

    .middle-text-wrapper > p {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs18};
        font-weight: ${props => props.theme.typography.fontWeights.black};
      }
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs20};
        font-weight: ${props => props.theme.typography.fontWeights.black};
      }
    }
    .description-wrapper {
      padding-bottom: 24px;
    }

    .description-wrapper > p {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs10};
      }
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs12};
      }
    }

    .cta-wrapper > a {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs10};
      }
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        font-size: ${props => props.theme.typography.fontSizes.fs10};
      }
    }
  }
`;
export default stylesGridPromo;
