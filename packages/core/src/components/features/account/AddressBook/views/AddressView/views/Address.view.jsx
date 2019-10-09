import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../../../styles/AddressBook.style';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import AddressListComponent from '../../AddressList.view';
import EmptyAddressListComponent from '../../EmptyAddressList.view';
import DeleteAddressModal from '../../DeleteAddressModal.view';
import Notification from '../../../../../../common/molecules/Notification';
import utils from '../../../../../../../utils';

export class AddressView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: {},
    };
  }

  setSelectedAddress = address => {
    this.setState({ selectedAddress: address });
  };

  onAddNNewAddressClick = () => {
    utils.routerPush(
      '/account?id=address-book&subSection=add-new-address',
      '/account/address-book/add-new-address'
    );
  };

  render() {
    const {
      addresses,
      labels,
      className,
      onDefaultShippingAddressClick,
      showUpdatedNotification,
      onDeleteAddress,
      deleteModalMountedState,
      setDeleteModalMountState,
      showUpdatedNotificationOnModal,
    } = this.props;
    const { selectedAddress } = this.state;

    return (
      <div className={className}>
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >
            <Heading
              fontFamily="secondaryFontFamily"
              HeadingLarge="six"
              tag="h4"
              className="addressBook__separator"
            >
              {getLabelValue(labels, 'ACC_LBL_ADDRESS_BOOK_HEADING', 'addressBook')}
            </Heading>
            {addresses.size === 0 && <EmptyAddressListComponent labels={labels} />}
          </Col>
        </Row>

        <Row fullBleed className="addressBook__row--marginBottom">
          <Col
            colSize={{
              small: 6,
              large: 10,
              medium: 8,
            }}
            className="addressBook__addNewCtaContainer"
          >
            <Button
              onClick={this.onAddNNewAddressClick}
              buttonVariation="variable-width"
              fill="BLUE"
              data-locator="addressbook-addnewaddress"
            >
              {getLabelValue(labels, 'ACC_LBL_ADD_NEW_ADDRESS_CTA', 'addressBook')}
            </Button>
          </Col>
        </Row>
        {showUpdatedNotification && (
          <Notification
            status={showUpdatedNotification}
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={
              showUpdatedNotification === 'success'
                ? getLabelValue(labels, 'lbl_common_successMessage', 'common')
                : getLabelValue(labels, 'lbl_common_errorMessage', 'common')
            }
          />
        )}
        {addresses.size > 0 && (
          <AddressListComponent
            addresses={addresses}
            labels={labels}
            deleteModalMountedState={deleteModalMountedState}
            setSelectedAddress={this.setSelectedAddress}
            onDefaultShippingAddressClick={onDefaultShippingAddressClick}
            setDeleteModalMountState={setDeleteModalMountState}
          />
        )}
        <DeleteAddressModal
          openState={deleteModalMountedState}
          data={{
            heading: getLabelValue(labels, 'ACC_LBL_DELETE_ADDRESS_HEADING', 'addressBook'),
            title: getLabelValue(labels, 'ACC_LBL_DELETE_ADDRESS_TITLE', 'addressBook'),
            msg: getLabelValue(
              labels,
              'lbl_deleteAddressModal_ccAssociatedAddressMsg',
              'addressBook'
            ),
            description: selectedAddress,
            buttons: {
              cancel: getLabelValue(labels, 'lbl_common_dontDelete', 'common'),
              confirm: getLabelValue(labels, 'lbl_common_YesDelete', 'common'),
            },
          }}
          setDeleteModalMountState={setDeleteModalMountState}
          labels={labels}
          onDeleteAddress={onDeleteAddress}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        />
      </div>
    );
  }
}
AddressView.defaultProps = {
  deleteModalMountedState: false,
};

AddressView.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  onDefaultShippingAddressClick: PropTypes.shape({}).isRequired,
  showUpdatedNotification: PropTypes.string.isRequired,
  showUpdatedNotificationOnModal: PropTypes.string.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
  deleteModalMountedState: PropTypes.bool,
  setDeleteModalMountState: PropTypes.func.isRequired,
};
export default withStyles(AddressView, styles);
export { AddressView as AddressViewVanilla };
