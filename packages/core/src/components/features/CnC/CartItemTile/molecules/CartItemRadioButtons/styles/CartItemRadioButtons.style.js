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
    border-top: 1px solid ${props => props.theme.colorPalette.gray[900]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[900]};

    &.disabled {
      border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    }
  }
  .normal-select-box {
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[900]};

    &.disabled {
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    }
  }
  .selected-method {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[900]};
    border-right: 1px solid ${props => props.theme.colorPalette.gray[900]};

    &.disabled {
      border-left: 1px solid ${props => props.theme.colorPalette.gray[600]};
      border-right: 1px solid ${props => props.theme.colorPalette.gray[600]};

      .radio-button-checked {
        display: none;
      }
    }
  }
  .main-container {
    display: flex;
    flex-direction: column;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .subtitle-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .disabled-icon {
    position: absolute;
    top: 14px;
    left: 14px;
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
