import { css } from 'styled-components';

const styles = css`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};

  .container {
    margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.SM}
      ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    min-height: 419px;
  }
  .TextBox__input {
    background: transparent;
  }
  .email-signup-container {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  }
  .emailSignupText {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  .pickupError {
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .checkoutPickupForm {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  @media ${props => props.theme.mediaQuery.large} {
    .pickUpContact {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .pickUpContact {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
    .container {
      margin: 0px;
    }
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .pickUpContact {
      margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    .container {
      margin: 0px;
    }
  }

  .pick-up-form-container,
  .mail-signup-container,
  .pickUpAlternate-container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  .editFormActionsContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};

    .edit-pickup-error {
      padding-top: 0;
      @media ${props => props.theme.mediaQuery.medium} {
        justify-content: flex-end;
      }
      span {
        font-size: ${props => props.theme.typography.fontSizes.fs12};
        font-weight: ${props => props.theme.typography.fontWeights.extrabold};
      }
      img {
        padding-left: 0;
      }
    }

    .buttonContainer {
      display: flex;
      justify-content: flex-end;
    }
  }

  .updateButton {
    margin-left: 30px;
  }
`;

export default styles;
