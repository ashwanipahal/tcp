import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import {Row, Col, BodyCopy} from '../../../../../../common/atoms';
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

      <BodyCopy component="div" className="elem-pt-LRG elem-pb-XL elem-mb-LRG heading">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >
            <Row fullBleed>
              <Col
                colSize={{
                  small: 5,
                  large: 10,
                  medium: 7,
                }}
              >

                <Heading
                  fontFamily="secondaryFontFamily"
                  tag="h4"
                >
                  Default Shiping Address
                </Heading>

              </Col>
              <Col
                className="elem-mt-LRG"
                colSize={{
                  small: 1,
                  large: 2,
                  medium: 1,
                }}
              >
                {isShippingAddress && isShippingAddress.length
                  ? 'Edit'
                  : 'Add'
                }
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
                  ? <Address address={isShippingAddress[0]} showPhone={false} showCountry={false} />
                  : <p>You have not added an address yet.</p>
                }
              </Col>
            </Row>

          </Col>
        </Row>
      </BodyCopy>


      <div>
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              large: 12,
              medium: 8,
            }}
          >


            <Row fullBleed>
              <Col
                colSize={{
                  small: 5,
                  large: 10,
                  medium: 7,
                }}
              >

                <Heading
                  fontFamily="secondaryFontFamily"
                  HeadingLarge="six"
                  tag="h4"
                  className="addressBook__separator"
                >
                  Default Billing Address
                </Heading>

              </Col>
              <Col
                className="elem-mt-LRG"
                colSize={{
                  small: 1,
                  large: 2,
                  medium: 1,
                }}
              >
                {isBillingAddress && isBillingAddress.length
                ? 'Edit'
                : 'Add'
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
                  ? <Address address={isBillingAddress[0]} showPhone={false} showCountry={false} />
                  : <p>You have not added an address yet.</p>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </AccountOverviewTile>
  );
};

AddressOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_addressBookHeading: PropTypes.string,
    lbl_overview_addressBookCTA: PropTypes.string,
  }),
  addressList: PropTypes.shape({}),
};

AddressOverviewTile.defaultProps = {
  labels: {
    lbl_overview_addressBookHeading: 'Address Book',
    lbl_overview_addressBookCTA: 'View Address Book',
  },
  addressList:{}
};

export default withStyles(AddressOverviewTile, styles);
