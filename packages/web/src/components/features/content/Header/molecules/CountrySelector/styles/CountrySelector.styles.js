import { css } from 'styled-components';

export default css`
  display: flex;
  float: right;
  margin-top: 3px;

  .countrySelector__flag-icon {
    margin: 0 12px;
  }

  .countrySelector__locale {
    border-right: 1px solid ${props => props.theme.colorPalette.gray['600']};
    cursor: pointer;
    padding: 0 6px;

    :first-child {
      padding-left: 0;
    }

    :last-child {
      border: none;
    }
  }
  .countrySelector__locale--selected {
    color: ${props => props.theme.colorPalette.gray['900']};
  }
  .countrySelector__locale--disabled {
    color: ${props => props.theme.colorPalette.gray['600']};
  }
`;
