import { css } from 'styled-components';

const styles = css`
  .banner-wrapper {
    padding-left: 20px;
    display: flex;
  }
  .triangle-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid ${props => props.theme.colorPalette.yellow[500]};
    border-bottom: 10px solid transparent;
  }
  .promo-wrapper {
    display: flex;
    padding-right: 10px;
    align-items: center;
    background-color: ${props => props.theme.colorPalette.yellow[500]};
  }
  .off-label {
    display: inline;
    padding-left: 5px;
  }
  .richtextCss {
    margin-top: 4px;
    margin-left: 3px;
  }

  .fullBleedBanner {
    text-align: center;

    .banner {
      width: 310px;
      height: 24px;
      background-color: ${props => props.theme.colorPalette.yellow[500]};
    }
    .pickUp {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .addedtobag-bossbanner {
      line-height: 2.9;
    }
  }
`;

export default styles;