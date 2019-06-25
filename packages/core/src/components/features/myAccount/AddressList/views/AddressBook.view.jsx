// @flow

import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import { AddNewAddressCTAContainer } from '../styles/AddressBook.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Button from '../../../../common/atoms/Button';
import Separator from '../../../../common/atoms/Separator';
import AddressList from './AddressList.view';
import EmptyAddressList from './EmptyAddressList.view';

type Props = {
  addresses: Object,
  labels: Object,
};

const AddressBook = ({ addresses, labels }: Props) => {
  return (
    <div>
      <Heading fontFamily="secondaryFontFamily" HeadingLarge="six" tag="h4">
        Address Book
      </Heading>
      <Separator />
      {addresses.size === 0 && <EmptyAddressList labels={labels} />}
      <AddNewAddressCTAContainer>
        <Row fullBleed>
          <Col
            colSize={{
              small: 4,
              large: 2,
              medium: 3,
            }}
            offsetLeft={{
              small: 1,
            }}
          >
            <Button buttonVariation="fixed-width">{labels.addNewAddressCTA}</Button>
          </Col>
        </Row>
      </AddNewAddressCTAContainer>
      {addresses.size > 0 && <AddressList addresses={addresses} />}
    </div>
  );
};
export default withStyles(AddressBook);
