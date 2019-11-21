import { css } from 'styled-components';

const styles = css`
  .address-field {
    height: ${props =>
      props.variation === 'primary' ? props.theme.spacing.FORM_FIELD_HEIGHT : 'auto'};
  }
  input {
    background-color: ${props =>
      props.variation === 'secondary' || props.grayTextBox
        ? props.theme.colorPalette.gray[300]
        : ''};
  }
  .country-selector {
    position: relative;
    > div {
      height: auto;
      > select {
        margin: 0;
      }
    }
  }
  .zip-code {
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-right: 0;
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .change-country-link {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      position: absolute;
      bottom: 0;
      font-size: ${props => props.theme.typography.fontSizes.fs10};
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
