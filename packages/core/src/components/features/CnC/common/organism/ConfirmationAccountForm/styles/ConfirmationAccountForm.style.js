import { css } from 'styled-components';

const styles = css`
  background-color: ${props => props.theme.colorPalette.gray[300]};

  .heading {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }

  .password-container {
    position: relative;

    .hide-show {
      position: absolute;
      right: 0;
      top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      text-align: right;

      .info-icon-img-wrapper {
        width: 10px;
        margin: auto;
      }

      &.confirm-pwd {
        top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
  }

  .TextBox__input {
    background: transparent;
  }
`;

export default styles;
