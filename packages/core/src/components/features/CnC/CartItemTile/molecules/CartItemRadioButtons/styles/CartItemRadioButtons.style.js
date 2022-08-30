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
    border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    margin: -1px 0;
  }
  .normal-select-box {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    margin: -1px 0;
  }

  .selected-method {
    border-left: 1px solid ${props => props.theme.colorPalette.gray[600]};
    border-right: 1px solid ${props => props.theme.colorPalette.gray[600]};

    &.disabled {
      .radio-button-checked {
        display: none;
      }
    }
  }
  .main-container {
    display: flex;
    flex-direction: column;

    &.disabled {
      opacity: 0.5;
    }
  }

  .disabled .radio-button {
    opacity: 0.5;
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
    justify-content: space-between;
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    @media ${props => props.theme.mediaQuery.large} {
      justify-content: flex-start;
    }
  }

  .disabled-icon {
    position: absolute;
    top: 14px;
    left: 14px;
  }
`;

export default styles;
