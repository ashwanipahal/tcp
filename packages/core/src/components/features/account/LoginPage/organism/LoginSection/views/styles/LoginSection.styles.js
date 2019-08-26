import { css } from 'styled-components';

const styles = css`
  .elem-pl-LRG {
    padding-left: 15px;
  }
  .elem-pr-LRG {
    padding-right: 15px;
  }
  .checkoutForm {
    padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.CHECKOUT_MODAL};
    padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.CHECKOUT_MODAL};
  }
  .border {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};

    p {
      max-width: 227px;
      margin: 0 auto;
    }
  }
  .create-acc-cta {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .border.elem-pt-MED {
    padding-top: 27px;
  }
  .border.elem-pt-LRG {
    padding-bottom: 27px;
  }
  .password-required-msg {
    .reset-password-heading,
    .reset-password-list {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
      font-weight: ${props => props.theme.fonts.fontWeight.normal};
    }
    .reset-password-note {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
      text-align: center;
    }

    li:before {
      content: '-';
      text-indent: -5px;
    }
  }
`;

export default styles;
