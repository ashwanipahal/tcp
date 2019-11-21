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
  .triangle-top {
    margin-left: 5px;
    position: absolute;
    top: 29px;
    left: 82px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid ${props => props.theme.colorPalette.yellow[500]};

    @media ${props => props.theme.mediaQuery.medium} {
      width: 0;
      height: 0;
      position: inherit;
      border-top: 10px solid transparent;
      border-right: 20px solid ${props => props.theme.colorPalette.yellow[500]};
      border-bottom: 10px solid transparent;
      margin-left: 0;
      border-left: 0;
    }
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

  .triangle-top + .promo-wrapper {
    width: 100%;
    max-width: 114px;
    height: 20px;

    .richtextCss {
      margin-right: auto;
      margin-left: auto;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-left: 3px;
      }
    }
  }
`;

export default styles;
