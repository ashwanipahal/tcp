import { css } from 'styled-components';

const styles = css`
  .address-dropDown {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    pointer-events: ${props => (props.isEditing ? 'none' : 'auto')};
  }
  .dropdownActiveClass {
    background-color: ${props => props.theme.colorPalette.gray[900]};
    .address {
      color: ${props => props.theme.colorPalette.white};
    }
  }
  .dropdownActiveIcon {
    display: none;
  }
  .ulBorderWithLastRow li:hover {
    background-color: ${props => props.theme.colorPalette.gray[900]};
    .address {
      color: ${props => props.theme.colorPalette.white};
    }
  }
  .custom-select {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    span {
      font-size: ${props => props.theme.typography.fontSizes.fs10};
      font-family: ${props => props.theme.typography.fonts.secondary};
      font-weight: ${props => props.theme.typography.fontWeights.black};
    }
  }

  .customSelectTitle {
    margin-top: 0;
    padding-top: 0;
  }

  .ulBorderWithLastRow li:last-child {
    height: auto;
    border-top: 1px solid ${props => props.theme.colorPalette.gray[600]};
  }

  .default-shipping {
    margin-bottom: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-bottom: ${props => (!props.isEditing ? props.theme.spacing.ELEM_SPACING.XL : 0)};
      border-bottom: ${props =>
        !props.isEditing ? `1px solid ${props.theme.colorPalette.gray[500]}` : 'none'};
    }
  }

  .edit-cta {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
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

  .add-address {
    cursor: default;
  }

  .Modal_Heading {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
`;

export default styles;
