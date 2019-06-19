// @flow
import React from 'react';
import {
  AddressItemsComponent,
  AddressItemContainerComponent,
  AddressDetailComponent,
  AddressSpanComponent,
} from '../styles/AddressBook.style';
import Row from '../../../common/atoms/Row';
import Col from '../../../common/atoms/Col';

type Props = {
  data: Object,
};

const AddressBookTile = ({ data }: Props) => {
  return (
    <React.Fragment>
      <AddressItemsComponent>
        <Row>
          {data.contact.map(() => (
            <Col colSize={{ large: 3, medium: 4, small: 6 }}>
              <AddressItemContainerComponent>
                <AddressDetailComponent>
                  <AddressSpanComponent class="name">Ajay Saini</AddressSpanComponent>
                  <br />
                  <AddressSpanComponent class="address">
                    New Jersey Turnpike
                    <AddressSpanComponent class="aux-char" />
                    <br />
                    Kearny, NJ 23442
                  </AddressSpanComponent>
                </AddressDetailComponent>
              </AddressItemContainerComponent>
            </Col>
          ))}
        </Row>
      </AddressItemsComponent>
    </React.Fragment>
  );
};

export default AddressBookTile;
