import React from 'react';
import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import styles from '../styles/AddressBook.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Button from '../../../../common/atoms/Button';
import AddressListComponent from './AddressList.view';
import EmptyAddressListComponent from './EmptyAddressList.view';
import DeleteAddressModal from './DeleteAddressModal.view';
import Notification from '../../../../common/molecules/Notification';

// @flow

type Props = {
  addresses: List<{}>,
  labels: {
    addNewAddressCTA: string,
  },
  className: string,
  onDefaultShippingAddressClick: Object,
  showUpdatedNotification: any,
  onDeleteAddress: Function,
  deleteModalMountedState: false,
  setDeleteModalMountState: Function,
};

export class AddressBook extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedAddress: {},
    };
  }

  setSelectedAddress = address => {
    this.setState({ selectedAddress: address });
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
    } = this.props;
    const { selectedAddress } = this.state;
    return (
      <div className={className}>
        <Heading
          fontFamily="secondaryFontFamily"
          HeadingLarge="six"
          tag="h4"
          className="addressBook__separator"
        >
          Address Book
        </Heading>
        {addresses.size === 0 && <EmptyAddressListComponent labels={labels} />}
        <Row fullBleed className="addressBook__row--marginBottom">
          <Col
            colSize={{
              small: 6,
              large: 10,
              medium: 8,
            }}
            className="addressBook__addNewCtaContainer"
          >
            <Button buttonVariation="variable-width" fill="BLUE">
              {labels.addNewAddressCTA}
            </Button>
          </Col>
        </Row>
        {showUpdatedNotification !== null && (
          <Notification
            status={showUpdatedNotification}
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={
              showUpdatedNotification === 'success' ? labels.successMessage : labels.errorMessage
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
            heading: labels.deleteAddressHeading,
            title: labels.deleteAddressTitle,
            description: selectedAddress,
            buttons: {
              cancel: labels.cancel,
              confirm: labels.deleteConfirm,
            },
          }}
          setDeleteModalMountState={setDeleteModalMountState}
          labels={labels}
          onDeleteAddress={onDeleteAddress}
        />
      </div>
    );
  }
}
export default withStyles(AddressBook, styles);
