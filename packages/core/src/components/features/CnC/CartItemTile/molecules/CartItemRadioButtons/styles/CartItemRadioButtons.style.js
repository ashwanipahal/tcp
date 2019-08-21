import { css } from 'styled-components';

const styles = css`
  width: 100%;
  .padding-left-5 {
    padding-left: 5px;
  }
  .padding-horizontal-5 {
    padding: 0 5px;
  }
  .padding-top-10 {
    padding-top: 10px;
  }
  margin-top: 20px;
  .common-select-box-css {
    padding-top: 13px;
    padding-bottom: 13px;
  }
  .select-box-1 {
    border-top: 1px solid ${props => props.theme.colors.GRAY};
    border-bottom: 1px solid ${props => props.theme.colors.GRAY};
  }
  .normal-select-box {
    border-bottom: 1px solid ${props => props.theme.colors.GRAY};
  }
  .selected-method {
    border-left: 1px solid ${props => props.theme.colors.GRAY};
    border-right: 1px solid ${props => props.theme.colors.GRAY};
  }
  .main-content-banner {
    display: flex;
  }
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
`;

export default styles;
