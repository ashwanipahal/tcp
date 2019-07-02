import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getAddressList } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import {
  getAddressListState,
  getAddressListFetchingState,
  showDefaultShippingUpdatedState,
} from './AddressBook.selectors';
import labels from './AddressBook.labels';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';
import Button from '../../../../common/atoms/Button';

// @flow
type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
  onDefaultShippingAddressClick: () => void,
  showDefaultShippingUpdatedMsg: any,
  verifyAddressAction: ({}) => void,
};

export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    const {
      addressList,
      isFetching,
      onDefaultShippingAddressClick,
      showDefaultShippingUpdatedMsg,
      verifyAddressAction,
    } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList) && addressList.size > 1) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showDefaultShippingUpdatedMsg={showDefaultShippingUpdatedMsg}
        />
      );
    }
    return (
      <React.Fragment>
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          onClick={() =>
            verifyAddressAction({
              firstName: 'naman',
              lastName: 'jain',
              country: 'US',
              addressLine: ['1095,6th Avenue', ''],
              city: 'New York',
              state: 'NY',
              zipCode: '10036',
            })
          }
        >
          Traditional address
        </Button>
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          onClick={() =>
            verifyAddressAction({
              firstName: 'naman',
              lastName: 'jain',
              country: 'US',
              addressLine: ['10902 Katy Freeway', ''],
              city: 'Houston',
              state: 'TX',
              zipCode: '77043',
            })
          }
        >
          optional address
        </Button>
        <Button
          buttonVariation="variable-width"
          fill="BLUE"
          onClick={() =>
            verifyAddressAction({
              firstName: 'naman',
              lastName: 'jain',
              country: 'US',
              addressLine: ['777 Brocktown Avenue', ''],
              city: 'Abington',
              state: 'MA',
              zipCode: '02351',
            })
          }
        >
          Correct address
        </Button>
        <AddressVerification heading="Add Address" onSuccess={payload => console.log('payload saved is ', payload)} />
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
    onDefaultShippingAddressClick: payload => {
      dispatch(setDefaultShippingAddressRequest(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getAddressListFetchingState(state),
    showDefaultShippingUpdatedMsg: showDefaultShippingUpdatedState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
