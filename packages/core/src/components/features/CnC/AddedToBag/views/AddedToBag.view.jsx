import React from 'react';
import PropTypes from 'prop-types';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import AddedToBagActions from '../../AddedToBagActions';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles, {
  modalStyles,
  productInfoStyles,
  pointsInfoStyles,
  buttonActionStyles,
} from '../styles/AddedToBag.style';
import ProductInformationView from '../molecules/ProductInformation/views/ProductInformation.views';
import BossBannerView from '../molecules/BossBanner/views/BossBanner.views';
import Anchor from '../../../../common/atoms/Anchor';
import LoyaltyBanner from '../../LoyaltyBanner';

// @flow
type Props = {
  openState: Function,
  onRequestClose: Function,
  className: string,
  addedToBagData: any,
  labels: any,
  quantity: number,
  handleContinueShopping: Function,
  isInternationalShipping: boolean,
};

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  className,
  labels,
  quantity,
  handleContinueShopping,
  handleCartCheckout,
  isInternationalShipping,
}: Props) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading="ADDED TO BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      aria={{
        labelledby: 'Added To Bag',
        describedby: 'Added To Bag Modal',
      }}
      data-locator="addedToBag-modal"
      inheritedStyles={modalStyles}
      innerContentClassName="atb-innerContent"
    >
      <div className="addedToBagWrapper">
        <ProductInformationView
          data={addedToBagData}
          labels={labels}
          quantity={quantity}
          inheritedStyles={productInfoStyles}
        />
        <AddedToBagViewPoints
          labels={labels}
          className="added-to-bag-points"
          inheritedStyles={pointsInfoStyles}
        />
        <AddedToBagActions
          labels={labels}
          handleCartCheckout={handleCartCheckout}
          showVenmo={false}
          containerId="paypal-button-container-added-to-bag"
          inheritedStyles={buttonActionStyles}
        />
        {<LoyaltyBanner pageCategory="isAddedToBagPage" />}
        {!isInternationalShipping && <BossBannerView labels={labels} />}
        <Recommendations
          page={Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE}
          variations="moduleO"
          priceOnly
        />
        <div className="continue-shopping">
          <Anchor
            fontSizeVariation="medium"
            underline
            anchorVariation="primary"
            handleLinkClick={handleContinueShopping}
            noLink
            to=""
            dataLocator="addedToBag-continueShopping"
          >
            {labels.continueShopping}
          </Anchor>
        </div>
      </div>
    </Modal>
  );
};
AddedToBag.propTypes = {
  className: PropTypes.string.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
