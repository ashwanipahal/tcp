import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, BodyCopy} from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import Address from '../../../../../../common/molecules/Address';
import styles from '../container/styles/AddressOverviewTile.style'

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const AddressOverviewTile = ({ labels, addressList }) => {
const isShippingAddress = [];
const isBillingAddress = [];

if(addressList){
  addressList.map(addr => addr).forEach(item => {
    if(item.xcont_isShippingAddress === 'true'){
      isShippingAddress.push(item);
    }
    if(item.xcont_isBillingAddress === 'true'){
      isBillingAddress.push(item);
    }
  })
};

  return (
    <AccountOverviewTile
      title={labels.lbl_overview_addressBookHeading}
      ctaTitle={labels.lbl_overview_addressBookCTA}
    >
      <BodyCopy component="div" className="heading">
        <Row fullBleed>
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >

            <BodyCopy
              component="div"
              fontSize="fs14"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              {labels.lbl_overview_defaultShipingAddress}
            </BodyCopy>

          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 1,
            }}
          >
            <BodyCopy
              component="span"
              fontSize="fs14"
              fontFamily="secondary"
            >
              {isShippingAddress && isShippingAddress.length
                ? (
                  <Anchor
                    fontSizeVariation="medium"
                    underline
                    anchorVariation="primary"
                    to="/account?id=address-book"
                    asPath="/account/address-book"
                  >
                    {labels.lbl_overview_addressBookEdit}
                  </Anchor>
                  )
                  :(
                    <Anchor
                      fontSizeVariation="medium"
                      underline
                      anchorVariation="primary"
                      to="/account?id=address-book"
                      asPath="/account/address-book"
                    >
                      {labels.lbl_overview_addressBookAdd}
                    </Anchor>
                    )
              }
            </BodyCopy>

          </Col>
        </Row>
        <Row fullBleed className="elem-mb-XL">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >
            {isShippingAddress && isShippingAddress.length
              ? <Address address={isShippingAddress[0]} showCountry={false} />
              : (
                <BodyCopy
                  fontSize="fs14"
                  fontFamily="secondary"
                >
                  {labels.lbl_overview_addressNotAdded}
                </BodyCopy>
              )
            }
          </Col>
        </Row>
      </BodyCopy>

      <BodyCopy component="div" className="elem-mt-LRG">
        <Row fullBleed>
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >

            <BodyCopy
              component="div"
              fontSize="fs14"
              fontWeight="extrabold"
              fontFamily="secondary"
            >
              {labels.lbl_overview_defaultBillingAddress}
            </BodyCopy>

          </Col>
          <Col
            colSize={{
              small: 1,
              large: 2,
              medium: 1,
            }}
          >
            {isBillingAddress && isBillingAddress.length
            ? (
              <Anchor
                fontSizeVariation="medium"
                underline
                anchorVariation="primary"
                to="/account?id=payment"
                asPath="/account/payment"
              >
                {labels.lbl_overview_addressBookEdit}
              </Anchor>
              )
              :(
                <Anchor
                  fontSizeVariation="medium"
                  underline
                  anchorVariation="primary"
                  to="/account?id=payment"
                  asPath="/account/payment"
                >
                  {labels.lbl_overview_addressBookAdd}
                </Anchor>
                )
            }
          </Col>
        </Row>
        <Row fullBleed className="elem-mb-XXL">
          <Col
            colSize={{
              small: 5,
              large: 10,
              medium: 7,
            }}
          >
            {isBillingAddress && isBillingAddress.length
              ? <Address address={isBillingAddress[0]} showCountry={false} />
              : (
                <BodyCopy
                  fontSize="fs14"
                  fontFamily="secondary"
                >
                  {labels.lbl_overview_addressNotAdded}
                </BodyCopy>
              )
            }
          </Col>
        </Row>
      </BodyCopy>
    </AccountOverviewTile>
  );
};

AddressOverviewTile.propTypes = {
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
  addressList:{}
};

export default withStyles(AddressOverviewTile, styles);
