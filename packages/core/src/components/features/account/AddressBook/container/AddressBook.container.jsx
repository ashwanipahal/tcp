import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getAddressList, loadAddAddressComponent } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getAddressListFetchingState,
  showDefaultShippingUpdatedState,
  showAddAddressComponent,
} from './AddressBook.selectors';
import labels from './AddressBook.labels';
import AddAddresslabels from './AddAddress/AddAddress.labels';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';
import AddAddressContainer from './AddAddress.container';
// @flow

type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
  onDefaultShippingAddressClick: () => void,
  showDefaultShippingUpdatedMsg: any,
  showMessageForAddAddressMsg: any,
  onAddNNewAddressClick: any,
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
      showMessageForAddAddressMsg,
      onAddNNewAddressClick,
    } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList) && !true) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showDefaultShippingUpdatedMsg={showDefaultShippingUpdatedMsg}
          onAddNNewAddressClick={onAddNNewAddressClick}
        />
      );
    }
    if (true) {
      return (
        <AddAddressContainer
          AddAddresslabels={AddAddresslabels}
          showMessageForAddAddressMsg={showMessageForAddAddressMsg}
        />
      );
    }
    return null;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    onDefaultShippingAddressClick: payload => {
      dispatch(setDefaultShippingAddressRequest(payload));
    },
    onAddNNewAddressClick: ({ state }) => {
      debugger;
      dispatch(loadAddAddressComponent({ state }));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getAddressListFetchingState(state),
    showDefaultShippingUpdatedMsg: showDefaultShippingUpdatedState(state),
    addAddressLoaded: showAddAddressComponent(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
