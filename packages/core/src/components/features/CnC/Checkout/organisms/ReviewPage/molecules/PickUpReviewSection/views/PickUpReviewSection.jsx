import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';
import AddressSkeleton from '@tcp/core/src/components/common/molecules/Address/skeleton/AddressSkeleton.view';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import styles from '../styles/PickUpReviewSection.style';
import TitlePlusEditButton from '../../TitlePlusEditButton';
import PickupStoreDisplay from '../../PickUpStoreDisplay';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';
import PickUpAlternateFormPart from '../../../../../molecules/PickUpAlternateFormPart';

export class PickUpReviewSection extends React.PureComponent {
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

  generateStoreDetails = pickupData => {
    const stores = [];
    const pickupItems = [...pickupData];
    const MIX = 'MIX';
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
      pickupItems[0].orderType = MIX;
      stores.push(pickupItems[0]);
    } else {
      if (pickupItems[0].orderType !== pickupItems[1].orderType) {
        this.sortPickupItems(pickupItems);
      }
      stores.push(...pickupItems);
    }
    return stores;
  };

  sortPickupItems = pickupItems => {
    pickupItems.sort((a, b) => {
      if (a.orderType < b.orderType) {
        return -1;
      }
      if (a.orderType > b.orderType) {
        return 1;
      }
      return 0;
    });
  };

  render() {
    const {
      className,
      pickUpContactPerson,
      labels,
      cartStores,
      pickUpAlternatePerson,
      isHasPickUpAlternatePerson,
      onEdit,
      pickUpLabels,
      isAlternateUpdateChecked,
      isExpressCheckout,
      pickUpContactAlternate,
      bagLoading,
      checkoutRoutingDone,
    } = this.props;
    const {
      lbl_review_pickupSectionTitle: title,
      lbl_review_sectionAnchor: edit,
      lbl_review_sectionPickupText: text,
      lbl_review_sectionPickupAlternateHeading: alternate,
    } = labels;
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
      <div className={className} dataLocator="review-pickup-section">
        <Row fullBleed className="row-one">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {pickUpContactPerson && (
              <React.Fragment>
                <TitlePlusEditButton
                  title={title}
                  editTitle={edit}
                  onEdit={onEdit}
                  dataLocator="pickup-section"
                />
                <BodyCopy
                  fontSize="fs16"
                  fontFamily="secondary"
                  color="gray.900"
                  fontWeight="regular"
                  dataLocator="pickup-section-heading-lbl"
                >
                  {text}
                </BodyCopy>
              </React.Fragment>
            )}
          </Col>
        </Row>
        {!bagLoading && checkoutRoutingDone ? (
          <>
            <Row fullBleed className="row-two">
              {stores.map((store, index) => {
                return (
                  store && (
                    <Col
                      key={store.storeId}
                      colSize={{ small: 6, medium: 4, large: 5 }}
                      className={`col-${index}`}
                    >
                      <PickupStoreDisplay
                        labels={labels}
                        orderType={store.orderType}
                        store={store}
                      />
                    </Col>
                  )
                );
              })}
            </Row>
            <Row fullBleed>
              <Col
                className="pickupContactPersonContainer"
                colSize={{ small: 6, medium: 4, large: 6 }}
              >
                <BodyCopy
                  fontSize="fs16"
                  fontFamily="secondary"
                  className="pickupTitle"
                  fontWeight="extrabold"
                  color="gray.900"
                >
                  {title}
                </BodyCopy>
                <PickUpContactDisplay
                  formData={
                    typeof pickUpContactPerson.firstName !== 'undefined'
                      ? pickUpContactPerson
                      : pickUpContactAlternate.pickUpContact
                  }
                />
              </Col>
              {!isExpressCheckout && isHasPickUpAlternatePerson && (
                <Col
                  className="pickupContactAlternateContainer"
                  colSize={{ small: 6, medium: 4, large: 6 }}
                >
                  <BodyCopy
                    fontSize="fs16"
                    fontFamily="secondary"
                    className="pickupTitle"
                    fontWeight="extrabold"
                    color="gray.900"
                  >
                    {alternate}
                  </BodyCopy>
                  <PickUpContactDisplay formData={pickUpAlternatePerson} />
                </Col>
              )}
              {isExpressCheckout && (
                <Col
                  className="pickupContactAlternateContainer"
                  colSize={{ small: 6, medium: 4, large: 6 }}
                >
                  <div className="pickUpAlternate-container">
                    <FormSection name="pickUpAlternateExpress">
                      <PickUpAlternateFormPart
                        isAlternateUpdateChecked={isAlternateUpdateChecked}
                        showNoteOnToggle
                        formName="checkoutPickup"
                        formSection="pickUpAlternate"
                        labels={pickUpLabels}
                        isExpressCheckout={isExpressCheckout}
                      />
                    </FormSection>
                  </div>
                </Col>
              )}
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                <LoaderSkelton width="100px" height="100px" />
              </Col>
              <Col colSize={{ large: 12, medium: 8, small: 6 }}>
                <AddressSkeleton variation="secondary" />
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

PickUpReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_review_pickupSectionTitle: PropTypes.string,
    lbl_review_sectionPickupAlternateHeading: PropTypes.string,
  }),
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
  onEdit: PropTypes.func.isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  isExpressCheckout: PropTypes.bool,
  pickUpContactAlternate: PropTypes.shape({}).isRequired,
  bagLoading: PropTypes.bool,
  checkoutRoutingDone: PropTypes.bool,
};

PickUpReviewSection.defaultProps = {
  labels: {
    lbl_review_pickupSectionTitle: '',
    lbl_review_sectionPickupAlternateHeading: '',
  },
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
  isExpressCheckout: false,
  bagLoading: false,
  checkoutRoutingDone: false,
};

export default withStyles(PickUpReviewSection, styles);
