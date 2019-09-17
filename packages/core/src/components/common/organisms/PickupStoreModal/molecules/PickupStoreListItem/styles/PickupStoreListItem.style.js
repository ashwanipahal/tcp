import { css } from 'styled-components';

export default css`
  border: 1px solid ${props => props.theme.colorPalette.gray['800']};
  padding: 0 15px 12px 10px;
  @media ${props => props.theme.mediaQuery.medium} {
    padding: 5px 30px 16px 30px;
  }
  .storeItemWrapper {
    min-height: 138px;
    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 176px;
    }
  }
  .pickupCTAWrapper {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: 0px;
    }
  }
  .PickupRadioBtn {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .pickupButtonsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
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
