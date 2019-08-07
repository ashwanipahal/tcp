import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressOverviewTileComponent from '../views';
import { getAddressListState } from '../../../../AddressBook/container/AddressBook.selectors';
import { getAddressList } from '../../../../AddressBook/container/AddressBook.actions';

export class AddressOverviewTile extends React.Component {
  componentDidMount() {
    const { addressList } = this.props;
    if (!addressList) {
      const { getAddressListAction } = this.props;
      getAddressListAction();
    }
  }

  render() {
    const { addressList, labels } = this.props;
    return <AddressOverviewTileComponent addressList={addressList} labels={labels} />;
  }
}

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
  };
};

AddressOverviewTile.propTypes = {
  getAddressListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_overview_addressBookHeading: PropTypes.string,
    lbl_overview_addressBookCTA: PropTypes.string,
    lbl_overview_addressBookEdit: PropTypes.string,
    lbl_overview_addressBookAdd: PropTypes.string,
    lbl_overview_addressNotAdded: PropTypes.string,
    lbl_overview_defaultBillingAddress: PropTypes.string,
    lbl_overview_defaultShipingAddress: PropTypes.string,
  }),
  addressList: PropTypes.shape({}),
};

AddressOverviewTile.defaultProps = {
  labels: {
    lbl_overview_addressBookHeading: 'Address Book',
    lbl_overview_addressBookCTA: 'View Address Book',
    lbl_overview_addressBookEdit: 'Edit',
    lbl_overview_addressBookAdd: 'Add',
    lbl_overview_addressNotAdded: 'You have not added an address yet.',
    lbl_overview_defaultBillingAddress: 'Default Billing Address',
    lbl_overview_defaultShipingAddress: 'Default Shiping Address',
  },
  addressList: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressOverviewTile);
