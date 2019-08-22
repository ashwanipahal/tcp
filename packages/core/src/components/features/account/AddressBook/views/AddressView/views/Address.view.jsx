import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import styles from '../../../styles/AddressBook.style';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import AddressListComponent from '../../AddressList.view';
import EmptyAddressListComponent from '../../EmptyAddressList.view';
import DeleteAddressModal from '../../DeleteAddressModal.view';
import Notification from '../../../../../../common/molecules/Notification';
import utils from '../../../../../../../utils';

// @flow

type Props = {
  addresses: List<{}>,
  labels: {
    addNewAddressCTA: string,
  },
  className: string,
  onDefaultShippingAddressClick: Object,
  showUpdatedNotification: any,
  showUpdatedNotificationOnModal: any,
  onDeleteAddress: Function,
  deleteModalMountedState: false,
  setDeleteModalMountState: Function,
};

export class AddressView extends React.PureComponent<Props> {
  constructor(props: Props) {
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
              {labels.addressBook.ACC_LBL_ADDRESS_BOOK_HEADING}
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
              {labels.addressBook.ACC_LBL_ADD_NEW_ADDRESS_CTA}
            </Button>
          </Col>
        </Row>
        {showUpdatedNotification !== null && (
          <Notification
            status={showUpdatedNotification}
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={
              showUpdatedNotification === 'success'
                ? labels.common.lbl_common_successMessage
                : labels.common.lbl_common_errorMessage
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
            heading: labels.addressBook.ACC_LBL_DELETE_ADDRESS_HEADING,
            title: labels.addressBook.ACC_LBL_DELETE_ADDRESS_TITLE,
            msg: labels.addressBook.lbl_deleteAddressModal_ccAssociatedAddressMsg,
            description: selectedAddress,
            buttons: {
              cancel: labels.common.lbl_common_dontDelete,
              confirm: labels.common.lbl_common_YesDelete,
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
export default withStyles(AddressView, styles);
export { AddressView as AddressViewVanilla };
