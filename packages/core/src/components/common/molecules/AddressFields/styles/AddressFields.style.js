import { css } from 'styled-components';

const styles = css`
  .field {
    height: ${props =>
      props.variation === 'primary' ? props.theme.spacing.FORM_FIELD_HEIGHT : ''};
  }
  input {
    background-color: ${props =>
      props.variation === 'secondary' ? props.theme.colorPalette.gray[300] : ''};
  }
  .country-selector {
    position: relative;
  }
  .zip-code {
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-right: 0;
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .change-country-link {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      position: absolute;
      bottom: 0;
    }
  }
`;

export default styles;
