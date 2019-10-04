import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import {
  Container,
  SectionOne,
  SectionTwo,
  SectionThree,
  TitlePlusContainer,
} from '../styles/PickUpReviewSection.style.native';
import TitlePlusEditButton from '../../TitlePlusEditButton';
import PickupStoreDisplay from '../../PickUpStoreDisplay';
import PickUpContactDisplay from '../../PickUpContactDisplay';
import { ORDER_ITEM_TYPE } from '../../../../../../../../../services/abstractors/CnC/CartItemTile';

/**
 *Section Display pickup details on review page
 *
 * @export
 * @class PickUpReviewSection
 * @extends {React.PureComponent}
 */
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
      pickUpContactPerson,
      labels,
      cartStores,
      pickUpAlternatePerson,
      isHasPickUpAlternatePerson,
      onEdit,
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
      <Container>
        <SectionOne>
          <TitlePlusContainer>
            <TitlePlusEditButton
              title={title}
              editTitle={edit}
              onEdit={onEdit}
              dataLocator="pickup-section"
            />
          </TitlePlusContainer>
          <BodyCopy
            dataLocator="pickup-section-heading-lbl"
            fontSize="fs16"
            mobileFontFamily="secondary"
            fontWeight="regular"
            text={text}
            color="gray.900"
          />
        </SectionOne>
        <SectionTwo>
          {stores.map(store => {
            return (
              store && (
                <View key={store.storeId}>
                  <PickupStoreDisplay labels={labels} orderType={store.orderType} store={store} />
                </View>
              )
            );
          })}
        </SectionTwo>
        <SectionThree>
          <View>
            <BodyCopy
              fontSize="fs16"
              mobileFontFamily="secondary"
              className="pickupTitle"
              fontWeight="semibold"
              color="gray.900"
              text={title}
            />
            <PickUpContactDisplay formData={pickUpContactPerson} />
          </View>
          {isHasPickUpAlternatePerson && (
            <View>
              <BodyCopy
                fontSize="fs16"
                mobileFontFamily="secondary"
                className="pickupTitle"
                fontWeight="semibold"
                color="gray.900"
                text={alternate}
              />
              <PickUpContactDisplay formData={pickUpAlternatePerson} />
            </View>
          )}
        </SectionThree>
      </Container>
    );
  }
}

PickUpReviewSection.propTypes = {
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
};

export default withStyles(PickUpReviewSection);
