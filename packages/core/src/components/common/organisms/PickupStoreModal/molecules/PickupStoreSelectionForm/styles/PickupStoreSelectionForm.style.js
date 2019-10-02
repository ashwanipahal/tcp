import { css } from 'styled-components';

export default css`
  .TextBox__input,
  .select__input {
    padding-top: 18px;
  }
  .find-store-label {
    margin-top: 12px;
    margin-bottom: 14px;
  }
  .distance-input {
    margin: 18px 0 12px;
  }
  margin: 0 0 24px 0;
  .storeSearchError {
    margin: 10px;
  }
  .zipcode-field {
    margin-right: 3px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .find-store-label {
      margin-top: 12px;
      margin-bottom: 20px;
    }
    .distance-input {
      margin: 0;
    }
    .storeSearchError {
      margin: 0;
    }
    .zipcode-field {
      margin-right: 0px;
    }
    margin: 0;
  }
  @media ${props => props.theme.mediaQuery.large} {
    .find-store-label {
      margin-top: 12px;
      margin-bottom: 20px;
    }
    .distance-input {
      margin: 0 10px;
    }
    .TextBox__input,
    .select__input {
      padding-top: 26px;
    }
    .storeSearchError {
      margin: 0;
    }
    .zipcode-field {
      margin-right: 0px;
    }
    margin: 0;
  }
`;
