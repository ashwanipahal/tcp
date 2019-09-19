import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import styles from '../styles/PickUpReviewSection.style';
import PickupStoreDisplay from '../../PickUpStoreDisplay';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';

export class PickUpReviewSection extends React.PureComponent {
  handleEnterEditModeClick = event => {
    event.preventDefault();
  };

  /**
   * @method generateStoreDetails
   * @param {array} pickupItems - pickup details of items
   * @desc this method takes in store details of all items in cart,
   * in case of same boss and bopis (mix) store read boss dates from boss store,
   * bossItems from storeItemsCount of boss store,
   * bopisItems from storeItemsCount of bopis store,
   * and convert the orderType to MIX.
   * Stores are sorted on the basis on orderType
   */

  // eslint-disable-next-line sonarjs/cognitive-complexity
  generateStoreDetails = pickupData => {
    const stores = [];
    const pickupItems = [...pickupData];
    if (pickupItems.length === 1) {
      stores.push(pickupItems[0]);
    } else if (
      pickupItems[0].orderType !== pickupItems[1].orderType &&
      pickupItems[0].storeId === pickupItems[1].storeId
    ) {
      pickupItems[0].bossStartDate = pickupItems[0].bossStartDate
        ? pickupItems[0].bossStartDate
        : pickupItems[1].bossStartDate;
      pickupItems[0].bossEndDate = pickupItems[0].bossEndDate
        ? pickupItems[0].bossEndDate
        : pickupItems[1].bossEndDate;
      pickupItems[0].bossItems =
        pickupItems[0].orderType === ORDER_ITEM_TYPE.BOSS
          ? pickupItems[0].storeItemsCount
          : pickupItems[1].storeItemsCount;
      pickupItems[0].bopisItems =
        pickupItems[0].orderType === ORDER_ITEM_TYPE.BOPIS
          ? pickupItems[0].storeItemsCount
          : pickupItems[1].storeItemsCount;
      pickupItems[0].orderType = 'MIX';
      stores.push(pickupItems[0]);
    } else {
      if (pickupItems[0].orderType !== pickupItems[1].orderType) {
        pickupItems.sort((a, b) => {
          if (a.orderType < b.orderType) {
            return -1;
          }
          if (a.orderType > b.orderType) {
            return 1;
          }
          return 0;
        });
      }
      stores.push(...pickupItems);
    }
    return stores;
  };

  render() {
    const {
      className,
      pickUpContactPerson,
      pickUpLabels,
      cartStores,
      pickUpAlternatePerson,
      isHasPickUpAlternatePerson,
    } = this.props;
    const pickupStores = [...cartStores]
      .filter(store => store.stLocId !== 'ECOM')
      .map(store => {
        return {
          storeId: store.stLocId,
          store: store.storeName,
          storeAddress: store.address,
          storeItemsCount: store.itemsCount,
          bossStartDate: store.bossStartDate,
          bossEndDate: store.bossEndDate,
          orderType: store.orderType,
        };
      });
    const stores = this.generateStoreDetails(pickupStores);
    return (
      <div className={className} dataLocator="alternate-div">
        <Row fullBleed className="row-one">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {pickUpContactPerson && (
              <React.Fragment>
                <div className="header">
                  <BodyCopy
                    fontSize="fs26"
                    fontFamily="primary"
                    color="gray.900"
                    fontWeight="regular"
                  >
                    {pickUpLabels.pickupContactText}
                  </BodyCopy>
                  <div className="EditAnchor">
                    <Anchor
                      underline
                      anchorVariation="secondary"
                      fontSize="fs12"
                      fontFamily="secondary"
                      dataLocator="pickup-pickupContact-edit-anchor"
                      onClick={this.handleEnterEditModeClick}
                      className="anchorStyle"
                      color="gray.900"
                    >
                      {pickUpLabels.anchorEdit}
                    </Anchor>
                  </div>
                </div>
                <BodyCopy
                  fontSize="fs16"
                  fontFamily="primary"
                  color="gray.900"
                  fontWeight="regular"
                >
                  We will send you an email when your order is ready. A government issued ID is
                  required to pick up the order.
                </BodyCopy>
              </React.Fragment>
            )}
          </Col>
        </Row>
        <Row fullBleed className="row-two">
          {stores.map(store => {
            return (
              store && (
                <Col key={store.storeId} colSize={{ small: 6, medium: 4, large: 5 }}>
                  <PickupStoreDisplay orderType={store.orderType} store={store} />
                </Col>
              )
            );
          })}
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 5 }}>
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              className="pickupTitle"
              fontWeight="extrabold"
              color="gray.900"
            >
              {pickUpLabels.pickupContactText}
            </BodyCopy>
            <PickUpContactDisplay formData={pickUpContactPerson} />
          </Col>
          {isHasPickUpAlternatePerson && (
            <Col colSize={{ small: 6, medium: 4, large: 5 }}>
              <BodyCopy
                fontSize="fs16"
                fontFamily="secondary"
                className="pickupTitle"
                fontWeight="extrabold"
                color="gray.900"
              >
                Alternate Pickup Contact
              </BodyCopy>
              <PickUpContactDisplay formData={pickUpAlternatePerson} />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

PickUpReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  pickUpLabels: PropTypes.shape({}),
  pickUpContactPerson: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string.isRequired,
  }),
  pickUpAlternatePerson: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
  }),
  isHasPickUpAlternatePerson: PropTypes.bool.isRequired,
  cartStores: PropTypes.shape({}).isRequired,
};

PickUpReviewSection.defaultProps = {
  pickUpLabels: {},
  pickUpContactPerson: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  },
  pickUpAlternatePerson: {
    firstName: '',
    lastName: '',
    emailAddress: '',
  },
};

export default withStyles(PickUpReviewSection, styles);
