import React from 'react';
import { connect } from 'react-redux';
import {
  getCardType,
  getCardTypeImgUrl,
  getExpirationRequiredFlag,
  getCreditCardExpirationOptionMap,
  getDefaultAddressKey
} from 'AddEditCreditCard.selectors';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';

export class AddEditCreditCard {
  constructor(props) {
    super(props);
  }

  render() {
    return <AddEditCreditCardComponent />
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitNewCreditCardFormAction: (payload: {}) => {
      dispatch(addCreditCardReq(payload));
    },
    submitEditCreditCardFormAction: (payload: {}) => {
      dispatch(updateCreditCardReq(payload));
    },
    getAddressList: (payload: {}) => {
      dispatch(verifyAddress(payload));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
   addressList: getAddressListState(state),
   cardType: getCardType(state),
   cardTypeImgUrl: getCardTypeImgUrl(state),
   isExpirationRequired: getExpirationRequiredFlag(state),
   expMonthOptionsMap: getCreditCardExpirationOptionMap(state).monthsMap,
   expYearOptionsMap: getCreditCardExpirationOptionMap(state).yearsMap,
   defaultAddressKey: getDefaultAddressKey(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditCreditCard);
