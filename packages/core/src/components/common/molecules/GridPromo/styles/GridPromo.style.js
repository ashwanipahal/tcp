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
    }
    .headline-wrapper {
      padding-bottom: 12px;
    }
    .middle-text-wrapper {
      padding-bottom: 30px;
    }

    .description-wrapper {
      padding-bottom: 24px;
    }
  }
`;
export default stylesGridPromo;
