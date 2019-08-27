import { css } from 'styled-components';

export default css`
  display: flex;
  float: right;
  padding-top: 3px;

  ${props =>
    props.showInFooter
      ? `
    padding: 34px 0 32px;
    float: left;

    @media ${props.theme.mediaQuery.large} {
      float: right;
      padding: 22px 0 12px;
    }
    `
      : ``}

  .countrySelector__shipTo {
    line-height: 20px;
  }

  .countrySelector__flag-icon {
    margin: 0 12px;
    cursor: pointer;
    height: 20px;
  }

  .countrySelector__locale {
    border-right: 1px solid ${props => props.theme.colorPalette.gray['600']};
    cursor: pointer;
    display: inline-block;
    padding: 0 6px;
    height: 13px;
    line-height: 14px;
    text-transform: uppercase;

    :first-child {
      padding-left: 0;
    }

    :last-child {
      border: none;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 4px;
    }
  }
  .countrySelector__locale--selected {
    color: ${props => props.theme.colorPalette.gray['900']};
  }
  .countrySelector__locale--disabled {
    color: ${props => props.theme.colorPalette.gray['600']};
  }
`;
