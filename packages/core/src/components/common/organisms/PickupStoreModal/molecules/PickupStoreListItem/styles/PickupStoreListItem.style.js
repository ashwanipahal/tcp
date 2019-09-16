import { css } from 'styled-components';

export default css`
  .minHeight {
    min-height: 195px;
  }
  .storeDetailsWrapper {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-right: 0px;
    }
  }
  .StoreListItemWrapper {
    border: 1px solid ${props => props.theme.colorPalette.gray['800']};
    padding: 0 30px 0 30px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      padding: 0 15px 0 10px;
    }
  }
  .pickupButtonsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .pickupBtnDivider {
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['800']};
  }
  .favStore {
    display: flex;
  }
  .marker-icon {
    width: 17px;
    height: 17px;
  }
`;
