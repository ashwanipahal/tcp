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

// @flow

type Props = {
  addresses: List<{}>,
  labels: {
    addNewAddressCTA: string,
  },
  className: string,
  onDefaultShippingAddressClick: Object,
};

export const AddressBook = ({
  addresses,
  labels,
  className,
  onDefaultShippingAddressClick,
  showDefaultShippingSuccessMsg,
}: Props) => {
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
      {showDefaultShippingSuccessMsg && <div>success</div>}
      {addresses.size > 0 && (
        <AddressListComponent
          addresses={addresses}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
        />
      )}
    </div>
  );
};
export default withStyles(AddressBook, styles);
