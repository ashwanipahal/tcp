import { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  .address-dropDown {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    pointer-events: ${props => (props.isEditing ? 'none' : 'auto')};
    .address {
      font-family: ${props => props.theme.typography.fonts.secondary};
      color: ${props => props.theme.colors.PRIMARY.DARK};
    }
    .address-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .default-badge {
      height: 13px;
    }
    .dropdown-title {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
    .customSelectTitle {
      margin-top: 0px;
      padding-top: 4px;
    }
  }

  li.dropdownActiveClass:nth-last-of-type(1) {
    background-color: ${props => props.theme.colorPalette.white};
  }

  .dropdownActiveIcon {
    display: none;
  }

  .add-address {
    cursor: pointer;
  }

  .default-shipping {
    margin-bottom: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => (!props.isEditing ? props.theme.spacing.ELEM_SPACING.XL : 0)};
      border-bottom: ${props =>
        !props.isEditing ? `1px solid ${props.theme.colorPalette.gray[500]}` : 'none'};
    }
  }

  .save-btn {
    background-color: ${props => props.theme.colorPalette.blue.C900};
    color: ${props => props.theme.colors.WHITE};
    padding: 0;
    &:hover {
      background: ${props => props.theme.colorPalette.blue.C900};
    }
  }

  .cancel-btn {
    padding: 0;
  }

  .edit-cta {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    margin-top: ${props =>
      props.editShipmentDetailsError ? 0 : props.theme.spacing.ELEM_SPACING.XL};
    .save-btn {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }
  }

  .hide-on-mobile {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }

  .top-border {
    padding-top: ${props => props.theme.spacing.MED};
    border-top: 1px solid ${props => props.theme.colorPalette.gray[300]};
  }

  input {
    background-color: ${props => (props.modalState ? props.theme.colorPalette.white : '')};
  }

  .Modal_Heading {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
  .edit-shipping-error {
    span {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }
  .edit-shipping-error-container {
    display: flex;
  }
  .edit-link-placement {
    @media ${props => props.theme.mediaQuery.medium} {
      display: flex;
      align-items: center;
    }
  }
  .select__input {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .CheckBox__input {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .shipping-section-header {
    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  .save-cancel-btn {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 162px;
    }
  }
`;

export default styles;
