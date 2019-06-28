import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getAddressList } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import { getAddressListState, getFetchingState } from './AddressBook.selectors';
import labels from './AddressBook.labels';
import { openAccountModal } from '../../AccountModal/container/AccountModal.actions';

// @flow
type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
};

export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    const { addressList, isFetching, openAccountModalComponent } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList)) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          openAccountModalComponent={openAccountModalComponent}
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
    openAccountModalComponent: ({ modalToOpen, message }) => {
      dispatch(openAccountModal({ modalToOpen, message }));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
