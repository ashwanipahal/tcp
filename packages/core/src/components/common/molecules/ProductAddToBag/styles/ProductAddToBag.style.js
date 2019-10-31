import { css } from 'styled-components';

const styles = css`
  ${props => (!props.marginTopNone ? `margin-top: 10px` : '')};
  .edit-form-css {
    display: flex;
    flex: 1;
    width: 100%;
    align-items: flex-start;
    margin-left: 0;
    margin-right: 0;
    margin-top: 25px;
  }
  .button-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .add-to-bag-button {
    max-width: 450px;
    text-align: center;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
    color: white;
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-stretch: normal;
    line-height: normal;
    font-style: normal;
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls1};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: 126px;
    padding-right: 125px;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.medium} {
      ${props =>
        !props.quickViewAddToBagActionPadding
          ? `padding-left: 90px;
      padding-right: 89px;`
          : `padding-left: 65px;
          padding-right: 65px;`};
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 100%;
    }

    &:hover {
      background-color: ${props => props.theme.colors.BUTTON[props.fill || 'BLUE'].HOVER};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: 15px;
      padding-left: 72px;
      padding-right: 70px;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .select-value-wrapper {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    div {
      height: auto;
    }
    .select__input {
      background-repeat: no-repeat;
      background-position: right center;
      height: auto;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      padding-left: 0px;
    }
    .customSelectTitle {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
      img {
        border: solid 0.4px ${props => props.theme.colors.BLACK};
        margin-right: 5px;
        border-radius: 5px;
      }
    }
    .button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      button[type='submit'] {
        font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
      }
    }
  }

  .color-selector {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    cursor: pointer;
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    .dropdownDivOverFlow {
      display: inline-block;
      overflow-y: auto;
      max-height: 150px;
      border: 2px solid ${props => props.theme.colors.PRIMARY.DARK};
      .dropdownUlBorder {
        border: none;
      }
    }
  }

  .fit-selector {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    .input-radio-title {
      margin-bottom: 0;
    }
  }

  .size-selector {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    width: 100%;
  }

  .size-error {
    position: absolute;
    margin-top: -5px;
    color: ${props => props.theme.colors.NOTIFICATION.ERROR};
    width: 100%;
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: 800;
    display: inline-flex;
  }

  .default-error {
    display: inline-flex;
  }

  .size-error-message {
    margin-top: -2px;
    color: ${props => props.theme.colors.NOTIFICATION.ERROR};
    width: 100%;
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: 800;
  }

  .size-and-fit-detail-title,
  .color-chips-selector-title,
  .color-chips-selector-title-name,
  .size-and-fit-detail-title-name {
    font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.colors.PRIMARY.DARK};
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }

  .color-chips-selector-title-name,
  .size-and-fit-detail-title-name {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-weight: normal;
    margin-left: 6px;
    font-stretch: normal;
  }

  .qty-selector {
    display: inline-block;
    margin-top: 31px;
    width: 100%;
    #quantity {
      font-size: ${props => props.theme.fonts.fontSize.anchor.xlarge}px;
      padding-top: 0;
      padding-bottom: 0;
      width: 48px;
    }
    p {
      display: inline-block;
      vertical-align: top;
    }
  }

  .pdp-qty {
    font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
    font-weight: ${props => props.theme.fonts.fontWeight.black};
    color: #3b3b3b;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
    text-transform: uppercase;
  }

  .size-field {
    height: auto;
    width: auto;
  }

  .product-size-error {
    margin-top: 30px;
  }

  .size-field-error {
    height: auto;
    .select__input {
      border-bottom: 2px solid ${props => props.theme.colors.NOTIFICATION.ERROR};
    }
  }

  .error-image {
    height: 12px;
    padding-right: 6px;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export const giftCardDesignStyle = css`
  .color-chips-selector-item {
    height: 126px;
    width: 103px;
    border-radius: 0;

    .input-radio-title {
      height: 100%;
      display: flex;
      align-items: center;
    }

    /* Image color of item */
    .color-image {
      border: 0;
      height: auto;
      width: 100%;
    }

    /* When the input is checked, the image color has black border (selected) */
    .input-radio-icon-checked + .input-radio-title {
      border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    }

    .input-radio-icon-checked + .input-radio-title .color-image {
      border: 0;
      height: auto;
      width: 100%;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .color-chips-selector-item {
      height: 79px;
      width: 66px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .color-chips-selector-item {
      height: 109px;
      width: 90px;
    }
  }
`;

export default styles;
