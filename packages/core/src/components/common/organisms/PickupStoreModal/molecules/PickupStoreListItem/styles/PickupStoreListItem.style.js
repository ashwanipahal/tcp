import { css } from 'styled-components';

export default css`
  border: 1px solid ${props => props.theme.colorPalette.gray['800']};
  padding: 0 15px 12px 10px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  @media ${props => props.theme.mediaQuery.medium} {
    padding: 0px 30px 16px 30px;
  }
  .storeListItemWrapper {
    min-height: 138px;
    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 176px;
    }
    display: flex;
  }
  .storeInfoWrapper {
    display: flex;
    flex-direction: column;
    width: 44%;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 40%;
    }
  }
  .pickupButtonsWrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
  }
  .pickupCTAWrapper {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0px;
    }
  }
  .addToCartError {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }
  .PickupRadioBtn {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .storeInfoWrapper div:nth-child(2) {
    justify-content: normal;
    margin-top: 0px;
  }
  .storeAddressWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
  }
  .pickupBtnDivider {
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['800']};
  }
  .favStore {
    display: flex;
  }
  .storeUnavailable {
    margin: 0 auto;
    width: 109px;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 184px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: 240px;
    }
  }
  .marker-icon {
    width: 17px;
    height: 17px;
  }
  .StoreDetailsAnchor {
    text-decoration: underline;
    cursor: pointer;
  }
  .tooltip-bubble {
    left: 0%;
    margin-left: 5%;
    transform: translateX(0);
    bottom: 60%;
    ::after {
      right: 75%;
    }
    ::before {
      right: 71%;
      bottom: -1px;
    }
  }
`;
