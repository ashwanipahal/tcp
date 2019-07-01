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
import Notification from '../../../../common/molecules/Notification';

// @flow

type Props = {
  addresses: List<{}>,
  labels: {
    addNewAddressCTA: string,
  },
  className: string,
  onDefaultShippingAddressClick: Object,
<<<<<<< HEAD
  showDefaultShippingUpdatedMsg: any,
  addAddressLoaded: any,
=======
  showDefaultShippingUpdatedMsg: Boolean,
>>>>>>> 7c27189bba289fcda4e4a507155af41b137d96ee
};

export class AddressBook extends React.Component<Props> {
  render() {
    const {
      addresses,
      labels,
      className,
      onDefaultShippingAddressClick,
      showDefaultShippingUpdatedMsg,
      onAddNNewAddressClick,
    } = this.props;
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
            <Button onClick={onAddNNewAddressClick} buttonVariation="variable-width" fill="BLUE">
              {labels.addNewAddressCTA}
            </Button>
          </Col>
        </Row>
        {showDefaultShippingUpdatedMsg !== null && (
          <Notification
            status={showDefaultShippingUpdatedMsg ? 'success' : 'error'}
            colSize={{ large: 12, medium: 8, small: 6 }}
            message={
              showDefaultShippingUpdatedMsg
                ? labels.defaultShippingSuccessMessage
                : labels.defaultShippingSuccessFail
            }
          />
        )}
        {addresses.size > 0 && (
          <AddressListComponent
            addresses={addresses}
            labels={labels}
            onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          />
        )}
      </div>
    );
  }
}
export default withStyles(AddressBook, styles);
